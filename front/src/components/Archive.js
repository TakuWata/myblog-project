import React from 'react';
import { fetchPosts } from '../actions';
import { connect } from 'react-redux';
import moment from 'moment'

import './style.css';

class Archive extends React.Component{
    componentDidMount(){
        this.props.fetchPosts();
    }
    render(){
        const postlist = this.props.posts.map(post=>{
            if (!post.is_draft)
                return (
                    <a key={post.id} href={`posts/${post.id}`} className="item">
                        <span className="archive title">Title: {post.title}</span>
                        <br />
                        ({moment(post.published_at).format('"MMM Do YY"')})<br />
                    </a>
                );
        })
    
        return (
            <div className="archive">
                <label>Archive</label>
                <br /><br />
                {postlist}
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return { posts: state.posts }
}

export default connect(
    mapStateToProps,
    { fetchPosts }
)(Archive);