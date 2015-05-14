var Map = React.createClass({
    propTypes: {
        events: React.PropTypes.array
    },

    getInitialState: function() {
        return {
            map: null,
            markers : {}
        }

    },
    componentWillMount : function() {},
    componentWillReceiveProps: function() {

    },
    componentWillUnmount : function() {},

    getMarkers : function() {
        if(this.state.map) {
            var events = this.props.events;
            var markers = this.state.markers;
            //if markers are being added
            if (events.length > Object.keys(markers).length) {
                for (var i = 0; i < events.length; i++) {
                    var event = events[i];

                    //if marker doesn't already exist
                    if (!markers.hasOwnProperty(this.getKey(event))) {
                        this.dropMarkers(this, event, i, markers);
                    }
                }
            }else{
                var newMarkers = {}
                for (var i = 0; i < events.length; i++) {
                    var event = events[i];
                    var key = this.getKey(event);
                    newMarkers[key] = markers[key];
                    delete markers[key]
                }
                $.each(markers, function(index, value) {
                    //for(var opacity = 1; opacity > 0.5; opacity -= .0001){
                    //    value.setOpacity(opacity);
                    //}
                    value.setMap(null);
                });
                this.state.markers = newMarkers;

            }
        }
    },

    getKey: function(event){
        //return event.latitude + event.longitude;
        return event.key;
    },

    clearMarkers: function(){
        for(var i = 0; i < this.state.markers.length; i++){
            this.state.markers[i].setMap(null);
        }
    },

    dropMarkers: function(component, event, i, markers){
        window.setTimeout(function() {
            markers[component.getKey(event)] = new google.maps.Marker({
                position: new google.maps.LatLng(event.latitude, event.longitude),
                map: component.state.map,
                animation: google.maps.Animation.DROP,
                title: event.event_clearance_subgroup,
                optimized: false
            });
        }, i * 3);
    },

    componentDidMount : function() {
        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(47.6097, -122.3331)
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        this.setState({
                map: map
            });
    },

    render: function() {
        this.getMarkers();

        return (
        <div>
            <div id="map-canvas"></div>
        </div>
        )

    }

});
