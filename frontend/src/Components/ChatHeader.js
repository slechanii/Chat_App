import React, { Component } from 'react'
import { Grid, Divider, Image, Button, Icon, Popup } from 'semantic-ui-react';
import { BsStar } from 'react-icons/bs';
import '../../node_modules/semantic-ui-css/semantic.min.css';
import ChannelMenu from './ChannelMenu';
import ChangeTopic from './ChangeTopic';
import UserListModal from './UserListModal';
import Axios from 'axios';
import configData from "../config.json";
import AddUsersModal from './AddUsersModal';


export default class ChatHeader extends Component {

    state = {
        users_list: {},
    }

    componentWillMount () {
        this.getUserList();
        
    }

    getUserList = () => {
        Axios.post(configData.SERVER_URL + "getChannelMembers/", { channel_id: this.props.channelId })
            .then((res) => {
                this.setState({ users_list: res.data })
            })
    }

    starChannel = () => {
        const req_body = {
            profile_id: localStorage.getItem("user_id"),
            channel_id: this.props.channelId,
        }


        Axios.post(configData.SERVER_URL + "starChannel/", req_body)
             .then((res) => {
                this.props.refreshChannels()
                this.props.refreshMessages()
                this.props.checkStarredChannel()
             })
             .catch((err) =>{
                 console.log(err)
             })
    }


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
                    <Button id="star-channel-btn" onClick={this.starChannel} className="unstyled text-btn">
                        {this.props.channelStarred  ?
                        <Icon name="star" color="yellow"></Icon>
                        :
                        <Icon name="star" className="not-fav-star"></Icon>                            
                    }
                    </Button>
                    <div>
                        <ChangeTopic channelId={this.props.channelId} refreshChannels={this.props.refreshMessages} topic={topic}></ChangeTopic>
                    </div>

                </Grid.Column>
                <Grid.Column width="8" className="center-vertical">
                    <div id="chat-header-menu-container">

                        {/* <div className="double-button-half-right user-count-channel"> */}
                        <UserListModal usersList={this.state.users_list} channelName={this.props.channelName} userList={this.props.channelMembers} />
                        {/* </div> */}
                        {/* </button> */}
                        {/* <Button id="chat-add-btn">
                        <FaPlus id="chat-add-icon" size="0.7em"></FaPlus>
                           <span>Add</span>
    </Button> */}
                    <AddUsersModal channelId={this.props.channelId} reload={this.props.refreshMessages}  channelName={this.props.channelName}></AddUsersModal>
                       
                        <ChannelMenu channelMembers={this.props.channelMembers} changeState={this.props.changeState} refreshMessages={this.props.refreshMessages} channels={this.props.channels} refreshChannels={this.props.refreshChannels} channelId={this.props.channelId}></ChannelMenu>
                    </div>
                </Grid.Column>
                <Divider className="divider-horizontal" horizontal></Divider>
            </Grid.Row >
        )
    }
}
