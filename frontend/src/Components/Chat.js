import React, { Component } from 'react'
import { Grid, GridRow, GridColumn, Divider, Input } from 'semantic-ui-react';
import configData from "../config.json";
import axios from 'axios';
import ChatHeader from './ChatHeader.js';
import MessageDisplay from './MessageDisplay.js';
import Chatbox from './Chatbox.js';
import Axios from "axios";
export default class Chat extends Component {

    state = {
        messages: [],
        refresh: false,
        channel_name: "",
        topic: "",
        channel_members: [],
        channelId: 0,
        channel_is_starred: false,
        is_user_chat: false,
        user_chat_name: "", 
    };


    componentDidMount() {
        this.getMessages();
        setInterval(this.getMessages, 5000);
        if (this.state.channel_members && this.state.is_user_chat === true)
            this.getChatName();
    }

      // Used for user to user chats => returns name of other user to display as channel title
  getChatName = () => {
      if (this.state.channel_members != undefined){  
        //   alert(localStorage.getItem("user_id"))
        //   alert(this.state.channel_members.indexOf(parseInt(localStorage.getItem("user_id"))))
    let user_id = null;
    if (
      this.state.channel_members.indexOf(parseInt(localStorage.getItem("user_id"))) === 0
    ){
      user_id = this.state.channel_members[1];
    }
    else user_id = this.state.channel_members[0];
    Axios.get(configData.SERVER_URL + "profile/" + user_id).then(res => {
      this.setState({ user_chat_name: res.data.username });
    });
}
  };


    getMessages = () => {

        let url = window.location.pathname
        url = url.split('/')[2]
        this.setState({ channelId: parseInt(url) })
        url = configData.SERVER_URL + "channels/" + url + "/"
        axios.get(url + "?profile_id=" + localStorage.getItem("user_id"))
            .then((result) => {
                this.setState({ channel_name: result.data.name })
                this.setState({ channel_members: result.data.channel_member }, () => {this.getChatName()})
                this.setState({ messages: result.data.message_set })
                this.setState({ topic: result.data.topic })
                this.setState({ refresh: false })
                this.setState({is_user_chat: result.data.is_user_chat})
                if (result.data.star_channels.includes(parseInt(localStorage.getItem("user_item"))) 
                || parseInt(result.data.star_channels) === parseInt(localStorage.getItem("user_id"))){
                    this.setState({channel_is_starred: true})
                }
                else
                    this.setState({channel_is_starred: false})
            })
            .catch((error) => { console.log(error) })
         
    }


    render() {
        if (this.props.refreshChat === true) {
            this.getMessages();
            // if (this.state.channel_members.length > 0 && this.state.is_user_chat === true)
            // this.getChatName();
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
                    <ChatHeader user_chat_name={this.state.user_chat_name} isUserChat={this.state.is_user_chat}  checkStarredChannel={this.props.checkStarredChannel} channelStarred={this.state.channel_is_starred} channelTopic={this.state.topic} channels={this.props.channels} refreshChannels={this.props.refreshChannels} channelId={this.state.channelId} refreshMessages={this.getMessages} channelName={this.state.channel_name} changeState={this.props.changeState} channelMembers={this.state.channel_members}>

                    </ChatHeader>
                    <div>
                    </div>
                    <Grid.Row className="chat-messages-container">
                        <MessageDisplay refreshChannels={this.props.refreshChannels} messages={this.state.messages}>
                        </MessageDisplay>
                    </Grid.Row>

                    <Chatbox channelName={this.state.channel_name} refreshMessages={this.getMessages}></Chatbox>

                </Grid>

            </GridColumn>
        )
    }
}
