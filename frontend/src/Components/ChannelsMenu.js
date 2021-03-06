import React, { Component } from 'react'
import { Grid, GridRow, GridColumn, Accordion, List, Icon, } from 'semantic-ui-react';
import { FaChevronDown, FaHashtag, FaPlusSquare, FaPlus } from 'react-icons/fa';
import { Redirect } from "react-router-dom";
import AddChannelModal from './AddChannelModal.js';
import UnreadMessagesNotif from './UnreadMessagesNotif.js';
// import { ModalExampleModal } from "../Components/AddChannelModal";



export default class ChannelsMenu extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        activeIndex: 0,
        hover: false,
        // channels: [],
        channels: this.props.channels,
        profile_id: null,
        redirect: false,
        channel_to_load: null,
        display_channels: false,
        active_channel: -1,
        new_messages: false,
        };

    loadChannel = (channel_id) => {
        const url = "/workspace/" + channel_id
        this.setState({ redirect: true })
        this.setState({ channel_to_load: url })
    }

    getActiveChannel = () => {
        let url = window.location.pathname
        url = url.split('/')[2]
        return (parseInt(url))
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



        let display_channels = false
        const { activeIndex } = this.state
        const channels = this.props.channels.map((data, idx) => {
            const unread_messages = data.user_read_count - data.message_count 
            var active_channel = false
            if (data.id === this.getActiveChannel()) {
                active_channel = true
                
                if (this.state.active_channel != data.id){ 
                    this.setState({active_channel: data.id})
                    // alert("active " + data.id)
                }
            }
            // Display channel if rendering fav list OR Display if rendering regular channels and channel isn't in fav list  
            if (this.props.starChannels === true || (this.props.starChannels === false && this.props.starredChannels.find(function (el) { return el.id === data.id }) == undefined)) {
                return (
  
                    <List.Item onClick={() => { this.loadChannel(data.id) }} className={`workspace-submenu-row-item ${active_channel ? "active-item" : ""}`} >
                        <List.Icon > <FaHashtag></FaHashtag></List.Icon>
                        <List.Content className="channel-title-menu">
                            {data.name} 
                            { unread_messages < 0 && active_channel === false &&
                            <UnreadMessagesNotif unreadMessages={unread_messages}></UnreadMessagesNotif>
                            }
                            </List.Content>
                    </List.Item>
                )
            }
            else
                return
        })



        if (this.state.redirect === true) {
            this.setState({ redirect: false })
            this.setState({ channel_to_load: null })
            this.props.changeState("refreshChat", true)
            return <Redirect to={this.state.channel_to_load} />
        }
        if (this.props.channels.length > 0 || this.props.starChannels === false)
            display_channels = true

        return (


            <GridRow className="side-menu-item" columns="16"  >
                {display_channels ?
                    <GridColumn className="no-padding" width="16">
                        <Accordion>
                            <Accordion.Title onMouseEnter={() => { this.handleHover(true) }} onMouseLeave={() => { this.handleHover(false) }} className="workspace-submenu-row"
                                active={activeIndex === 0}
                                index={0}
                                onClick={this.handleClick}
                            >
                                <Icon color="white" name="dropdown"></Icon>
                                <span className="white bold">{this.props.title}</span>
                                {/* Add Channel hover icon */}
                                {this.state.hover === true && this.props.starChannels != true &&
                                    <span className="menu-side-icon-container">
                                        <FaPlus className="menu-side-icon" color="white" size="0.9em"></FaPlus>
                                    </span>
                                }
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <List className="collapsible-menu-list">

                                    {channels}
                                    {this.props.starChannels != true &&
                                        <List.Item className="workspace-submenu-row-item">
                                            <List.Icon >       <FaPlusSquare ></FaPlusSquare></List.Icon>

                                            {/* Add channels */}

                                            <AddChannelModal refreshChannels={this.props.refreshChannels}></AddChannelModal>


                                        </List.Item>
                                    }
                                </List>
                            </Accordion.Content>
                        </Accordion>
                    </GridColumn> :
                    <span></span>
                }
            </GridRow>


        )
    }
}
