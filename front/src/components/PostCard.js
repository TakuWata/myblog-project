import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import './PostCard.css';

class PostCard extends React.Component {
    componentDidMount(){
        this.props.fetchPosts();
    }
    render(){
        const PostList = this.props.posts.slice(0,3).map((post) => {
            if (!post.is_draft){
                if (this.props.match['url'].toLowerCase() === '/home' ){
                    return (
                        <div key={post.id} className="five wide column">
                            <div className="ui card">
                                <div className="image">
                                    <img src={post.image} />
                                </div>
                                <div className="content">
                                    {post.title}
                                </div>
                                <div className="extra content">
                                    <a href={'/posts/' + post.id}>READ MORE</a>
                                </div>
                            </div>
                        </div>
                    )
                } else if (post.category[0] && this.props.match['url'].toLowerCase().includes('/category/'+ post.category[0].toLowerCase())) {
                    return (
                        <div key={post.id} className="five wide column">
                            <div className="ui card">
                                <div className="image">
                                    <img src={post.image} />
                                </div>
                                <div className="content">
                                    {post.title}
                                </div>
                                <div className="extra content">
                                    <a href={'/posts/' + post.id}>READ MORE</a>
                                </div>
                            </div>
                        </div>
                    );
                } else if (!post.category[0]){
                    return (
                        null
                    );
                }
            }
        }
        )
        console.log(PostList.filter(v => v));
        return (
            <div> 
                {
                
                PostList.filter(v => v).length > 0
                ?
                <div className="ui three column center aligned stackable grid">
                    {PostList}
                </div>
                :
                <p className="postlist nothing">Nothing to show in this category</p>
                }
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
)(PostCard);