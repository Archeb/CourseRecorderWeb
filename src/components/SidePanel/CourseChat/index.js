import React from "react";
import { Input, Note } from "@geist-ui/core";
import { Send } from "@geist-ui/icons";

class CourseChat extends React.Component {
	render() {
		return (
			<div className="courseChat">
				<div className="chatMessageList">
					<Note type="success" label="老师">
						同学们上课了
					</Note>
					<Note type="secondary" label="李红旗">
						已提交对 老师 的举报，举报编号为 1145141919810
					</Note>
					<Note type="secondary" label="早苗">
						这破课，摸了。
					</Note>
					<Note type="success" label="老师">
						以上两名同学平时分扣光。
					</Note>
				</div>
				<div className="chatInput">
					<Input iconRight={<Send />} iconClickable={true} placeholder="请文明发言" width="100%"></Input>
				</div>
			</div>
		);
	}
}

export default CourseChat;
