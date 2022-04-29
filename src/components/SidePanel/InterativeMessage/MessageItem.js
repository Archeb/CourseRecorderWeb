import React from "react";
import { Note } from "@geist-ui/core";
class MessageItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		switch (props.message.type) {
			case "recorderMessage":
				this.state.noteType = "success";
				break;
			case "clientMessage":
				this.state.noteType = "secondary";
				break;
			default:
				this.state.noteType = "error";
				break;
		}
	}
	render() {
		return (
			<Note label={this.props.message.from} type={this.state.noteType} className="messageItem">
				{this.props.message.content}
			</Note>
		);
	}
}

export default MessageItem;
