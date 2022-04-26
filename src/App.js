import "./css/App.less";
import MainPanel from "./components/MainPanel";
import SidePanel from "./components/SidePanel";
import { Grid, GeistProvider, CssBaseline } from "@geist-ui/core";

function App() {
	return (
		<GeistProvider>
			<CssBaseline />
			<Grid.Container className="mainContainer" gap={2} alignItems="center">
				<Grid xs={24} lg={17} xl={19}>
					<MainPanel />
				</Grid>
				<Grid xs={24} lg={7} xl={5}>
					<SidePanel />
				</Grid>
			</Grid.Container>
		</GeistProvider>
	);
}

export default App;
