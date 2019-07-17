import React, {Component} from "react";
import { Container, Jumbotron, Card, Button } from 'react-bootstrap';
import { Circle } from 'react-preloaders';
import {Helmet} from 'react-helmet';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';

import { loadPost } from "../API/API";

class ViewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentLoaded: false,
            homeContent: 'Loading...',
            postToLoad: 1,
            post: {}
        };
    }

    componentDidMount() {
        // Get Post ID from params
        const { match: { params } } = this.props;
        if(typeof params.post !== "undefined" && params.post > 0) {
            //Put the API in callback, because setState is async.
            this.setState({ postToLoad: params.post }, () => {
                loadPost(params.post).then((data) => {
                    this.setState({ post: data, contentLoaded: true })
                });
            });
        } else {
            console.log('Bad ID');
            console.log(typeof params.page);
        }
    }

    render() {
        console.log(this.state.pageToLoad);
        // Loop through posts to render.
        let postJSX;
        if(this.state.contentLoaded) {
            postJSX = (
                <div>
                    <h1>{this.state.post.title.rendered}</h1>
                    <strong>{dayjs(this.state.post.date).format('DD/MM/YYYY (h:m A)')}</strong>
                    <hr />
                    <Card body className={'shadow'}>
                        <div dangerouslySetInnerHTML={{__html: this.state.post.content.rendered}} />
                    </Card>
                    <br />
                </div>
            );
        } else {
            return (
                <div>
                    <Circle time={0} customLoading={!this.state.contentLoaded} />
                </div>
            );
        }
        return (
            <div>
                <Helmet>
                    <title>{this.state.post.title.rendered} - Seshan's Personal Website</title>
                </Helmet>
                <Container>
                    <Jumbotron>
                        {postJSX}
                        <Link to={ "/posts/1" }>
                            <Button variant="secondary" size="lg" block>
                                Back to Posts
                            </Button>
                        </Link>
                    </Jumbotron>
                </Container>
                <Circle time={0} customLoading={!this.state.contentLoaded} />
            </div>
        );
    }
}


export default ViewPost;

