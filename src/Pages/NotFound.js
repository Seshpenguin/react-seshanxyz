import React, {Component} from "react";
import { Container, Jumbotron } from 'react-bootstrap';
import { Circle } from 'react-preloaders';
import {Helmet} from 'react-helmet';

class NotFound extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Seshan's Personal Website - 404 Not Found</title>
                </Helmet>
                <Container>
                    <Jumbotron>
                        <h1>
                            404 - Page Not Found
                        </h1>
                    </Jumbotron>
                </Container>
                <Circle time={100} />
            </div>
        );
    }
}

export default NotFound;

