var App = React.createClass({
    getInitialState: function () {
        return {
            tab: 0,
            searchString: '',
            events: this.props.events
        };
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

        var events = this.props.events.filter(function (event) {
            return event.event_clearance_subgroup.toLowerCase().match(searchString);
        });

        this.setState({
            events: events
        });
    },

    render : function() {
        return (
        <div>
            <Tabs handleTabClick={this.handleTabClick}/>
            <Search handleSearchChange={this.handleSearchChange} />
            {this.state.tab === 0 ?
            <EventTable events={this.state.events} searchString={this.state.searchString}/>
            :null}

            {this.state.tab === 2 ?
            <Map events={this.state.events} blah="testt"/>
            :null}
        </div>
        );
    }

});

var fireURL = 'https://data.seattle.gov/resource/grwu-wqtk.json';
var policeURL = 'https://data.seattle.gov/resource/pu5n-trf4.json';
var testData;
function getTestData() {
    return $.ajax({
        url: "https://data.seattle.gov/resource/pu5n-trf4.json?$limit=10&$order=event_clearance_date DESC&$where=event_clearance_date > '2014-07-01'&$offset=0",
        type: "get"
    });
}
getTestData().done(function(data) {
    // Updates the UI based the ajax result
    console.log(data);
    testData = data;
    var i = 0;
    testData.forEach(function(item){
        item.key = i++;
    });
    console.log(data);
    React.render(<App events={ testData }/>, document.getElementById('mount'));
});
