import React from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';

import renderHTML from 'react-render-html';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertFromRaw } from 'draft-js';

import CustomForm from './Form';
import { fetchPosts, DeletePost, authCheckState } from '../actions';
//import * as actions from '../actions/index';

class PostMoreDetail extends React.Component {

    componentDidMount(){
        this.props.fetchPosts();
        this.props.authCheckState();
    }

    onPostDelete = () => {
        const id = this.props.match.params.id;
        //axios.delete(`http://localhost:8000/api/posts/${id}/`);
        this.props.DeletePost(id).then(
            this.props.history.push('/home')
        ).then(
            //this.props.history.push('/home')
            this.forceUpdate()
        );
    }

    render(){

        const arr = window.location.href.split('/');
        const num = arr[arr.length - 1];

        const PostList = this.props.posts.map(post => {
            console.log(num)
            console.log(post.id)

            if (num.toString() === post.id.toString()){            
                return (
                    <div key={post.id} className="sixteen wide column">
                        <div className="ui fluid card">
                            <div className="content">{post.title}</div>
                            <div className="image">
                                <LazyLoad>
                                    <img src={post.image} alt="" />
                                </LazyLoad>
                            </div>
                            <div className="extra content">
                                {renderHTML(draftToHtml(JSON.parse(post.body)))}
                            </div>
                            {
                                this.props.isAuthenticated
                                ?
                                <div>
                                <CustomForm
                                    requestType="put" 
                                    id={post.id} 
                                    title={post.title}
                                    author={post.author}
                                    draft={post.is_draft}
                                    image={post.image}
                                    body={EditorState.createWithContent(convertFromRaw(JSON.parse(post.body)))}
                                    buttonText="PUT"
                                />
                                <form onSubmit={this.onPostDelete}>
                                    <button className="negative ui button right floated" htmlType="submit">DELETE</button>
                                </form>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                ); 
            }
        });

        return (
            <div className="ui grid">
                {PostList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { posts: state.posts, isAuthenticated: state.auth.token !== null }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onTryAutoSignup: () => dispatch(authCheckState())
//     }
// }

export default connect(
    mapStateToProps,
   // mapDispatchToProps,
    { fetchPosts, DeletePost, authCheckState }
)(PostMoreDetail);