import React, { Component } from 'react';


class ErrorBoundry extends Component {
    constructor() {
        super();
        this.state = {
            hasError: false,
        }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
        return (this.state.hasError) ? <h1>Oooooops. Sorry, an error happened.</h1> : this.props.children;
    }
}

export default ErrorBoundry;