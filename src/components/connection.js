import React from "react";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import { Link, useToasts } from "@geist-ui/core";
import { setCourseStatus, setCourseId, pushActivity, setCurrentScreenshot } from "../store/slices/courseSlice";
import { pushMessage } from "../store/slices/interactionSlice";
import { SrsRtcPlayerAsync } from "../3rdparty/srs.sdk";

function withToast(Component) {
	return function WrappedComponent(props) {
		return <Component {...props} toastFuncs={useToasts()} />;
	};
}

class CourseConnection extends React.Component {
	Promises = {};
	srsSdk = null;
	streamAudioPlayer = null;

	constructor(props) {
		super();
	}

	componentDidMount() {
		if (!window.CourseConnection) {
			// prevent multiple instances
			window.CourseConnection = this;
			this.props.setCourseId(this.props.courseIdToJoin);
		}
	}
	componentDidUpdate(prevProps) {
		if (this.props.courseIdToJoin !== prevProps.courseIdToJoin) {
			this.props.setCourseId(this.props.courseIdToJoin);
		}
	}
	connect() {
		if (this.props.status === "disconnected") {
			this.props.setCourseStatus("connecting");
			this.ws = new WebSocket(this.props.serverAddress);
			this.ws.onopen = this.onOpen.bind(this);
			this.ws.onmessage = this.onMessage.bind(this);
			this.ws.onclose = this.onClose.bind(this);
			this.ws.onerror = this.onError.bind(this);
		}
	}
	onOpen() {
		console.log("onOpen");
		this.props.setCourseStatus("connected");
		this.ws.send(JSON.stringify({ action: "clientRegister", courseId: this.props.courseId }));
	}
	onMessage(message) {
		try {
			var msg = JSON.parse(message.data);
			console.log(msg);
			switch (msg.action) {
				case "registered":
					console.log("registered!");
					if (msg.realCourseId) {
						console.log("Short code was used to join the course");
						this.props.setCourseId(msg.realCourseId);
					}
					this.props.pushActivity({
						activityId: "courseBegin",
						action: "courseBegin",
						content: "您加入了课堂",
					});
					//send nickname to server
					this.ws.send(JSON.stringify({ action: "setNickname", nickname: this.props.user.nickname, callbackId: uuid() }));
					this.props.setCourseStatus("registered");
					break;
				case "callback":
					if (this.Promises[msg.callbackId]) {
						switch (msg.callbackAction) {
							case "resolve":
								this.Promises[msg.callbackId].resolve(msg.data);
								break;
							case "reject":
								this.Promises[msg.callbackId].reject(msg.data);
								break;
							default:
								console.log("unknown callback action");
						}
						delete this.Promises[msg.callbackId];
					}
					break;
				case "interactiveMessage":
					this.props.pushMessage(msg.message);
					break;
				case "streamUpdate":
					// create a video element
					if (!this.streamAudioPlayer) {
						this.streamAudioPlayer = document.createElement("video");
						this.streamAudioPlayer.setAttribute("id", "streamAudioPlayer");
						this.streamAudioPlayer.setAttribute("autoplay", "autoplay");
						document.querySelector(".coursePlayer").appendChild(this.streamAudioPlayer);
					}
					if (this.srsSdk) {
						this.srsSdk.close();
					}
					this.srsSdk = new SrsRtcPlayerAsync();
					this.streamAudioPlayer.srcObject = this.srsSdk.stream;
					this.srsSdk
						.play("webrtc://" + msg.stream.server + "/live/" + msg.stream.id)
						.then((session) => {
							console.log("srs session: ", session);
						})
						.catch((reason) => {
							this.srsSdk.close();
							console.error(reason);
						});
					break;
				case "eventUpdate":
					console.log("eventUpdate!");
					if (msg.attachment) {
						switch (msg.attachment.attachmentType) {
							case "screenshot":
								this.props.setCurrentScreenshot(msg.attachment.fileName);
								break;
							default:
								console.log("not implemented attachment type: " + msg.attachment.attachmentType);
						}
					}
					switch (msg.event.EventType) {
						case "MouseEvent":
							break;
						case "KeyboardEvent":
							break;
						case "DocumentEvent":
							switch (msg.event.Action) {
								case "PowerPointNextSlide":
									this.props.pushActivity({
										activityId: msg.event.EventId,
										action: "documentPageChange",
										content: "PPT 切换到第" + msg.event.Index + "页，点击回顾",
									});
									break;
								case "PowerPointPresentationOpen":
									this.props.pushActivity({
										activityId: msg.event.EventId,
										action: "documentOpen",
										content: (
											<span>
												老师打开了文件
												<Link icon href={msg.attachment.fileName}>
													{msg.event.Name}
												</Link>
											</span>
										),
									});
									break;
								case "PowerPointPresentationClose":
									this.props.pushActivity({
										activityId: msg.event.EventId,
										action: "documentClose",
										content: "文件关闭 " + msg.event.Name,
									});
									break;
								default:
									console.log("not implemented document action: " + msg.event.Action);
							}

							break;
						default:
							console.log("not implemented event type: " + msg.event.EventType);
					}
					break;
				case "error":
					this.props.toastFuncs.setToast({ text: msg.error });
					break;
				default:
					console.log("unknown action", message.data);
			}
		} catch (e) {
			console.log(e);
		}
	}
	onClose() {
		this.props.setCourseStatus("disconnected");
		console.log("onClose");
	}
	onError() {
		this.props.setCourseStatus("disconnected");
		console.log("onError");
	}

	async setNickname(nickname) {
		return new Promise((resolve, reject) => {
			if (this.props.status !== "registered") {
				reject("not registered");
			}
			let callbackId = uuid();
			this.ws.send(JSON.stringify({ action: "setNickname", nickname: nickname, callbackId: callbackId }));
			this.Promises[callbackId] = { resolve, reject };
			setTimeout(() => {
				if (this.Promises[callbackId]) {
					reject("timeout");
				}
			}, 5000);
		});
	}
	async sendMessage(message) {
		return new Promise((resolve, reject) => {
			if (this.props.status !== "registered") {
				reject("not registered");
			}
			let callbackId = uuid();
			this.ws.send(JSON.stringify({ action: "interactiveMessage", content: message, callbackId: callbackId }));
			this.Promises[callbackId] = { resolve, reject };
			setTimeout(() => {
				if (this.Promises[callbackId]) {
					reject("timeout");
				}
			}, 5000);
		});
	}
	render() {
		return null;
	}
}

const mapDispatchToProps = { setCourseStatus, setCourseId, pushActivity, pushMessage, setCurrentScreenshot };

const mapStateToProps = (state) => ({
	...state.course,
	user: state.user,
});

export default withToast(connect(mapStateToProps, mapDispatchToProps)(CourseConnection));
