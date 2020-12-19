import React, { Component } from 'react'
import { Grid, GridRow, GridColumn, Divider, Input } from 'semantic-ui-react';
import configData from  "../config.json";
import axios from 'axios';

export default class Chat extends Component {

    state =  {
        messages : [],
        refresh: false,
    };


    componentDidMount() {
        this.getMessages();
    }  
    
    // componentDidUpdate() {
    //     alert("h")
    //     this.getMessages();
    // }

    getMessages = () => {
        // alert("get messages")
        let url = window.location.pathname
        url = url.split('/')[2]
        // alert(url)
        url = configData.SERVER_URL + "channels/" + url + "/"
        // alert(url)
        // alert(url)
        axios.get(url)
        .then((result) => {
            // alert(configData.SERVER_URL + "channels/", + url)
            // alert(JSON.stringify(result.data))
            this.setState({messages: result.data.message_set})
            this.setState({refresh:false})
        })
        .catch((error) => {console.log(error)})
    }


    render() {
        // alert(JSON.stringify(this.state.messages))
            if (this.props.refreshChat === true)
            {
                this.getMessages();
                this.props.changeState("refreshChat", false)
            }
 
        let messages = this.state.messages.map((data, idx) => {
            // alert(data.message)
            // alert(data.content)
            return (
                <div>
                    <span>User#{data.sender} : {data.content}</span> 
                </div>
            )
        }) 
        
        return (
            <GridColumn className="workspace-chat" width={14} onClick={this.getMessages}>
            <Grid className="h-100">
                <Grid.Row className="chat-header">
                Chat Header
                <Divider></Divider>
                </Grid.Row>
         <Grid.Row className="chat-messages-container">
         {messages}
         {this.state.refresh}
         </Grid.Row>
         <Grid.Row className="chat-chatbox-container">
            <Grid.Row>
                input
                <Input></Input>
            </Grid.Row>
            <GridRow>
                formatting
            </GridRow>
         </Grid.Row>
          
         

            </Grid>

            </GridColumn>
        )
    }
}
