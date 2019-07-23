import React, {Component} from 'react';
import _ from 'lodash';

export class BlogList extends Component {
    render() {
        let postList = this.props.staticContext.WPData.postsList;
        let postListJSX = [];
        for(let i = 0; i < postList.length; i++) {
            postListJSX.push(
                <div key={i}>
                    <hr />
                    <h3>{postList[i].title.rendered}</h3>
                    <b>{postList[i].date}</b>
                    <div dangerouslySetInnerHTML={{__html: postList[i].excerpt.rendered}} />
                    <a href={'/blog/' + postList[i].id}>View Full Post</a>
                </div>
            );
        }
        return (
            <div>
                <h2>Blog Posts: </h2>
                {postListJSX}
            </div>
        );
    }
}

export class ViewPost extends Component {
    render() {
        let postList = this.props.staticContext.WPData.postsList;
        let id = this.props.match.params.id;

        let post = _.find(postList, (post) => {
            return post.id === parseInt(id);
        });

        if(typeof post === "undefined") {
            return <p>Error Loading Blog Post {id}...</p>
        }

        return (
            <div>
                <hr />
                <h3>{post.title.rendered}</h3>
                <b>{post.date}</b>
                <div dangerouslySetInnerHTML={{__html: post.content.rendered}} />
            </div>
        );
    }
}
