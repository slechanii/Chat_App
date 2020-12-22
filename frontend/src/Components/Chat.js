import React, { Component } from 'react'
import { Grid, GridRow, GridColumn, Divider, Input } from 'semantic-ui-react';
import configData from "../config.json";
import axios from 'axios';
import ChatHeader from './ChatHeader.js';
import MessageDisplay from './MessageDisplay.js';
import Chatbox from './Chatbox.js';

export default class Chat extends Component {

    state = {
        messages: [],
        refresh: false,
        channel_name : "",
        channel_members : [], 
    };


    componentDidMount() {
        this.getMessages();
    }

    getMessages = () => {
        let url = window.location.pathname
        url = url.split('/')[2]
        url = configData.SERVER_URL + "channels/" + url + "/"
        axios.get(url)
            .then((result) => {
                this.setState({channel_name: result.data.name})
                this.setState({channel_members: result.data.channel_member})
                this.setState({ messages: result.data.message_set })
                this.setState({ refresh: false })
            })
            .catch((error) => { console.log(error) })
    }


    render() {
        if (this.props.refreshChat === true) {
            this.getMessages();
            this.props.changeState("refreshChat", false)
        }

        let messages = this.state.messages.map((data, idx) => {
            return (
                <div>
                    <span>User#{data.sender} : {data.content}</span>
                </div>
            )
        })

        return (
            <GridColumn className="workspace-chat" width={14} onClick={this.getMessages}>
                <Grid className="chat-grid">
                    <ChatHeader channelName={this.state.channel_name} channelMembers={this.state.channel_members}>

                    </ChatHeader>
<div>
</div>
                    <Grid.Row className="chat-messages-container">
                        <MessageDisplay messages={this.state.messages}>
                        </MessageDisplay>
                    </Grid.Row>
                   
                       <Chatbox refreshMessages={this.getMessages}></Chatbox>
                    
                </Grid>

            </GridColumn>
        )
    }
}
