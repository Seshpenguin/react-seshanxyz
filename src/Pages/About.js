import React, {Component} from "react";
import { Container, Jumbotron } from 'react-bootstrap';
import { Circle } from 'react-preloaders';
import {Helmet} from 'react-helmet';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentLoaded: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ contentLoaded: true });
        }, 500);
    }


    render() {
        return (
            <div>
                <Helmet>
                    <title>Seshan's Personal Website - 404 Not Found</title>
                </Helmet>
                <Container>
                    <Jumbotron>
                        <h1>
                            What is this thing?
                        </h1>
                        <hr />
                        <p>
                            Welcome to (maybe) the future version of Seshan.XYZ! <br />
                            This is an experiment to write a new frontend to the currently existing
                            Seshan.XYZ WordPress website, but instead of using PHP to create a WP Theme, this uses
                            entirely client-side JS (React), and uses the WP-JSON REST API to populate data.
                            <br />
                            This effectively turns WordPress into headless CMS backend.
                        </p>
                    </Jumbotron>
                </Container>
                <Circle time={0} customLoading={!this.state.contentLoaded} />
            </div>
        );
    }
}

export default About;
