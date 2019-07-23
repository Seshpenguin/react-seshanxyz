import React, {Component} from 'react';
// This component wraps it's children with standard HTML markup (html, head, body, etc)

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
