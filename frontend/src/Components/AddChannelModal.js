import React, { Component } from 'react'
import { Modal, List, Header, Image, Button, Form, Checkbox, Grid } from 'semantic-ui-react';

export default class AddChannelModal extends Component {

    state = {
        open: false
    }

    setOpen = (open) => {
        this.setState({ open: open })
    }

    render() {
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
                            <label>Name</label>
                            <input placeholder='#general ' />
                        </Form.Field>
                        <Form.Field>
                            <label>Description (Optional)</label>
                            <input placeholder="What's this channel about ?" />
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
                    <Button
                        content="Create"
                        onClick={() => this.setOpen(false)}
                        positive
                    />
                </Modal.Actions>
            </Modal>

        )
    }
}
