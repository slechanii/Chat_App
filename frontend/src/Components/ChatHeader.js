import React, { Component } from 'react'
import { Grid, Divider, Image, Button, Icon, Popup } from 'semantic-ui-react';
import { FaPause, FaPlus } from 'react-icons/fa';
import { BsStar } from 'react-icons/bs';
import '../../node_modules/semantic-ui-css/semantic.min.css';
import { VscInfo } from 'react-icons/vsc';
import ChannelMenu from './ChannelMenu';
import ChangeTopic from './ChangeTopic';
import UserListModal from './UserListModal';

export default class ChatHeader extends Component {

    render() {
        let topic = this.props.channelTopic
        if (topic === " ")
            topic = "Add a topic"
        return (
            <Grid.Row columns="16" className="chat-header">
                <Grid.Column width="8" className="center-vertical">
                    <Button id="channel-title-chat" className="unstyled text-btn">
                        #{this.props.channelName}
                    </Button>
                    <Button id="star-channel-btn" className="unstyled text-btn">
                        <BsStar ></BsStar>
                    </Button>
                    <div>
                        <ChangeTopic channelId={this.props.channelId} refreshChannels={this.props.refreshMessages} topic={topic}></ChangeTopic>
                    </div>

                </Grid.Column>
                <Grid.Column width="8" className="center-vertical">
                    <div id="chat-header-menu-container">

                        {/* <div className="double-button-half-right user-count-channel"> */}
                        <UserListModal  channelName={this.props.channelName} userList={this.props.channelMembers} />
                        {/* </div> */}
                        {/* </button> */}
                        {/* <Button id="chat-add-btn">
                        <FaPlus id="chat-add-icon" size="0.7em"></FaPlus>
                           <span>Add</span>
    </Button> */}

                        <button className="unstyled" id="chat-add-btn">
                            <FaPlus id="chat-add-icon" size="0.7em"></FaPlus>
                            <span id="chat-add-text">Add</span>
                        </button>
                        <ChannelMenu channelMembers={this.props.channelMembers} changeState={this.props.changeState} refreshMessages={this.props.refreshMessages} channels={this.props.channels} refreshChannels={this.props.refreshChannels} channelId={this.props.channelId}></ChannelMenu>
                    </div>
                </Grid.Column>
                <Divider className="divider-horizontal" horizontal></Divider>
            </Grid.Row >
        )
    }
}
