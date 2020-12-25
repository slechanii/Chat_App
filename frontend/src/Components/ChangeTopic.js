import React, { Component } from 'react'
import { Modal, List, Button, Form, Checkbox, Grid } from 'semantic-ui-react';
import configData from  "../config.json";
import Axios from 'axios';

export default class ChangeTopic extends Component {
  
    state = {
        open: false,
        channel_topic: "",
    }


    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    setOpen = (open) => {
        this.setState({ open: open })
    }

    setTopic = () => {
        const req_body = {
            topic: this.state.channel_topic,            
        }

       Axios.patch(configData.SERVER_URL + "channels/" + this.props.channelId + "/", req_body)
            .then((res) => {
                this.props.refreshChannels();
                this.setState({open: false})
            })
            .catch((err) => {
                console.log(err)
            })

    }

    render() {
        const { channel_topic} = this.state 
        return (


            <Modal className=""
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
                open={this.state.open}
                size="mini"
                trigger={<Button id="chat-channel-topic" className="unstyled">{this.props.topic}</Button>}
            >
                <Modal.Header className="create-chan-header">Edit channel topic</Modal.Header>
                <Modal.Content className="create-chan-content">
                    <Form class="">
                        <Form.Field required>
                        
                        <Form.Input
                                placeholder='Channel topic'
                                name='channel_topic'
                                label="Channel topic"
                                onChange={this.handleChange}                             
                            />
                        </Form.Field>
                       

                    </Form>
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
