import React from 'react';
import reqestToModel from '../apis/requestToModel';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { stateToHTML } from 'draft-js-export-html';
import renderHTML from 'react-render-html';

class CustomForm extends React.Component {
    constructor(props) {
        console.log('Form props:', props)
        super(props);

        // if (this.props.id) {
        //     this.state = { editorState: this.props.body, title: this.props.title, author: this.props.author, draft: this.props.draft, selectedFile: this.props.image };
        // } else {
        //     this.state = { editorState: EditorState.createEmpty(), title: "", author: "", draft: false, selectedFile: null };
        // };
        if (props.id) {
            this.state = { editorState: props.body, title: props.title, author: props.author, draft: props.draft, selectedFile: props.image };
        } else {
            this.state = { editorState: EditorState.createEmpty(), title: "", author: "", draft: false, selectedFile: null };
        };
    }

    onFromSubmit = (event, requestType, id) => {
        event.preventDefault()
        const fd = new FormData();
        // js objectを作成
        if (this.state.selectedFile){
            fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
        };
        
        // FormData.append(name, value, filename)
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        fd.append('title', this.state.title)
        fd.append('author', this.state.author)
        fd.append('body', JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())))
        fd.append('is_draft', this.state.draft)

        switch (requestType){
            case 'post':
                return reqestToModel.post('/posts/', fd, config
                    // title: this.state.title,
                    // author: this.state.author,
                    // body: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())),
                    // is_draft: this.state.draft,
                    // image: fd
                )
                .then(res => console.log(res))
                .catch(err => console.log(err));

            case 'put':
                return reqestToModel.put(`/posts/${id}/`, fd, config
                    // title: this.state.title,
                    // author: this.state.author,
                    // body: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())),
                    // is_draft: this.state.draft,
                    // image: fd
                )
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    }

    onTitleChange = (event) => {
        this.setState({ title: event.target.value})
        console.log(this.state.title)
    }

    onAuthorChange = (event) => {
        this.setState({ author: event.target.value })
    }

    onCheckboxChange = () => {
        this.setState(prevState => ({
            draft: !prevState.draft
        }));
        //this.setState({ draft: !this.state.draft });
    }

    onFileUploadChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
        //console.log(event.target.files[0]);
    }
    
    render() {
        const { editorState } = this.state;
        return (
            <div>
                <form className="ui form" onSubmit = { event => this.onFromSubmit(event, this.props.requestType, this.props.id, this.props.title, this.props.body)} >
                {/* <form className="ui form" onSubmit={event => this.onFromSubmit(event, this.props)} > */}
                    <div className="field">
                        <label>Form Layout</label>
                    </div>
                    <div className="field">
                        <label>title</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={this.state.title} 
                            onChange={this.onTitleChange} 
                        />
                    </div>
                    <div className="field">
                        <label>body</label>
                        <Editor
                            //defaultEditorState={this.state.editorState}
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                        />
                    
                        <h4>HTML VIEW</h4>
                        <textarea
                            disabled
                            value={stateToHTML((this.state.editorState.getCurrentContent()))}                            
                        />
                        <h4>PREVIEW</h4>
                        <pre>
                            {renderHTML(stateToHTML((this.state.editorState.getCurrentContent())))}
                        </pre>
                    </div>
                    <div className="inline field">
                        <div className="ui toggle checkbox">
                            <input 
                                type="checkbox" 
                                name="draft" 
                                //tabIndex="0" 
                                checked={this.state.draft}
                                //className="hidden" 
                                onChange={this.onCheckboxChange} 
                            />
                            <label>is_draft</label>
                        </div>
                    </div>
                    <div className="field">
                        <label>image</label>
                        <input type="file" name="image" onChange={this.onFileUploadChange} />
                    </div>
                    <div className="field">
                        <label>author</label>
                        <input type="number" name="author" value={this.state.author} onChange={this.onAuthorChange} />
                    </div>
                    <button className="ui button" type="submit" htmlType="submit">{this.props.buttonText}</button>
                </form>
            </div>
        );
    };
}

export default CustomForm;
