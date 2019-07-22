import React, {Component} from 'react';

import HTMLRoot from './HTMLRoot'

export default class HomeScreen extends Component {
    render() {
        return (
            <HTMLRoot title={'Home'}>
                <h1>Test {this.props.data}</h1>
                <p>We are running {React.version}</p>
            </HTMLRoot>
        );
    }
}
