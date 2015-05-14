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
        makeGraph();
    },

    render : function() {
        return(
            <div id="container">

            </div>
        );
    }

});

var makeGraph = function(){
    $('#container').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Crimes in Seattle'
        },
        //subtitle: {
        //    text: 'Source: <a href="http://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
        //    'thebulletin.metapress.com</a>'
        //},
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                    return days[this.value]; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: 'Occurances of Crime'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} made on <b>{point.x}</b><br/>'
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
            data: [510, 780, 510, 780, 480, 500, 578]
        }]
    });
}
