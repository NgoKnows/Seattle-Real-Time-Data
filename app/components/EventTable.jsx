var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var EventTable = React.createClass({
    propTypes: {
        events: React.PropTypes.array
    },

    getInitialState: function(){
        return{
            limit: 25
        }
    },

    loadMoreEvents: function(){
        this.setState({
            limit: this.state.limit + 25
        });
    },

    getEventRows: function (){
        var events = this.props.events;
        var i = 0;
        events = events.map(function(event) {
            return <EventTable.EventRow event={event} key={event.key} order={++i}/>
        });
        return events.slice(0, this.state.limit);
    },

    orderEventRows: function(){

    },

    componentDidMount: function(){
        var component = this;
        $(window).scroll(function() {
            if($(window).scrollTop() + $(window).height() + 30 > $(document).height()) {
                setTimeout(function(){
                    component.loadMoreEvents();
                }, 500);
            }
        });
    },

    render: function() {
        var events = this.props.events;

        return (
            <div>
                <table className="hoverable">
                    <thead>
                    <td>#</td>
                    <td>Name</td>
                    <td>Time</td>
                    <td>Type</td>
                    </thead>
                    <tbody>
                            {
                                this.getEventRows()
                            }
                    </tbody>
                </table>
                {this.state.limit  < events.length ?
                    <div>
                        <div id="loading" className="center-align">Loading more!</div>
                        <img id="loadingImg" className="center-align" src="assets/imgs/ellipsis.svg"/>
                    </div>
                    :
                    <div id="tableEnd" className="center-align">
                        There are no more events!
                    </div>
                }
            </div>
        )
    }
});

EventTable.EventRow = React.createClass({
    formatDate: function(date){
        var formattedDate = moment(date).format("dddd, MMMM Do YYYY | h:mm:ss a");
        return formattedDate;
    },

    render: function() {
        var event = this.props.event;
        return (
            <tr>
                <td>{this.props.order}</td>
                <td>{event.event_clearance_subgroup}</td>
                <td>{this.formatDate(event.event_clearance_date)}</td>
                <td>{event.initial_type_subgroup}</td>
            </tr>
        );
    }
});
