import React, { Component } from 'react'
import { Modal, List, Button, Image, Search } from 'semantic-ui-react';


export default class UserListModal extends Component {
    state = {
        open: false,
    }

    setOpen = (open) => {
        this.setState({ open: open })
    }

    render() {
        let users = this.props && this.props.usersList.length > 0 ? 
        this.props.usersList.map((user, index) => {                   
                return (
                    <List.Item>
                        <Image className="user-list-picture"  src='https://ca.slack-edge.com/T01GTD2333N-U01GJ5P688M-gb0c7d943951-48' />
                        <List.Content>
                           <List.Header> <p className="user-list-name-container">
                            <span className="user-list-name">{user.username}</span>
                            </p>
                            </List.Header>
                        </List.Content>
                    </List.Item>
                ) 
            }) : <span></span>
        
        return (
            <Modal 
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
                open={this.state.open}
                size="tiny"
                trigger={<button className="unstyled user-count-channel-btn">
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
                    <button className="unstyled add-people-modal-btn">
                    <span className="btn-link-txt">Add people</span>
                    </button>
                    <List selection verticalAlign='middle' className="user-list">
                        {users}
                    </List>
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
