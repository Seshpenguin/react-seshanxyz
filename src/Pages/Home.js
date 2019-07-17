import React, {Component} from "react";
import { Container, Jumbotron } from 'react-bootstrap';
import { Circle } from 'react-preloaders';
import {Helmet} from 'react-helmet';

import { loadPage } from "../API/API";

class Home extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            contentLoaded: false,
            homeContent: 'Loading...'
        };

        // Call the WP REST API and populate content.
        loadPage(2).then((data) => {
            this.setState({
                contentLoaded: true,
                homeContent: data.content.rendered
            });
        });
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Home - Seshan's Personal Website</title>
                </Helmet>
                <Container>
                    <Jumbotron>
                        <div dangerouslySetInnerHTML={{__html: this.state.homeContent}} />
                    </Jumbotron>
                </Container>
                <Circle time={0} customLoading={!this.state.contentLoaded} />
            </div>
        );
    }
}


export default Home;
