import React, {Component} from "react";
import { Container, Jumbotron, Card, Button } from 'react-bootstrap';
import { Circle } from 'react-preloaders';
import {Helmet} from 'react-helmet';
import { Link } from "react-router-dom";

import { loadPostsList } from "../API/API";

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentLoaded: false,
            homeContent: 'Loading...',
            pageToLoad: 1,
            totalPages: 1,
            nextPage: 1,
            isNextPage: true,
            postList: []
        };
    }

    componentDidMount() {
        this.populatePage(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.populatePage(newProps);
    }

    populatePage(props) {
        this.setState({ contentLoaded: false }, () => {
            const { match: { params } } = props;
            if(typeof params.page !== "undefined" && params.page > 0) {
                //Put the loadPostsList in callback, because setState is async.
                this.setState({ pageToLoad: params.page }, this.populatePageAPI);
            } else {
                console.log('Bad ID');
                console.log(typeof params.page);
                this.setState({ pageToLoad: 1 }, this.populatePageAPI);
            }
        });
    }
    populatePageAPI() {
        // Call the WP REST API and populate content.
        loadPostsList(this.state.pageToLoad).then((data) => {
            this.setState({
                contentLoaded: true,
                postList: data.posts,
                totalPages: data.totalPages
            }, () => {
                // Is there a next page?
                if(this.state.pageToLoad < this.state.totalPages) {
                    let nextPage = this.state.nextPage + 1;
                    this.setState({ nextPage: nextPage });
                } else {
                    this.setState({ isNextPage: false });
                }
            });
        });
    }

    render() {
        console.log(this.state.pageToLoad);
        // Loop through posts to render.
        let postsJSX = [];
        if(this.state.contentLoaded) {
            for(let i = 0; i < this.state.postList.length; i++) {
                postsJSX[i] = (
                    <div key={i}>
                        <Card body className={'shadow'}>
                            <h1 dangerouslySetInnerHTML={{__html: this.state.postList[i].title.rendered}} />
                            <div dangerouslySetInnerHTML={{__html: this.state.postList[i].excerpt.rendered}} />
                            <Link to={ "/post/" + this.state.postList[i].id }>
                                <Button>
                                    View Post
                                </Button>
                            </Link>
                        </Card>
                        <br />
                    </div>
                );
            }
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
                    <title>Blog - Seshan's Personal Website</title>
                </Helmet>
                <Container>
                    <Jumbotron>
                        {postsJSX}
                        <hr />
                        <strong>Page {this.state.pageToLoad}/{this.state.totalPages}</strong>
                        <Link to={ "/posts/" + this.state.nextPage }>
                            <Button variant="secondary" size="lg" block>
                                Next Page ➡
                            </Button>
                        </Link>
                    </Jumbotron>
                </Container>
                <Circle time={0} customLoading={!this.state.contentLoaded} />
            </div>
        );
    }
}


export default Posts;

