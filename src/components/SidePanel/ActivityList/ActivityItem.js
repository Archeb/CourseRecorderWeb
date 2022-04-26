import React from "react";
import { Note } from "@geist-ui/core";
import { Play, LogIn, Bookmark, AlertCircle, Coffee, Compass } from "@geist-ui/icons";

class ActivityItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		switch (props.event.action) {
			case "courseBegin":
				this.state.friendlyIcon = <Play />;
				this.state.noteType = "success";
				this.state.filled = true;
				break;
			case "endCourse":
				this.state.friendlyIcon = <Coffee />;
				this.state.noteType = "error";
				this.state.filled = true;
				break;
			case "userEnter":
				this.state.friendlyIcon = <LogIn />;
				this.state.noteType = "secondary";
				this.state.filled = true;
				break;
			case "documentPageChange":
				this.state.friendlyIcon = <Bookmark />;
				this.state.noteType = "warning";
				this.state.filled = true;
				break;
			case "webBrowse":
				this.state.friendlyIcon = <Compass />;
				this.state.noteType = "success";
				this.state.filled = true;
				break;
			default:
				this.state.friendlyIcon = <AlertCircle />;
		}
	}
	render() {
		return (
			<Note label={false} type={this.state.noteType} filled={this.state.filled} className="activityItem">
				{this.state.friendlyIcon}
				{this.props.event.content}
			</Note>
		);
	}
}

export default ActivityItem;
