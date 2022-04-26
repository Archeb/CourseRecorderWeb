import React from "react";
import { User, ButtonGroup, Button, Drawer, Input } from "@geist-ui/core";
import { Settings, LogOut, User as UserIcon } from "@geist-ui/icons";

class UserInfoPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { settingsVisible: false };
	}
	render() {
		return (
			<div className="userInfoPanel">
				<User src="https://unix.bio/assets/avatar.png" name="李红旗">
					<User.Link href="https://www.bnu.edu.cn">#202204251551</User.Link>
				</User>
				<div className="userInfoPanelActions">
					<ButtonGroup type="abort" scale={0.5}>
						<Button
							scale={0.5}
							onClick={() => {
								this.setState({ settingsVisible: true });
							}}
						>
							<Settings size={16} />
							&nbsp;设置
						</Button>
						<Button scale={0.5}>
							<LogOut size={16} />
							&nbsp;退出
						</Button>
					</ButtonGroup>
				</div>
				<Drawer
					visible={this.state.settingsVisible}
					onClose={() => {
						this.setState({ settingsVisible: false });
					}}
					placement="right"
				>
					<Drawer.Title>设置</Drawer.Title>
					<Drawer.Subtitle>Settings</Drawer.Subtitle>
					<Drawer.Content>
						<Input icon={<UserIcon />} placeholder="用户名"></Input>
					</Drawer.Content>
				</Drawer>
			</div>
		);
	}
}

export default UserInfoPanel;
