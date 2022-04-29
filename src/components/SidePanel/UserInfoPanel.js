import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, ButtonGroup, Button, Drawer, Input } from "@geist-ui/core";
import { Settings, LogOut, User as UserIcon } from "@geist-ui/icons";
import { setNickname } from "../../store/slices/userSlice";

const UserInfoPanel = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [settingsVisible, setSettingsVisible] = React.useState(false);
	const [userNickname, setUserNickname] = React.useState(user.nickname);
	return (
		<div className="userInfoPanel">
			<User src="https://unix.bio/assets/avatar.png" name={user.nickname}>
				<User.Link href="https://qwq.moe/">#{user.studentNo}</User.Link>
			</User>
			<div className="userInfoPanelActions">
				<ButtonGroup type="abort" scale={0.5}>
					<Button
						scale={0.5}
						onClick={() => {
							setSettingsVisible(true);
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
				visible={settingsVisible}
				onClose={() => {
					setSettingsVisible(false);
					dispatch(setNickname(userNickname));
				}}
				placement="right"
			>
				<Drawer.Title>设置</Drawer.Title>
				<Drawer.Subtitle>Settings</Drawer.Subtitle>
				<Drawer.Content>
					<Input
						icon={<UserIcon />}
						placeholder="用户名"
						value={userNickname}
						onChange={(e) => {
							setUserNickname(e.target.value);
						}}
					></Input>
				</Drawer.Content>
			</Drawer>
		</div>
	);
};

export default UserInfoPanel;
