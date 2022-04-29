import React from "react";
import "./css/App.less";
import MainPanel from "./components/MainPanel";
import SidePanel from "./components/SidePanel";
import CourseConnection from "./components/connection";
import { Grid, GeistProvider, CssBaseline } from "@geist-ui/core";

class App extends React.Component {
	componentDidMount() {
		if (window.CourseConnection.status === "disconnected") {
			window.CourseConnection.connect("localtest.qwq.moe:3300");
		}
	}
	render() {
		return (
			<GeistProvider>
				<CssBaseline />
				<CourseConnection />
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
	}
}

export default App;
