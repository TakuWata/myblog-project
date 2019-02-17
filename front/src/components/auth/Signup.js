import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { NavLink } from 'react-router-dom';
import * as actions from '../../actions';

class Signup extends React.Component {

    renderError({ error, touched }) {
        if (error && touched) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} />
                {this.renderError(meta)}
            </div>
        );
    };

    onFormSubmit = formValues => {
        console.log(formValues);
        this.props.onAuth(
            formValues.username,
            formValues.email,
            formValues.password1,
            formValues.password2
            );
        this.props.history.push('/home');

    }
    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>this.props.error.message</p>
            );
        }

        return (
            <div className="ui text container">
                {errorMessage}
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
                                <Field name="username" component={this.renderInput} label="username" />
                            </div>
                            <div className="field">
                                <Field name="email" component={this.renderInput} label="email" />
                            </div>
                            <div className="field">
                                <Field name="password1" component={this.renderInput} label="password1" />
                            </div>
                            <div className="field">
                                <Field name="password2" component={this.renderInput} label="password2" />
                            </div>
                            <button className="ui button" type="submit">
                                Signup
                        </button>
                            or
                        <NavLink to="/login/" > Login</NavLink>
                        </form>
                }
            </div>
        );
    };
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.username) {
        errors.username = 'You must enter a username.';
    }
    if (!formValues.email) {
        errors.email = 'You must enter a email.';
    }
    if (!formValues.password1) {
        errors.password1 = 'You must enter a password.';
    }
    if (!formValues.password2) {
        errors.password2 = 'You must enter a password.';
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
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

Signup = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default reduxForm({
    form: 'login',
    validate
})(Signup);
