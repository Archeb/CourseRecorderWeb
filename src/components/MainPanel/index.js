import { Card, Loading } from "@geist-ui/core";

function MainPanel(props) {
	return (
		<Card shadow className="mainPanel">
			<Loading>老师正在赶来的路上</Loading>
		</Card>
	);
}

export default MainPanel;
