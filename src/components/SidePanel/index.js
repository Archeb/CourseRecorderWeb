import React from "react";
import { Card, Tabs } from "@geist-ui/core";
import { Activity, Twitch } from "@geist-ui/icons";
import ActivityList from "./ActivityList";
import UserInfoPanel from "./UserInfoPanel";
import CourseChat from "./CourseChat";

class SidePanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activities: [
				{ eventId: "1613", action: "courseBegin", content: "上课啦！" },
				{ eventId: "1614", action: "userEnter", content: "学生 金梭哈 已进入课堂" },
				{ eventId: "1617", action: "userEnter", content: "学生 Hex 已进入课堂" },
				{ eventId: "1618", action: "documentPageChange", content: "PPT 切换到第二页，点击回顾" },
				{ eventId: "1619", action: "documentPageChange", content: "PPT 切换到第三页，点击回顾" },
				{ eventId: "1619gg", action: "documentPageChange", content: "PPT 切换到第五页，点击回顾" },
				{ eventId: "1616", action: "userEnter", content: "学生 早苗 已进入课堂" },
				{ eventId: "1619fa", action: "documentPageChange", content: "PPT 切换到第六页，点击回顾" },
				{ eventId: "1615", action: "userEnter", content: "学生 四二二 已进入课堂" },
				{ eventId: "1620", action: "webBrowse", content: "老师打开了网页 https://www.bnu.edu.cn" },
				{ eventId: "1620s", action: "webBrowse", content: "老师打开了网页 https://www.exhentai.org" },
				{ eventId: "1621", action: "endCourse", content: "下课啦！" },
			],
		};
	}
	render() {
		return (
			<Card className="sidePanel" shadow width="100%">
				<Tabs className="sidePanelTabs" align="center" initialValue="1">
					<Tabs.Item
						label={
							<>
								<Activity />
								课堂动态
							</>
						}
						value="1"
					>
						<ActivityList activities={this.state.activities} />
					</Tabs.Item>
					<Tabs.Item
						label={
							<>
								<Twitch />
								聊天互动
							</>
						}
						value="2"
					>
						<CourseChat />
					</Tabs.Item>
				</Tabs>
				<UserInfoPanel></UserInfoPanel>
			</Card>
		);
	}
}

export default SidePanel;
