import React from "react";
import screenfull from "screenfull";
import { useSelector } from "react-redux";
import { GeistProvider, Card, Loading } from "@geist-ui/core";
import { FullScreen, Pause } from "@geist-ui/icons";

const MainPanel = () => {
	const coursePlayer = React.createRef();
	const course = useSelector((state) => state.course);

	let content;
	if (course.currentScreenshot !== "") {
		content = <img className="courseScreenshot" src={course.currentScreenshot} alt="course screen"></img>;
	} else {
		content = (
			<GeistProvider themeType="dark">
				<Loading>加载中</Loading>
			</GeistProvider>
		);
	}

	return (
		<Card shadow className="mainPanel">
			<div className="coursePlayer" ref={coursePlayer}>
				{content}
				<div className="playerControlBar">
					<div className="controlBarLeft">
						<div className="controlButton">
							<Pause />
						</div>
					</div>
					<div className="controlBarRight">
						<div
							className="controlButton"
							onClick={() => {
								if (screenfull.isEnabled) {
									screenfull.toggle(coursePlayer.current, { navigationUI: "hide" });
								}
							}}
						>
							<FullScreen />
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default MainPanel;
