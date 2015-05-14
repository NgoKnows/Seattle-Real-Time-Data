var Tabs = React.createClass({
    propTypes: {
        handleTabClick: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            tab: 0
        };
    },
    handleClick: function(tabValue){
        this.setState({
            tab: tabValue
        });
        this.props.handleTabClick(tabValue);
    },
    render: function(){
        var currentTab = this.state.tab;
        var getClass = function(tab) {
            return classNames({
            'active': currentTab === tab
            });
        }

        return (
            <div className="row">
                <div className="col s12">
                    <ul className="tabs">
                    <li className="tab col s2"><a className={getClass(0)} onClick={this.handleClick.bind(null, 0)}>List</a></li>
                        <li className="tab col s2"><a className={getClass(1)} onClick={this.handleClick.bind(null, 1)}>Graph</a></li>
                        <li className="tab col s2"><a className={getClass(2)} onClick={this.handleClick.bind(null, 2)}>Map</a></li>
                    </ul>
                </div>
            </div>
        )
    }
});
