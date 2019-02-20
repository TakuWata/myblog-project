import React from 'react';
import NavBar from './NavBar';
import PostCard from './PostCard';
import PostDetail from './PostDetail';
import PostMoreDetail from './PostMoreDetail';
import Header from './Header';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import Archive from './Archive';
import Author from './Author';
import About from './About';
import PostListView from './admin/PostListView';
import PostDetailView from './admin/PostDetailView';
import Login from './auth/Login';
import Signup from './auth/Signup';

import'./style.css';
import { EditorState, convertFromRaw } from 'draft-js';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends React.Component{

    componentDidMount(){
        this.props.onTryAutoSignup();
    }

    // onSearchSubmit = async (term) => {

    //     const config = {
    //         params: { search: term }
    //     }
        
    //     const response = await axios.get('http://localhost:8000/api/posts/', config)

    //     this.setState({ results: response.data });
    //     console.log(response);
    //     console.log(this.state.results);
    // }
    
    render(){
        //console.log(window.location.href.split('/')[window.location.href.split('/').length - 1])
        console.log('href', window.location.href)
        
        return (
            <BrowserRouter>
                <div className="ui container">                
                    <Header />
                    <NavBar {...this.props} />
                    {/* <div className="ui three column center aligned grid"> */}
                    <div ui link cards>
                        {/* <Route path={["/home", "/category/:category"]} exact component = {(props) => <PostCard {...props} posts={this.state.posts} />} /> */}
                        <Route path={["/home", "/category/:category"]} exact component={PostCard} />
                        <Route path="/about" exact component = {About} />
                        <Route path="/list" component={PostListView} /> 
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} /> 
                    </div>
                    
                    <div className="ui stackable grid">
                        <div className="eleven wide column">
                            <div ui segment>
                                <Route path={["/home", "/category/:category", "/login", "/signup", "/about"]} exact component = {PostDetail}  />
                                <Route path='/posts/:id' exact component = {PostMoreDetail} />
                                <Route path='/admin/posts/:id' exact component={() => <PostDetailView {...this.props} />} />
                                <Route path='/results' exact component={SearchResult} />
                            </div>
                        </div>
                        <div className="five wide column">
                            <div className="ui segment card">
                                <Route path={["/home", "/category/:category", "/posts/:id", "/results", "/login", "/signup", "/about", "/admin/posts/:id"]} exact component={Author} />
                            </div>
                            {/* <div className="ui segment">
                                <Route path={["/home", "/category/:category", "/posts/:id", "/results", "/login", "/signup", "/about"]} exact component={(props) => <SearchBar {...props} onSearch={this.onSearchSubmit} /> } />
                            </div> */}
                            <div className="ui segment card">
                                <Route path={["/home", "/category/:category", "/posts/:id", "/results", "/login", "/signup", "/about", "/admin/posts/:id"]} exact component={Archive} />
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </BrowserRouter>
        );
    };
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);