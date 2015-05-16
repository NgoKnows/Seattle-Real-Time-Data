var App = React.createClass({
    propTypes: {
        events: React.PropTypes.array
    },

    getInitialState: function () {
        return {
            tab: 0,
            searchString: '',
            allEvents: [],
            events: [],
            recentValue: 100,
            dateRange: [moment(-25, "DD"), moment()],
            loading: false
        };
    },

    handleFilterClick: function(filter, value){
        var filterObj = {}
        filterObj[filter] = value;
        this.state[filter] = value;
        this.ajaxCall(filter);
    },


    handleTabClick: function(tabValue){
        this.setState({
            tab: tabValue
        });
    },

    handleSearchChange: function(value){
        this.state.searchString = value;
        this.getFilteredEvents();
    },

    getFilteredEvents: function(){
        var searchString = this.state.searchString.toLowerCase();

        var events = this.state.allEvents.filter(function (event) {
            return event.event_clearance_subgroup.toLowerCase().match(searchString);
        });

        this.setState({
            events: events
        });
    },

    ajaxCall: function(filter){
        var component = this;
        this.setState({
            loading : true
        });
        var url = "https://data.seattle.gov/resource/pu5n-trf4.json?";

        if(filter === 'recentValue'){
            url = "https://data.seattle.gov/resource/pu5n-trf4.json?$limit=" + this.state.recentValue +
                "&$order=event_clearance_date DESC&$where=event_clearance_date > '2010-07-01'"
        }
        else{
            var dateRange=  this.state.dateRange;
            url = url + "$limit=5000&$order=event_clearance_date DESC&$where=event_clearance_date between " +
                "'" + dateRange[0].format('YYYY-MM-DD') + "'" + ' and ' + "'" + dateRange[1].format('YYYY-MM-DD') + "'";
            console.log(url);
        }
        $.ajax({
            url: url,
            type: "get"
        }).done(function(data){
            var i = 0;
            data.forEach(function(item){
                item.key = i++;
            });
            component.setState({
                allEvents: data,
                events: data
            });
            component.setState({
                loading : false
            })
        });
    },

    componentDidMount: function(){
        this.ajaxCall('recentValue');
    },
    render : function() {
        return (
        <div>
            {this.state.loading ?
                <img id="ajaxLoader" src="assets/imgs/ellipsis.svg"/>
            :null}

            <Tabs handleTabClick={this.handleTabClick}/>
            <Search handleSearchChange={this.handleSearchChange} />
            <SortButtonGroup recent={this.state.recentValue} dateRange={this.state.dateRange}
                             handleFilterClick={this.handleFilterClick}/>

            {this.state.tab === 0 ?
            <EventTable events={this.state.events}/>
            :null}

            {this.state.tab === 1 ?
            <Graph events={this.state.events}/>
            :null}

            {this.state.tab === 2 ?
            <Map events={this.state.events}/>
            :null}
        </div>
        );
    }

});

React.render(<App />, document.getElementById('mount'));
