import React from "react";
import { connect } from "react-redux";
import { setCourseStatus, setCourseId, pushActivity, setCurrentScreenshot } from "../CourseManager/slices/courseSlice";

class CourseConnection extends React.Component {
	Promises = {};

	constructor(props) {
		super();
	}

	componentDidMount() {
		if (!window.CourseConnection) {
			// prevent multiple instances
			window.CourseConnection = this;
			this.props.setCourseStatus("connecting");
			this.ws = new WebSocket("wss://" + this.props.serverAddress + "/ws");
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
					this.props.pushActivity({
						eventId: "courseBegin",
						action: "courseBegin",
						content: "您加入了课堂",
					});
					this.status = "registered";
					this.props.setCourseStatus("registered");
					break;
				case "newNickname":
					console.log("newNickname!");
					if (this.Promises.newNickname) {
						this.Promises.newNickname.resolve(msg.nickname);
						delete this.Promises.newNickname;
					}
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
										eventId: msg.event.EventId,
										action: "documentPageChange",
										content: "PPT 切换到第" + msg.event.Index + "页，点击回顾",
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
			this.ws.send(JSON.stringify({ action: "setNickname", nickname: nickname }));
			this.Promises.newNickname = { resolve, reject };
			setTimeout(() => {
				if (this.Promises.newNickname) {
					reject("timeout");
				}
			}, 5000);
		});
	}
	render() {
		return null;
	}
}

const mapDispatchToProps = { setCourseStatus, setCourseId, pushActivity, setCurrentScreenshot };

const mapStateToProps = (state) => ({
	serverAddress: state.course.serverAddress,
	courseId: state.course.courseId,
	status: state.course.status,
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseConnection);
