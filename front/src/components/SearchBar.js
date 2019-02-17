import React from 'react';
import { Field, reduxForm } from 'redux-form';

// import { Redirect } from 'react-router-dom';
// if (isAuthenticated) {
//     return <Redirect to='/url' />;
class SearchBar extends React.Component{
    renderInput = ({input, label}) => {
        return (
            <div>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
            </div>
        );
    }

    onFormSubmit = (formValues) => {
        //console.log(formValues)
        this.props.history.push('/results');
    }

    render(){
        return (
            <form 
                onSubmit = {this.props.handleSubmit(this.onFormSubmit)} 
                className="ui form"
            >
                <Field name="search" component={this.renderInput} label="Search" />
            </form>
            // <div className="results"></div>
        );
    }
}

export default reduxForm({
    form: 'search'
})(SearchBar);


{/* <label>Search</label>
    <div className="inline field">
        <input
            onChange={e => this.setState({ term: e.target.value })}
            value={this.state.term}
            type="text"
            placeholder="Search ..."
        />
        <i className="search icon"></i>
    </div> */}