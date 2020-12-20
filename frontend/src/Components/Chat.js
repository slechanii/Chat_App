import React, { Component } from 'react'
import { Grid, GridRow, GridColumn, Divider, Input } from 'semantic-ui-react';
import configData from "../config.json";
import axios from 'axios';
import ChatHeader from './ChatHeader.js';

export default class Chat extends Component {

    state = {
        messages: [],
        refresh: false,
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
                    <ChatHeader>

                    </ChatHeader>
                  
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
