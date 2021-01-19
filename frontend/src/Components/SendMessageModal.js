import React, { Component } from 'react'
import { Modal, Button, List} from 'semantic-ui-react';
import { FaPlusSquare } from 'react-icons/fa';
import AddUserSearchbar from './AddUserSearchbar';
import DirectMessageSearchbar from './DirectMessageSearchbar';

export default class SendMessageModal extends Component {
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
                trigger={                                 <List.Item className="workspace-submenu-row-item">
                <List.Icon > <FaPlusSquare></FaPlusSquare></List.Icon>
                <List.Content className="channel-title-menu">
                    Send direct message
                </List.Content>
            </List.Item>}
            >
                <Modal.Header className="create-chan-header">Start chatting with other members</Modal.Header>
                <Modal.Description className="channel-add-desc"></Modal.Description>
                <Modal.Content className="create-chan-content">
                <DirectMessageSearchbar  reload={this.reload} channelId={this.props.channelId}></DirectMessageSearchbar>
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
