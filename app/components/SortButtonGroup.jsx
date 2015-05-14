var SortButtonGroup = React.createClass({

    propTypes: {},
    mixins : [],

    getDefaultProps: function() {},

    componentWillMount : function() {},
    componentWillReceiveProps: function() {},
    componentWillUnmount : function() {},

    _parseData : function() {},
    _onSelect : function() {},

    render : function() {
        return(
        <div id="sortButtonGroup">
            <a className="waves-effect waves-light btn sortButton">
                <i className="mdi-file-cloud left"></i>Most Recent
            </a>
            <a className="waves-effect waves-light btn sortButton">
                <i className="mdi-file-cloud left sortButton"></i>Date Range
            </a>
        </div>
        )
    }

});
