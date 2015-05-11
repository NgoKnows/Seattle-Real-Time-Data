var Map = React.createClass({
    componentWillMount : function() {},
    componentWillReceiveProps: function() {},
    componentWillUnmount : function() {},

    _parseData : function() {},
    componentDidMount : function() {
        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(-34.397, 150.644)
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    },

    render: function() {
        return (
        <div>
            <div id="map-canvas"></div>
        </div>
        )

    }

});

React.render(<Map />, document.getElementById('mount'));
