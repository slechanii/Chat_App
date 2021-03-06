

import React, { Component } from 'react'
import { Grid, Input, GridRow, Container, TextArea, Button, ButtonGroup, Icon } from 'semantic-ui-react'
import Axios from 'axios';
import configData from  "../config.json";
import 'react-quill/dist/quill.snow.css';
import ReactQuill, {Quill} from 'react-quill';


const CustomButton = () => <Icon name="send"></Icon>
const BackButton = () => <Icon name="backward"></Icon> 

// const CustomToolbar = () => (
//     <div id="toolbar">
//       {/* "bold", "italic", "strike", "underline", "blockquote", { list: "bullet" }, {'list': 'ordered'}, "link", {insertStar: this.insertStar} */}
//       <button className="ql-bold"></button>
//       <button className="ql-italic"></button>
//       <button className="ql-strike"></button>    
//       <button className="ql-underline"></button>    
//       <button className="ql-blockquote"></button>        
//       <button className="ql-send-message" onClick={this.props.sendMessage}>
//         <CustomButton />
//       </button>
//     </div>
//   )

  class CustomToolbar extends Component { 

    constructor(props){
        super(props)
    }
      render() {
          
        return(
    <div id="toolbar">
      {/* "bold", "italic", "strike", "underline", "blockquote", { list: "bullet" }, {'list': 'ordered'}, "link", {insertStar: this.insertStar} */}
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-strike"></button>    
      <button className="ql-underline"></button>    
      <button className="ql-blockquote"></button>        
      <button className="ql-send-message" onClick={() => {this.props.sendMessage(false)}}>
        <CustomButton />
       
      </button>
      {this.props.isEditing === true &&
      <button className="ql-edit-message" onClick={this.props.cancelEditing}>
        <BackButton/>
        </button>
      }
    </div>
  )
      }
  }

  function insertStar()  {
}

export default class Chatbox extends Component {

    constructor(props)
    {
        super(props);
    }
    state = {
        messageContent : "",       
        oldValue: "",
        value: "",
        isEditing: false, 
    }

    componentDidMount () {
        if (this.props.isEditing === true){
            this.setState({messageContent: this.props.oldMessage})
            this.setState({isEditing: true})
        }
    }


    onChangeMessage = (html) => {
        this.setState({oldValue: this.state.messageContent, messageContent: html})
    }

    handleKey = (event) => {
        if (event.key == "Enter" && !event.shiftKey)
        {            
            this.setState({messageContent: ""})
            event.preventDefault();
            this.sendMessage(true)
            event.stopPropagation();
            return false
        }
    }

    cleanMessage = (message) => {
        message = message.replace(/<p><\/\p>/g, "")
        message = message.replace(/<p><br><\/p>/g, "")
        message = message.replace(/<br>/g, "")
        return message
    }

    sendMessage = (from_enter_key) => {
        let message = ""
        if (this.state.isEditing === false){
        
        if (from_enter_key)
            message = this.state.oldValue
        else
            message = this.state.messageContent
        let message_to_send = {       
            content:  this.cleanMessage(message),
            sender_id: localStorage.getItem("user_id"),
            destination_id: window.location.pathname.split('/')[2], 
        }
      Axios.post(configData.SERVER_URL + "messages/", message_to_send)
           .then((res) => {
               this.props.refreshMessages()
               this.setState({messageContent:""})
               this.setState({oldValue:""})
           })
           .catch((err) => {
               console.log(err)
           })
        }
        else{
            if (from_enter_key)
            message = this.state.oldValue
        else
            message = this.state.messageContent
            let message_to_send = {       
                content:  this.cleanMessage(message),
            }
          Axios.patch(configData.SERVER_URL + "messages/" + this.props.messageId + "/", message_to_send)
               .then((res) => {

            
                   this.props.cancelEditing();
                   this.props.refreshMessages()
               })
               .catch((err) => {
                   console.log(err)
               })
            }
        }
    


    render() {
        const {value, setValue} = this.state
        const quillToolbar = {
            history: {
                delay: 1000,
                maxStack: 100,
                userOnly: false
              },
            toolbar: ["bold", "italic", "strike", "underline", "blockquote", { list: "bullet" }, {'list': 'ordered'}, "link", {insertStar: this.insertStar}
        ],


            clipboard: {
                matchVisual: false
            },
   
          };
        //   alert("name in box : " + this.props.channel)
        return (
            
            <Grid.Row className={`chatbox-container ${this.props.isEditing ? " editing " : ""}`}>
            
            {/* <ReactQuill value={this.state.messageContent} onKeyDown={(e) => {this.handleKey(e)}}  ref={(el) => {this.reactQuillRef = el}} className="chatbox-wrapper" modules={quillToolbar} theme="snow" onChange={this.onChangeMessage} > */}
            <ReactQuill key={this.props.channelName} placeholder={"Write a message to #" + this.props.channelName} value={this.state.messageContent} onKeyDown={(e) => {this.handleKey(e)}}  ref={(el) => {this.reactQuillRef = el}} className="chatbox-wrapper" modules={Chatbox.modules} theme="snow" onChange={this.onChangeMessage} >
              {/* <div className="chatbox-input"/> */}
              </ReactQuill> 
              <CustomToolbar cancelEditing={this.props.cancelEditing} isEditing={this.state.isEditing} sendMessage={this.sendMessage}></CustomToolbar>
  
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

Chatbox.modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        "insertStar": insertStar,
      }
    }
  }
  
  /*
   * Quill editor formats
   * See http://quilljs.com/docs/formats/
   */
  Chatbox.formats = [
    "bold", "italic", "strike", "underline", "blockquote", { list: "bullet" }, {'list': 'ordered'}, "link"
  ]
