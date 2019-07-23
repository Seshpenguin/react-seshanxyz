import React, {Component} from 'react';

export default class NotFound extends Component {
    constructor(props) {
        super(props);
        this.props.staticContext.isNotFound = true;
    }
    render() {
        return (
          <p>Error 404 (Not Found)! This doesn't exist, sadly.</p>
        );
    }
}
