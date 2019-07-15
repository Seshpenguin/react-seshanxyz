import React, {Component} from "react";
import { Container, Jumbotron, Button } from 'react-bootstrap';
import axios from 'axios';
import { Circle } from 'react-preloaders';
import {Helmet} from 'react-helmet';

class Home extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            contentLoaded: false,
            homeContent: 'Loading...'
        };

        // Call the WP REST API and populate content.
        this.loadDataFromWP().then((data) => {
            console.log(data);
            setTimeout(() => {
                this.setState({
                    contentLoaded: true,
                    homeContent: data
                });
            }, 0);
        });
    }

    async loadDataFromWP() {
        try {
            const response = await axios.get('https://seshan.xyz/wp-json/wp/v2/pages/2');
            //console.log(response.data.content.rendered);
            return response.data.content.rendered;
        } catch (error) {
            console.error(error);
            return "Error Loading Data";
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Seshan's Personal Website - Home</title>
                </Helmet>
                <Container>
                    <Jumbotron>
                        <h1>Hello, world!</h1>
                        <div dangerouslySetInnerHTML={{__html: this.state.homeContent}} />
                    </Jumbotron>
                </Container>
                <Circle time={0} customLoading={!this.state.contentLoaded} />
            </div>
        );
    }
}


export default Home;
