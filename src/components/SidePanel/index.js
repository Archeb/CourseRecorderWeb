import React from "react";
import { connect } from "react-redux";
import { Card, Tabs } from "@geist-ui/core";
import { Activity, Twitch } from "@geist-ui/icons";
import { sendMessage } from "../../store/slices/interactionSlice";
import ActivityList from "./ActivityList";
import UserInfoPanel from "./UserInfoPanel";
import InterativeMessage from "./InterativeMessage";

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
						<InterativeMessage interaction={this.props.interaction} sendMessage={this.props.sendMessage} />
					</Tabs.Item>
				</Tabs>
				<UserInfoPanel></UserInfoPanel>
			</Card>
		);
	}
}

const mapDispatchToProps = { sendMessage };

const mapStateToProps = (state) => {
	return {
		activities: state.course.activities,
		interaction: state.interaction,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
