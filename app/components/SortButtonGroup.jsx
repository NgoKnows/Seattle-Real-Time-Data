var SortButtonGroup = React.createClass({

    propTypes: {},
    mixins : [],

    getInitialState: function() {
        return {
          openButton: 0
        };
    },

    sortButtonClick : function(buttonNum) {
        console.log("HIII");
        if(this.state.openButton === buttonNum) buttonNum = 0;
        this.setState({
            openButton: buttonNum
        });
    },
    initializeDate: function(){

    },

    componentDidMount : function() {

    },

    render : function() {
        return(
        <div id="groupCriteria">
            <SortButtonGroup.ButtonGroup sortButtonClick={this.sortButtonClick}/>
            <div id="panel">
                {this.state.openButton === 1 ?
                    <SortButtonGroup.RecentPanel />:
                        null}

                {this.state.openButton === 2 ?
                <SortButtonGroup.DatePanel />:
                null}
            </div>
        </div>
        )
    }
});

SortButtonGroup.ButtonGroup = React.createClass({
    propTypes: {},

    //getInitialState: function() {},

    render : function() {
        return(
        <div id="sortButtonGroup">
            <a className="waves-effect waves-light btn sortButton" onClick={this.props.sortButtonClick.bind(null, 1)}>
                <i className="fa fa-clock-o"></i>Most Recent
            </a>
            <a className="waves-effect waves-light btn sortButton" onClick={this.props.sortButtonClick.bind(null, 2)}>
                <i className="fa fa-calendar"></i>Date Range
            </a>
        </div>);
    }
});

SortButtonGroup.RecentPanel = React.createClass({
    propTypes: {},

    //getInitialState: function() {},
    getDefaultProps: function() {},

    componentWillMount : function() {},
    componentWillReceiveProps: function() {},
    componentWillUnmount : function() {},

    render : function() {
        return(
            <div className="input-field">
                <i className="fa fa-clock-o prefix"></i>
                <input id="recentNumber" type="number" />
                <label for="recentNumber">Most Recent</label>
            </div>
        );
    }
});

SortButtonGroup.DatePanel = React.createClass({
    propTypes: {},

    //getInitialState: function() {},
    getDefaultProps: function() {},

    componentWillUnmount : function() {},
    componentDidMount: function() {
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 5 // Creates a dropdown of 15 years to control year
        });

        startDate = $('#start').pickadate().pickadate('picker');
        endDate = $('#end').pickadate().pickadate('picker');
        startDate.set('select', [2015, 4, 1]);
        endDate.set('select', [2015, 4, 20]);
    },

    render : function() {
        return(
            <div id="dateContainer" className="input-field">
                <div className="date">
                    <label id="beginLabel" for="start">Begin Date</label>
                    <input type="date" className="datepicker" id="start" />
                </div>
                <div id="to" className="center-align">
                    to
                </div>
                <div className="date input-field">
                    <label for="end">End Date</label>
                    <input type="date" className="datepicker" id="end" />
                </div>
            </div>
        );
    }
});

