var SortButtonGroup = React.createClass({

    propTypes: {
        handleSortClick: React.PropTypes.func
    },

    // 0 = no button, 1 = most recent, 2 = date range
    getInitialState: function() {
        return {
          openButton: 0
        };
    },

    sortButtonClick : function(buttonNum) {
        if(this.state.openButton === buttonNum) buttonNum = 0;
        this.setState({
            openButton: buttonNum
        });
    },

    render : function() {
        return(
        <div id="groupCriteria">
            <SortButtonGroup.ButtonGroup sortButtonClick={this.sortButtonClick}/>
            <div id="panel">
                {this.state.openButton === 1 ?
                    <SortButtonGroup.RecentPanel handleFilterClick={this.props.handleFilterClick}/>:
                        null}

                {this.state.openButton === 2 ?
                <SortButtonGroup.DatePanel handleFilterClick={this.props.handleFilterClick}/>:
                null}
            </div>
        </div>
        )
    }
});

SortButtonGroup.ButtonGroup = React.createClass({
    propTypes: {
        sortButtonClick : React.PropTypes.func
    },

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
    propTypes: {
        handleFilterClick: React.PropTypes.func
    },

    handleRecentClick: function() {
        var recentNumber = $('#recentNumber').val();
        this.props.handleFilterClick('recentValue', recentNumber);
    },

    render : function() {
        return(
            <div className="input-field">
                <i className="fa fa-clock-o prefix"></i>
                <input id="recentNumber" type="number" />
                <label htmlFor="recentNumber">Most Recent</label>
                <button className="btn waves-effect waves-light submit" type="submit" name="action"
                        onClick={this.handleRecentClick}>
                    <i className="mdi-content-send right"></i>
                </button>
            </div>
        );
    }
});

SortButtonGroup.DatePanel = React.createClass({
    propTypes: {
        handleFilterClick: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            beginDate: null,
            endDate: null
        }
    },

    handleDateClick: function() {
        var begin = moment(this.state.beginDate.get());
        var end = moment(this.state.endDate.get());
        this.props.handleFilterClick('dateRange', [begin, end]);
    },

    componentDidMount: function() {
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 2 // Creates a dropdown of 15 years to control year
        });

        this.state.beginDate= $('#start').pickadate().pickadate('picker');
        this.state.endDate = $('#end').pickadate().pickadate('picker');
        this.state.beginDate.set('select', [2015, 4, 1]);
        this.state.endDate.set('select', [2015, 4, 16]);
    },

    render : function() {
        return(
            <div id="dateContainer" className="input-field">
                <div className="date">
                    <label id="beginLabel" htmlFor="start">Begin Date</label>
                    <input type="date" className="datepicker" id="start" />
                </div>
                <div id="to" className="center-align">
                    to
                </div>
                <div className="date input-field">
                    <label htmlFor="end">End Date</label>
                    <input type="date" className="datepicker" id="end" />
                </div>
                <button id="dateSubmit" className="btn waves-effect waves-light submit" type="submit" name="action"
                        onClick={this.handleDateClick}>
                    <i className="mdi-content-send right"></i>
                </button>
            </div>
        );
    }
});

