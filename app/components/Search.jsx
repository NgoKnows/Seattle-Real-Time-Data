var Search = React.createClass({
    propTypes: {
        handleSearchChange: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            searchString: ''
        };
    },

    handleChange: function(event){
        this.props.handleSearchChange(event.target.value)
    },

    render: function() {
        return (
            <input type="search" placeholder="Searching!" onChange={this.handleChange} />
        );
    }
});
