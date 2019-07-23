import React, {Component} from 'react';

export default class EspiContact extends Component {
    render() {
        return <div dangerouslySetInnerHTML={{__html: this.props.staticContext.WPData.espi.contact}} />;
    }
}
