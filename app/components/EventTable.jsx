var EventTable = React.createClass({
    getInitialState: function () {
        return {
            searchString: ''
        };
    },
    getEvents: function (){
        var events = this.props.events;
        return events.map(function(event) {
            return <EventTable.EventRow event={event} />
        })
    },

    render: function() {
        var events = this.props.events;
        var searchString = this.props.searchString.toLowerCase();
        console.log('hi');
        if (searchString.length) {
            events = events.filter(function (event) {
                return event.event_clearance_subgroup.toLowerCase().match(searchString);
            });
        }

        return (
            <div>
                <table className="hoverable animatepls">
                    <thead>
                    <td>Name</td>
                    <td>Time</td>
                    <td>Type</td>
                    </thead>
                    <tbody>
                        {
                            events.map(function(event) {
                                return <EventTable.EventRow event={event} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
});

EventTable.EventRow = React.createClass({
    render: function() {
        var event = this.props.event;
        return (
            <tr>
                <td>{event.event_clearance_subgroup}</td>
                <td>{event.event_clearance_date}</td>
                <td>{event.initial_type_subgroup}</td>
            </tr>
        );
    }
});
