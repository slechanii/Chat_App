import React, { Component } from 'react'
import { Modal, List, Button, Image, Search } from 'semantic-ui-react';
import { FaPlus } from 'react-icons/fa';
import AddUserSearchbar from './AddUserSearchbar';

export default class AddUsersModal extends Component {
    state = {
        open: false,
    }

    setOpen = (open) => {
        this.setState({ open: open })
    }

    // Closes modal and reload interface after having added a user
    reload = () => {
        this.setOpen(false)
        this.props.reload();
    }

    render() {
              
        return (
            <Modal 
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
                open={this.state.open}
                size="tiny"
                trigger={ this.props.addPeople === true ?  <span className="btn-link-txt">Add people</span> : <button className="unstyled" id="chat-add-btn">
                <FaPlus id="chat-add-icon" size="0.7em"></FaPlus>
                <span id="chat-add-text">Add</span>
            </button>}
            >
                <Modal.Header className="create-chan-header">Add people</Modal.Header>
                <Modal.Description className="channel-add-desc">#{this.props.channelName}</Modal.Description>
                <Modal.Content className="create-chan-content">
                <AddUserSearchbar  reload={this.reload} channelId={this.props.channelId}></AddUserSearchbar>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.setOpen(false)}>
                        Back
          </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
