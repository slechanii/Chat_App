import React, { Component } from 'react'
import { Modal, List, Header, Image, Button, Form, Checkbox, Grid } from 'semantic-ui-react';
import configData from  "../config.json";
import Axios from 'axios';

export default class AddChannelModal extends Component {

    state = {
        open: false,
        channel_name: "",
        channel_desc: "",
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
            topic: "-",            
        }

       Axios.post(configData.SERVER_URL + "channels/", req_body)
            .then((res) => {
                this.props.refreshChannels();
                this.setState({open: false})
            })
            .catch((err) => {
                console.log(err)
            })

    }

    render() {
        const { channel_name, channel_desc} = this.state 
        return (


            <Modal className="create-channel-modal"
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
                open={this.state.open}
                trigger={<List.Content className="channel-title-menu">Add Channels</List.Content>}
            >
                <Modal.Header className="create-chan-header">Create a Channel</Modal.Header>
                <Modal.Content className="create-chan-content">
                    <Modal.Description className="modal-desc">
                        <p className="secondary-text">
                            Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.
                    </p>
                    </Modal.Description>

                    <Form class="">
                        <Form.Field required>
                        <Form.Input
                                placeholder='#channel_name'
                                name='channel_name'
                                label="Name"
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                        <Form.Input
                                placeholder="What's this channel about ?"
                                name='channel_desc'
                                label="Description (Optional)"
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Grid>
                                <Grid.Row columns="16">
                                    <Grid.Column width="13">
                                        <Modal.Header className="bold">
                                            Make private
                                    </Modal.Header>
                                        <Modal.Description>
                                            <p className="secondary-text">
                                            When a channel is set to private, it can only be viewed or joined by invitation.
                                            </p>
                                 </Modal.Description>

                                    </Grid.Column>
                                    <Grid.Column verticalAlign="middle" width="3">
                                        <Checkbox  toggle />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Form.Field>

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.setOpen(false)}>
                        Cancel
              </Button>
                <Button positive onClick={this.createChannel}>
                    Create Channel
                </Button>
                </Modal.Actions>
            </Modal>

        )
    }
}
