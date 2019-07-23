import React, {Component} from 'react';

export default class HomeScreen extends Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: this.props.staticContext.WPData.homeContent}} />
        );
    }
}
