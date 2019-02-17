import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { NavLink } from 'react-router-dom';
import * as actions from '../../actions';
import './style.css';

class Login extends React.Component{

    renderError ({error, touched}){
        if (error && touched){
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} />
                {this.renderError(meta)}
            </div>
        );
    };

    onFormSubmit = formValues => {
        this.props.onAuth(formValues.email, formValues.password);
        this.props.history.push('/home');
    }
    render(){
        let errorMessage = null;
        if (this.props.error){
            errorMessage = (
                <p>this.props.error.message</p>
            );
        }

        return(
            <div className="ui text container">
                { errorMessage }
                {
                    this.props.loading 
                    
                    ?

                    <div class="ui segment">
                        <div class="ui active inverted dimmer">
                            <div class="ui text loader">Loading</div>
                        </div>
                        <p></p>
                    </div>

                    :

                    <form onSubmit={this.props.handleSubmit(this.onFormSubmit)} className="ui form error">
                        <div className="field">
                            <Field name="email" component={this.renderInput} label="email" />
                        </div>
                        <div className="field">
                            <Field name="password" component={this.renderInput} label="password" />
                        </div>
                        <button className="ui button" type="submit">
                            Login
                        </button>
                        or
                        <NavLink to="/signup/" > Signup</NavLink>
                    </form>
                }
            </div>
        );
    };
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.email){
        errors.email = 'You must enter a email.';
    }
    if(!formValues.password){
        errors.password = 'You must enter a password.';
    }
    return errors;
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.authLogin(email, password))
    }
}

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default reduxForm({
    form: 'login',
    validate
})(Login);
