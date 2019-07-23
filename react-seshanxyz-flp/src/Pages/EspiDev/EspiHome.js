import React, {Component} from 'react';

export default class EspiHome extends Component {
    render() {
        return (
            <div>
                <div>{this.props.staticContext.WPData.espi.home.homeSlogan}</div>
                <div dangerouslySetInnerHTML={{__html: this.props.staticContext.WPData.espi.home.aboutContent}} />
            </div>
        );
    }
}
