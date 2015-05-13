var List = React.createClass({
        getInitialState: function() {
                return {
                        items: [0, 1, 2, 3]
                };
        },

        removeThenReadd: function(item) {
                // {{{
                var items = this.state.items.slice(0);
                var found = false;
                for(var i = 0; i < items.length; i++) {
                        if (items[i] === item) {
                                items.splice(i, 1);
                                found = true;
                                break;
                        }
                }

                this.setState({items: items}, function() {
                        if (found) {
                                setTimeout(function() {
                                        var items = this.state.items.slice(0);
                                        items.push(item);
                                        this.setState({items: items});
                                }.bind(this), 5000);

                        }
                }.bind(this));
                // }}}
        },

        _makeDiv: function(index) {
                // {{{
                return <div onClick={this.removeThenReadd.bind(null, index)}
                            style={itemStyle}
                            key={index}>
                        {"Item " + index}
                </div>;
                // }}}
        },

        render: function() {
                var items = this.state.items.map(this._makeDiv);
                return <TimeoutTransitionGroup enterTimeout={500}
                                               leaveTimeout={500}
                                               transitionName="demo">
                        {items}
                </TimeoutTransitionGroup>;
        }
});
