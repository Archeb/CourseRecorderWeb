import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./css/App.less";
import MainPanel from "./components/MainPanel";
import SidePanel from "./components/SidePanel";
import CourseConnection from "./components/connection";
import { Grid, GeistProvider, CssBaseline, Modal, Input } from "@geist-ui/core";
import { validate } from "uuid";

const App = () => {
	const course = useSelector((state) => state.course);
	const [courseIdToJoin, setCourseIdToJoin] = React.useState("");

	useEffect(() => {
		let courseIdFromParam;
		if ((courseIdFromParam = new URLSearchParams(window.location.search).get("courseId"))) {
			setCourseIdToJoin(courseIdFromParam);
		}
	}, []);

	useEffect(() => {
		if (validate(courseIdToJoin)) {
			window.CourseConnection.connect();
		}
	}, [courseIdToJoin]);

	return (
		<GeistProvider>
			<CssBaseline />
			<Modal visible={!(course.status === "registered")}>
				<Modal.Title>加入课堂</Modal.Title>
				<Modal.Subtitle>请用手机自带相机扫码加入课堂，或者输入加课码</Modal.Subtitle>
				<Modal.Content>
					<Input
						value={courseIdToJoin}
						onChange={(e) => {
							setCourseIdToJoin(e.target.value);
						}}
						width="100%"
						placeholder="请输入加课码"
					></Input>
				</Modal.Content>
				<Modal.Action passive>使用帮助</Modal.Action>
				<Modal.Action onClick={() => window.CourseConnection.connect()}>加入</Modal.Action>
			</Modal>
			<CourseConnection courseIdToJoin={courseIdToJoin} />
			<Grid.Container className="mainContainer" gap={2} alignItems="center">
				<Grid xs={24} md={17} lg={17} xl={19}>
					<MainPanel />
				</Grid>
				<Grid xs={24} md={7} lg={7} xl={5}>
					<SidePanel />
				</Grid>
			</Grid.Container>
		</GeistProvider>
	);
};

export default App;
