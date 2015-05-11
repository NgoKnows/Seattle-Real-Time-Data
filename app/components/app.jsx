var App = React.createClass({
    getInitialState: function () {
        return {
            tab: 0,
            searchString: ''

        };
    },

    handleTabClick: function(tabValue){
        this.setState({
            tab: tabValue
        });
    },

    handleSearchChange: function(value){
        console.log(value);
        this.setState({
            searchString: value
        });
    },

    render : function() {
        return (
        <div>
            <Tabs handleTabClick={this.handleTabClick}/>
            <Search handleSearchChange={this.handleSearchChange} />
            {this.state.tab === 0 ?
            <EventTable events={this.props.events} searchString={this.state.searchString}/>
            :null}

            {this.state.tab === 2 ?
            <Map />
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
        url: "https://data.seattle.gov/resource/pu5n-trf4.json?$limit=100&$order=event_clearance_date DESC&$where=event_clearance_date > '2014-07-01'&$offset=0",
        type: "get"
    });
}
getTestData().done(function(data) {
    // Updates the UI based the ajax result
    console.log(data);
    testData = data;
    React.render(<App events={ testData }/>, document.getElementById('mount'));
});
