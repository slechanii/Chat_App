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
        channel_name: "",
        topic: "",
        channel_members: [],
        channelId: 0,
        channel_is_starred: false,
    };


    componentDidMount() {
        this.getMessages();
        
    }

    checkStarredChannel = (current_id) => {
        // alert(JSON.stringify(this.props.starredChannels))
        // for (const id in this.props.starredChannels) {
        //     if (this.props.starredChannels.hasOwnProperty(id)) {
        //         if (this.props.starredChannels[id]["id"] === parseInt(current_id)) {
        //             this.setState({ channel_is_starred: true })
        //             return
        //         }
        //     }
        // }
    }

    getMessages = () => {
        let url = window.location.pathname
        url = url.split('/')[2]
        this.setState({ channelId: parseInt(url) })
        // this.checkStarredChannel(url)
        // if (this.props.starredChannels.includes(parseInt(url)))
            // this.setState({ channel_is_starred: true })
        url = configData.SERVER_URL + "channels/" + url + "/"
        axios.get(url)
            .then((result) => {
                this.setState({ channel_name: result.data.name })
                this.setState({ channel_members: result.data.channel_member })
                this.setState({ messages: result.data.message_set })
                this.setState({ topic: result.data.topic })
                this.setState({ refresh: false })
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
                    <ChatHeader checkStarredChannel={this.props.checkStarredChannel} channelStarred={this.state.channel_is_starred} channelTopic={this.state.topic} channels={this.props.channels} refreshChannels={this.props.refreshChannels} channelId={this.state.channelId} refreshMessages={this.getMessages} channelName={this.state.channel_name} changeState={this.props.changeState} channelMembers={this.state.channel_members}>

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
