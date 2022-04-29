import React from "react";
import { Input } from "@geist-ui/core";
import { Send } from "@geist-ui/icons";
import MessageItem from "./MessageItem";

class InterativeMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleMessageSend = this.handleMessageSend.bind(this);
	}
	render() {
		const listItems = this.props.interaction.messages.map((item) => <MessageItem key={item.messageId} message={item} />);

		return (
			<div className="interativeMessage">
				<div className="messageList">{listItems}</div>
				<div className="messageInput">
					<Input
						iconRight={<Send />}
						onKeyDown={this.handleKeyDown}
						onChange={this.handleChange}
						onIconClick={this.handleMessageSend}
						iconClickable={true}
						disabled={this.props.interaction.sendMessageStatus === "pending"}
						placeholder="请文明发言"
						value={this.state.message}
						width="100%"
					></Input>
				</div>
			</div>
		);
	}

	handleChange(e) {
		this.setState({ message: e.target.value });
	}

	handleKeyDown(e) {
		if (e.keyCode === 13) {
			this.props.sendMessage(this.state.message);
			this.setState({ message: "" });
		}
	}

	handleMessageSend() {
		this.props.sendMessage(this.state.message);
		this.setState({ message: "" });
	}
}

export default InterativeMessage;
