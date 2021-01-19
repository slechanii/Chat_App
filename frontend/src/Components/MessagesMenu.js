import React, { Component } from 'react'
import { Grid, GridRow, GridColumn, Accordion, List, Icon } from 'semantic-ui-react';
import { FaChevronDown, FaHashtag, FaPlusSquare, FaUser, FaUserAlt, FaPlus } from 'react-icons/fa';
import { Redirect } from "react-router-dom";
import SendMessageModal from './SendMessageModal';

export default class MessagesMenu extends Component {
    state = {
        activeIndex: 0,
        hover: false,
        channels: [],
        profile_id: null,
        redirect: false,
        channel_to_load: null,
        display_channels: false,
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
            this.setState({hover: mouse_status})
    }
    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const channels = this.props.channels.map((data, idx) => {
            var active_channel = false
            if (data.id === this.getActiveChannel()) {
                active_channel = true
            }
            // Display channel if rendering fav list OR Display if rendering regular channels and channel isn't in fav list  
                 return (
  
                    <List.Item onClick={() => { this.loadChannel(data.id) }} className={`workspace-submenu-row-item ${active_channel ? "active-item" : ""}`} >
                        <List.Icon > <FaHashtag></FaHashtag></List.Icon>
                        <List.Content className="channel-title-menu">
                            {data.name}
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
        const { activeIndex } = this.state
        return (
            <GridRow className="side-menu-item" columns="16"  >
                <GridColumn className="no-padding" width="16">
                    <Accordion>
                        <Accordion.Title  onMouseEnter={() => {this.handleHover(true)}} onMouseLeave={() => {this.handleHover(false)}} className="workspace-submenu-row"
                            active={activeIndex === 0}
                            index={0}
                            onClick={this.handleClick}
                           
                        >
                                <Icon className="white" color="white" name="dropdown"></Icon>
                            <span className="bold white">Direct messages</span>

                            {/* Start chat hover icon */}
                            { this.state.hover === true &&
                            <span className="menu-side-icon-container">
                                <FaPlus className="menu-side-icon" color="white" size="0.9em"></FaPlus>
                            </span>
                            }
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 0}>
                            <List className="collapsible-menu-list">
                            {channels}
                                {/* <List.Item className="workspace-submenu-row-item">
                                    <List.Icon > <FaUserAlt></FaUserAlt></List.Icon>
                                    <List.Content className="channel-title-menu">
                                        <span>admin</span>
                                        <span>you</span>
                                    </List.Content>
                                </List.Item>
                                <List.Item className="workspace-submenu-row-item">
                                    <List.Icon > <FaUserAlt></FaUserAlt></List.Icon>
                                    <List.Content className="channel-title-menu">
                                        <span>John</span>
                                    </List.Content>
                                </List.Item>
                                <List.Item className="workspace-submenu-row-item">
                                    <List.Icon > <FaUserAlt></FaUserAlt></List.Icon>
                                    <List.Content className="channel-title-menu">
                                        <span>Jane</span>
                                    </List.Content>
                                </List.Item> */}
                                <SendMessageModal reload={this.props.refreshChannels}></SendMessageModal>

                            </List>
                        </Accordion.Content>
                    </Accordion>
                </GridColumn>
            </GridRow>
        )
    }
}
