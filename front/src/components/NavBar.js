import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import './style.css'

class NavBar extends React.Component{
    onLogoutClick = () => {
        this.props.logout();
        //this.props.history.push('/home');
    }
    render(){
        return (
                <div className="ui menu">
                    <Link className="item" to='/home'>HOME</Link>
                    <Link className="item" to='/category/SEO'>SEO</Link>
                    <Link className="item" to='/category/PROGRAMMING'>PROGRAMMING</Link>
                    {/* <Link className="item" to='/category/LIFE'>LIFE</Link> */}
                    <Link className="item" to='/category/BLOCKCHAIN'>BLOCKCHAIN</Link>
                    {/* <Link className="item" to='/category/TRAVEL'>TRAVEL</Link> */}
                    
                    <div className="right menu">
                        <Link className="item" to='/about'>ABOUT</Link>
                        
                        {
                            this.props.isAuthenticated
                            ?
                            <div className="right menu">
                                <Link className="item" to='/list' >
                                    Admin
                                </Link>
                                <Link className="item" to='/logout' onClick={this.onLogoutClick}>
                                    Logout
                                </Link>
                            </div>
                            :
                            <div className="right menu">
                                <Link className="item" to='/login'>
                                    Login
                                </Link>
                                <Link className="item" to='/signup'>
                                    Sign Up
                                </Link>
                            </div>
                        }
                    </div>
                <br />
                </div>
                
        );
    };
}


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(NavBar);