import React from "react";
import ActivityItem from "./ActivityItem";

class ActivityList extends React.Component {
	render() {
		const listItems = this.props.activities.map((item) => <ActivityItem key={item.eventId} event={item} />);
		return <div className="activityList">{listItems}</div>;
	}
}

export default ActivityList;
