import React, { Component } from 'react'
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';
import WorkspaceMenu from '../Components/WorkspaceMenu';
import Chat from '../Components/Chat';
import axios from 'axios';
import configData from "../config.json";
import UserProfileMenu from '../Components/UserProfileMenu';
import { Redirect } from "react-router-dom";

export default class Workspace extends Component {

    state = {
        refreshChat: false,
        profile_id: 0,
        channels: [],
        starred_channels: [],
        user_chats: [],
    }

    componentDidMount() {
        this.getProfile();
        this.getChannels();
        setInterval(this.getChannels, 5000);
    }


    getProfile = () => {
        axios.post(configData.SERVER_URL + "getProfile/", { "username": localStorage.getItem("username") })
            .then((result) => {
                this.setState({ profile_id: result.data })
                localStorage.setItem("user_id", result.data)
                this.getChannels();
            })
            .catch((error) => { console.log(error) })
    }


    changeState = (name, value) => {
        this.setState({ [name]: value })
    }

    /*
        Get subscribed channels / GET / params : profile_id         
    */
    getChannels = () => {
        axios.post(configData.SERVER_URL + "getChannels/", { "profile_id": this.state.profile_id })
            .then((result) => {
                // alert(JSON.stringify(result.data.subscribed_channels))
                this.setState({ channels: result.data.subscribed_channels })
                this.setState({ starred_channels: result.data.starred_channels })
                this.setState({ user_chats: result.data.user_chats })

            })
            .catch((error) => { console.log(error) })
    }



    render() {
        if (!localStorage.getItem("username") ||
            !localStorage.getItem("user_id"))
            return (
                <Redirect to="/login"></Redirect>
            )

        return (
            <Grid className="workspace-grid" >
                <GridRow className="workspace-first-row" columns={16}>
                <GridColumn className="profile-col" width={16}> 
                
                    <UserProfileMenu></UserProfileMenu>
                    </GridColumn>
                </GridRow>
                <GridRow className="workspace-second-row" columns={16}>
                    <WorkspaceMenu userChats={this.state.user_chats} starredChannels={this.state.starred_channels} channels={this.state.channels} refreshChannels={this.getChannels} changeState={this.changeState}></WorkspaceMenu>
                    <Chat userChats={this.state.user_chats} starredChannels={this.state.starred_channels} channels={this.state.channels} refreshChannels={this.getChannels} refreshChat={this.state.refreshChat} changeState={this.changeState}></Chat>
                </GridRow>
            </Grid>
        )
    }
}
