var Map = React.createClass({
    propTypes: {
        events: React.PropTypes.array
    },

    getInitialState: function() {
        return {
            map: null,
            markers : {},
            markerColors: {}
        }
    },

    getMarkers : function() {
        //get colors for each event
        this.getMarkerColors();

        if(this.state.map) {
            var events = this.props.events;
            var markers = this.state.markers;
            //if markers are being added
            if (events.length > Object.keys(markers).length) {
                for (var i = 0, length = events.length; i < length; i++) {
                    var event = events[i];

                    //if marker doesn't already exist then drop it
                    if (!markers.hasOwnProperty(this.getKey(event))) {
                        this.dropMarkers(this, event, i, markers);
                    }
                }

            //markers are being removed
            }else{
                var newMarkers = {};
                for (var i = 0, length = events.length; i < length; i++) {
                    var event = events[i];
                    var key = this.getKey(event);
                    newMarkers[key] = markers[key];
                    delete markers[key]
                }
                //remove each marker from the map
                $.each(markers, function(index, value) {
                    value.setMap(null);
                });
                this.state.markers = newMarkers;
            }
        }
    },

    getKey: function(event){
        return event.key;
    },

    dropMarkers: function(component, event, i, markers, length){
        var apart = 3;
        var animation = google.maps.Animation.DROP;
        if(length > 1000){
            apart = 1
        }
        if(length > 2000){
            animation = null;
        }

        //window.setTimeout(function() {
            markers[component.getKey(event)] = new google.maps.Marker({
                position: new google.maps.LatLng(event.latitude, event.longitude),
                map: component.state.map,
                animation: animation,
                title: event.event_clearance_subgroup,
                icon: component.state.markerColors[event.event_clearance_subgroup],
                optimized: false
            });
       // }, i * apart);
    },

    getMarkerColors: function() {
        var events = this.props.events;
        var curColor = 1;
        var markerColors = {};
        for(var i = 0, length = events.length; i < length; i++){
            event = events[i];
            var type = event.event_clearance_subgroup;
            if(!markerColors.hasOwnProperty(type)){
                markerColors[type] =
                    'assets/imgs/markers/map-marker' + curColor + '.png';
                curColor++
            }
        }
        this.state.markerColors = markerColors;
    },

    componentDidMount : function() {
        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(47.61225, -122.346006)
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
