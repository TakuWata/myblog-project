import React from 'react';
import { connect } from 'react-redux';
import CustomForm from '../Form';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../actions';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import moment from 'moment'

class PostListView extends React.Component{

    componentDidMount() {
        this.props.fetchPosts();
    };

    render(){
        const renderedList = this.props.posts.map((post) => {
            return (
                <Link key={post.id} to={'admin/posts/' + post.id} component={()=><PostListView {...this.props}/>}>
                    Title: {post.title} | {post.is_draft ? "非公開": "公開済み" } | {moment(post.created_at).format("MMM Do YY")}
                    <br />
                    {/* {post.author}
                    {post.body} */}
                </Link>
            );
        })

        return (
            <div>
                {
                    this.props.isAuthenticated
                    ?
                    <div className="ui text container">
                        <h2>記事リスト</h2>
                        {renderedList}
                        <br />
                        <h2>Create a new post</h2>
                        <CustomForm requestType="post" id={null} buttonText="POST" />
                    </div>
                    :
                    <p>You are not logged in.</p>                    
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { posts: state.posts, isAuthenticated: state.auth.token !== null }
};

export default connect(
    mapStateToProps,
    { fetchPosts }
)(PostListView);