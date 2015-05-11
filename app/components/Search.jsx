var Search = React.createClass({
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
