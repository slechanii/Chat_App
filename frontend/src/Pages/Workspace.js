import React, { Component } from 'react'
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';
import WorkspaceMenu from '../Components/WorkspaceMenu';
import Chat from '../Components/Chat';
import axios from 'axios';
import configData from "../config.json";

export default class Workspace extends Component {

    state = {
        refreshChat: false,
        profile_id: 0,
        channels : [],
    }

    componentDidMount() {
        this.getProfile();
        this.getChannels();
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
                this.setState({ channels: result.data })
            })
            .catch((error) => { console.log(error) })
    }



    render() {

        return (
            <Grid className="workspace-grid" >
                <GridRow className="workspace-first-row" columns={16}>
                    <GridColumn>
                        dkkza
            </GridColumn>
                </GridRow>
                <GridRow className="workspace-second-row" columns={16}>
                    <WorkspaceMenu  channels={this.state.channels} refreshChannels={this.getChannels} changeState={this.changeState}></WorkspaceMenu>
                    <Chat channels={this.state.channels} refreshChannels={this.getChannels} refreshChat={this.state.refreshChat} changeState={this.changeState}></Chat>
                </GridRow>
            </Grid>
        )
    }
}
