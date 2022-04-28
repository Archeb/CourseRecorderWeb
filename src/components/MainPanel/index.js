import React from "react";
import { useSelector } from "react-redux";
import { GeistProvider, Card, Loading } from "@geist-ui/core";

const MainPanel = () => {
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
			<div className="coursePlayer">{content}</div>
		</Card>
	);
};

export default MainPanel;
