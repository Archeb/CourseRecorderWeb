import React from "react";
import { connect } from "react-redux";
import { Card, Tabs } from "@geist-ui/core";
import { Activity, Twitch } from "@geist-ui/icons";
import ActivityList from "./ActivityList";
import UserInfoPanel from "./UserInfoPanel";
import CourseChat from "./CourseChat";

class SidePanel extends React.Component {
	// eslint-disable-next-line
	constructor(props) {
		super(props);
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
						<ActivityList activities={this.props.activities} />
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

const mapStateToProps = (state) => {
	return {
		activities: state.course.activities,
	};
};

export default connect(mapStateToProps)(SidePanel);
