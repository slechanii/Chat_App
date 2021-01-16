

import React, { Component } from 'react'
import { Grid, Input, GridRow, Container, TextArea, Button, ButtonGroup, Icon } from 'semantic-ui-react'
import Axios from 'axios';
import configData from  "../config.json";
import 'react-quill/dist/quill.snow.css';
import ReactQuill, {Quill} from 'react-quill';



export default class Chatbox extends Component {

    constructor(props)
    {
        super(props);
        this.quillRef = null;      // Quill instance
        this.reactQuillRef = null; // ReactQuill component
    }
    state = {
        messageContent : "",       
        value: "",
    }


    componentDidMount() {
        this.attachQuillRefs()
        
      }
    
      componentDidUpdate() {
        this.attachQuillRefs()
      }
    
      attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
      }

    onChangeMessage = (html) => {
        this.setState({messageContent: html})
        this.quillRef.focus();
    }

    handleKey = (event) => {
        if (event.key == "Enter" && !event.shiftKey)
        {
            this.sendMessage()
        }
    }

    sendMessage = () => {
   
        let message_to_send = {       
            content: this.state.messageContent,
            sender_id: localStorage.getItem("user_id"),
            destination_id: window.location.pathname.split('/')[2], 
        }
      Axios.post(configData.SERVER_URL + "messages/", message_to_send)
           .then((res) => {
               this.props.refreshMessages()
               document.getElementById("textarea-chat").reset();
               this.setState({messageContent:""})
           })
           .catch((err) => {
               console.log(err)
           })
    }

    render() {
        const {value, setValue} = this.state
        const quillToolbar = {
            toolbar: ["bold", "italic", "strike", "underline", "blockquote", { list: "bullet" }, {'list': 'ordered'}, "link"],
            keyboard: {
                bindings: {
                //   linebreak: {
                //     key: 13,                   
                //     handler: (range) => {
                //     // alert("enter pressed")
                //     this.sendMessage();
                
                //     }
                // }
            }
        }
          };
        return (
            
            <Grid.Row className="chatbox-container">
                  
              <ReactQuill onKeyDown={(e) => {this.handleKey(e)}}  ref={(el) => { this.reactQuillRef = el }} className="chatbox-wrapper" modules={quillToolbar} theme="snow" onChange={this.onChangeMessage} >
              {/* <div className="chatbox-input"/> */}
              </ReactQuill> 
  
                {/* <Grid className="chatbox">
                    <Grid.Row className="chatbox-textarea-row">
                    <form className="unstyled" id="textarea-chat">
                        <TextArea  name="messageContent" onChange={this.handleChange} placeholder="Send a message to #channel" className="chatbox-input"></TextArea>
                    </form>
                    </Grid.Row>
                    <GridRow className="chatbox-formatting-row">
                        <Button.Group>
                            <Button icon>
                                <Icon name='bold' />
                            </Button>
                            <Button icon>
                                <Icon name='italic' />
                            </Button>
                            <Button icon>
                                <Icon name='strikethrough' />
                            </Button>
                            <Button icon>
                                <Icon name='code' />
                            </Button>
                            <Button icon>
                                <Icon name='ordered list' />
                            </Button>
                            <Button icon>
                                <Icon name='bulleted list' />
                            </Button>
                            <Button icon>
                                <Icon name='quote left' />
                            </Button>
                        </Button.Group>
                    
                            <Button onClick={this.sendMessage} icon>
                                <Icon name='send' />
                            </Button>
                       


                    </GridRow>
                </Grid> */}

            </Grid.Row>



        )
    }
}
