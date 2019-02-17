import React from 'react';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import renderHTML from 'react-render-html';

import { fetchPosts } from '../actions';
import './PostDetail.css';

class PostDetail extends React.Component{
    componentDidMount(){
        this.props.fetchPosts();
    }
    render(){
        const arr = window.location.href.split('/')
        const str = arr[arr.length-1]
        const PostList = this.props.posts.map(post => {
            if(!post.is_draft){
                if (str.toLowerCase() == 'home' || str.toLowerCase() == 'login' || str.toLowerCase() == 'signup' || str.toLowerCase() == 'about') {
                    return (
                        <div key={post.id}>
                            <div className="ui fluid card">
                                <div className="content">{post.title}</div>
                                <div className="image"><img src={post.image} /></div>
                                {/* <div className="extra content">{EditorState.createWithContent(convertFromRaw(JSON.parse(post.body)))}</div> */}
                                <div className="extra content">
                                    {renderHTML(draftToHtml(JSON.parse(post.body)))}
                                </div>
                                {/* {draftToHtml(post.body)} */}
                            </div>
                        </div>
                    );
                } else if (post.category[0] && str.toLowerCase().includes(post.category[0].toLowerCase())) {
                    return (
                        <div key={post.id} className="sixteen wide column">
                            <div className="ui fluid card">
                                <div className="content">{post.title}</div>
                                <div className="image"><img src={post.image} /></div>
                                <div className="extra content">
                                    {/* {convertFromRaw(JSON.parse(post.body))} */}
                                    {renderHTML(draftToHtml(JSON.parse(post.body)))}
                                </div>
                            </div>
                        </div>
                    );
                } else if (!post.category[0]){
                    return null;
                }
            }
            
        })
        console.log("PL in post detail", PostList)
        return (
            <div>
                {PostList}    
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { posts: state.posts }
}

export default connect(
    mapStateToProps,
    { fetchPosts }
)(PostDetail);