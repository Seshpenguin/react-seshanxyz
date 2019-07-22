import React, {Component} from 'react';

export default class HTMLRoot extends Component {
    render() {
        return (
            <html>
                <head>
                    <title>{this.props.title} - React Seshan.XYZ FLP</title>
                </head>
                <body>
                    {this.props.children}
                </body>
            </html>

        );
    }
}
