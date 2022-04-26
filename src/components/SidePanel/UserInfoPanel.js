import React from "react";
import { User, ButtonGroup, Button } from "@geist-ui/core";
import { Settings, LogOut } from "@geist-ui/icons";

class UserInfoPanel extends React.Component {
	render() {
		return (
			<div className="userInfoPanel">
				<User src="https://unix.bio/assets/avatar.png" name="李红旗">
					<User.Link href="https://www.bnu.edu.cn">#202204251551</User.Link>
				</User>
				<div className="userInfoPanelActions">
					<ButtonGroup type="abort" scale={0.5}>
						<Button scale={0.5}>
							<Settings size={16} />
							&nbsp;设置
						</Button>
						<Button scale={0.5}>
							<LogOut size={16} />
							&nbsp;退出
						</Button>
					</ButtonGroup>
				</div>
			</div>
		);
	}
}

export default UserInfoPanel;
