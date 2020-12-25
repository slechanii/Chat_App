import React, { Component } from 'react'
import { Modal, List, Button, Form, Checkbox, Grid, Search } from 'semantic-ui-react';
import configData from "../config.json";
import Axios from 'axios';

export default class UserListModal extends Component {
    state = {
        open: false,
        channel_topic: "",
    }


    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    setOpen = (open) => {
        this.setState({ open: open })
    }

    createChannel = () => {
        const req_body = {
            name: this.state.channel_name,
            description: this.state.channel_desc,
            channel_member: [localStorage.getItem("user_id")],
            channel_admin: [localStorage.getItem("user_id")],
            // topic: " ",            
        }

        Axios.post(configData.SERVER_URL + "channels/", req_body)
            .then((res) => {
                this.props.refreshChannels();
                this.setState({ open: false })
            })
            .catch((err) => {
                console.log(err)
            })

    }

    render() {
        const { channel_topic } = this.state
        const users = this.props.userList.map((user, index) => {
            alert(JSON.stringify(user))
        }) 
        return (
            <Modal className=""
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
                open={this.state.open}
                size="mini"
                trigger={                   <button className="unstyled user-count-channel-btn">
                <div class="double-button-half-left">
                    <img id="profile-img-chat" src="https://ca.slack-edge.com/T01GTD2333N-U01GJ5P688M-gb0c7d943951-24"></img>
                </div>
                <div className="double-button-half-right user-count-channel">
                    <div className="double-button-count">
                        {this.props.userList.length}
                    </div>
                </div></button>}
            >
                <Modal.Header className="create-chan-header">{this.props.userList.length} members in #{this.props.channelName}</Modal.Header>
                <Modal.Content className="create-chan-content">
                    <button className="unstyled">Add people</button>
                    <List>
                        {users}
                    </List>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.setOpen(false)}>
                        Cancel
          </Button>
                    <Button positive onClick={this.setTopic}>
                        Set Topic
            </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
