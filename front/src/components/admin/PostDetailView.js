import React from 'react';
import { connect } from 'react-redux';
import { EditorState, convertFromRaw } from 'draft-js';

import CustomForm from '../Form';
import { fetchPosts, DeletePost, authCheckState } from '../../actions';

class PostDetailView extends React.Component{

    componentDidMount(){
        console.log("Props in PDV", this.props)
        this.props.fetchPosts()
    }

    onPostDelete = () => {
        const arr = window.location.href.split('/');
        const num = arr[arr.length - 1];
        
        this.props.DeletePost(num)
        // .then(
        //     this.props.history.push('/home')
        // ).
        // then(
        //     //this.props.history.push('/home')
        //     this.forceUpdate()
        // );
    }
    
    render(){
        const arr = window.location.href.split('/');
        const num = arr[arr.length - 1];
        console.log(this.props)
        console.log(arr)
        console.log(num)
        const formList = this.props.posts.map((post)=>{
            if (num.toString() === post.id.toString()){
                return (
                    <div>
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
                );
            }
        })
        return (
            <div>{formList}</div>
        )
        
    };
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    };
}

export default connect(
    mapStateToProps,
    { fetchPosts, DeletePost }
    )(PostDetailView);

//export default PostDetailView;