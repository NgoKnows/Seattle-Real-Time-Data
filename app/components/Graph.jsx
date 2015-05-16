var Graph =React.createClass({
    propTypes: {
        events: React.PropTypes.array
    },

    getInitialState: function() {
        return {
            category: 'day'
        };
    },

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
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    var length = days.length;
    for (var dataLen = 0, data = new Array(dataLen); dataLen < length;) data[dataLen++] = 0;

    var eventsLen = events.length;
    for(var i = 0; i < eventsLen; i++){
        var event = (moment(events[i].event_clearance_date).isoWeekday() - 1);
        data[event] = data[event] + 1;
    }

    return data;
};
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

var makeGraph = function(data){
    Highcharts.setOptions({
        chart: {
            style: {
                fontFamily: 'Roboto',
                fontSize: '1.25em'
            },
            lang: {
                thousandsSep: ','
            }
        }
    });

    $('#container').highcharts({
        chart: {
            type: 'line',
            height: '550',
            lang: {
                thousandsSep: ','
            }
        },
        title: {
            text: '911 Calls in Seattle',
            fontSize: '8em',
            style: {
                fontFamily: 'Roboto',
                fontSize: '2em'
            }
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
            },
            lang: {
                thousandsSep: ','
            }
        },
        tooltip: {
            pointFormat: '{point.y:,.0f} calls made on <b>{point.category}</b><br/>'
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
            data: data,
            color: '#26a69a'
        }]
    });
}
