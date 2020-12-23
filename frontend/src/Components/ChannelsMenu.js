import React, { Component } from 'react'
import { Grid, GridRow, GridColumn, Accordion, List, Modal } from 'semantic-ui-react';
import { FaChevronDown, FaHashtag, FaPlusSquare, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import configData from "../config.json";
import { Redirect } from "react-router-dom";
import AddChannelModal from './AddChannelModal.js';
// import { ModalExampleModal } from "../Components/AddChannelModal";



export default class ChannelsMenu extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        activeIndex: 0,
        hover: false,
        channels: [],
        profile_id: null,
        redirect: false,
        channel_to_load: null,
    };

    getProfile = () => {
        axios.post(configData.SERVER_URL + "getProfile/", { "username": localStorage.getItem("username") })
            .then((result) => {
                // alert(JSON.stringify(result))          
                // this.setState({channels: result.data})
                this.setState({ profile_id: result.data })
                localStorage.setItem("user_id", result.data)
                this.getChannels();
            })
            .catch((error) => { console.log(error) })
    }

    loadChannel = (channel_id) => {
        const url = "/workspace/" + channel_id
        this.setState({ redirect: true })
        this.setState({ channel_to_load: url })
    }

    componentDidMount() {
        this.getProfile();
        // this.getChannels();
    }
    /*
        Get subscribed channels / GET / params : profile_id         
    */
    getChannels = () => {
        axios.post(configData.SERVER_URL + "getChannels/", { "profile_id": this.state.profile_id })
            .then((result) => {
                this.setState({ channels: result.data })
                // alert(JSON.stringify(result))
                // localStorage.setItem("")
            })
            .catch((error) => { console.log(error) })
    }

    handleHover = (mouse_status) => {
        if (mouse_status != this.state.hover)
            this.setState({ hover: mouse_status })

    }


    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state
        const channels = this.state.channels.map((data, idx) => {
            return (
                <List.Item onClick={() => { this.loadChannel(data.id) }} className="workspace-submenu-row">
                    <List.Icon > <FaHashtag></FaHashtag></List.Icon>
                    <List.Content className="channel-title-menu">
                        {data.name}
                        {/* data.id */}
                    </List.Content>
                </List.Item>
            )
        })

        if (this.state.redirect === true) {
            this.setState({ redirect: false })
            this.setState({ channel_to_load: null })
            this.props.changeState("refreshChat", true)
            return <Redirect to={this.state.channel_to_load} />
        }

        return (
            <GridRow className="nopadding-nomargin" columns="16"  >
                <GridColumn width="16">
                    <Accordion>
                        <Accordion.Title onMouseEnter={() => { this.handleHover(true) }} onMouseLeave={() => { this.handleHover(false) }} className="workspace-submenu-row"
                            active={activeIndex === 0}
                            index={0}
                            onClick={this.handleClick}
                        >
                            <FaChevronDown color="white"></FaChevronDown>
                            <span className="bold workspace-menu-text">Channels</span>
                            {/* Add Channel hover icon */}
                            {this.state.hover === true &&
                                <span className="menu-side-icon-container">
                                    <FaPlus className="menu-side-icon" color="white" size="0.9em"></FaPlus>
                                </span>
                            }
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 0}>
                            <List className="collapsible-menu-list">

                                {channels}
                                <List.Item className="workspace-submenu-row">
                                    <List.Icon >       <FaPlusSquare ></FaPlusSquare></List.Icon>
                                    
                                        {/* Add channels */}
                                    <AddChannelModal refreshChannels={this.getChannels}></AddChannelModal>
                                

                                </List.Item>
                            </List>
                        </Accordion.Content>
                    </Accordion>
                </GridColumn>
            </GridRow>
        )
    }
}
