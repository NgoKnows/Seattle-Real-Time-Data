var Graph =React.createClass({
    propTypes: {
        events: React.PropTypes.array
    },

    getInitialState: function() {
        return {
            category: 'day'
        };
    },
    //getDefaultProps: function() {},
    //
    //componentWillMount : function() {},
    //componentWillReceiveProps: function() {},
    //componentWillUnmount : function() {},
    //
    //_parseData : function() {},
    //_onSelect : function() {},
    componentDidMount : function(){
        var data = getData(this.props.events)
        makeGraph(data);
    },

    render : function() {
        makeGraph(getData(this.props.events));
        return(
            <div id="container">

            </div>
        );
    }

});
var getData = function(events){
    var data = [];
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    for (var dataLen = 0; dataLen < days.length; dataLen++){
        data[dataLen] = 0;
    }
    for(var i = 0; i < events.length; i++){
        var event = events[i];
        data[(moment(event.event_clearance_date).isoWeekday() - 1)] = data[moment(event.date).isoWeekday() - 1] + 1;
    }
    return data;
}
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

var makeGraph = function(data){
    $('#container').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Crimes in Seattle'
        },
        //subtitle: {
        //    text: 'Source: <a href="http://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
        //    'thebulletin.metapress.com</a>'
        //},
        xAxis: {
            categories : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        },
        yAxis: {
            title: {
                text: 'Occurances of Crime'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            pointFormat: '{point.y} {series.name} made on <b>{point.category}</b><br/>'
        },
        plotOptions: {
            area: {
                pointStart: 0,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: '911 Calls',
            data: data
        }]
    });
}
