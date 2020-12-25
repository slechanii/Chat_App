import React, { Component } from 'react'
import { Grid, GridRow, GridColumn, Accordion, List, Icon, } from 'semantic-ui-react';
import { FaChevronDown, FaHashtag, FaPlusSquare, FaPlus } from 'react-icons/fa';
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

    loadChannel = (channel_id) => {
        const url = "/workspace/" + channel_id
        this.setState({ redirect: true })
        this.setState({ channel_to_load: url })
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
        const channels = this.props.channels.map((data, idx) => {
            return (
                <List.Item onClick={() => { this.loadChannel(data.id) }} className="workspace-submenu-row">
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

        return (
            <GridRow className="side-menu-item" columns="16"  >
                <GridColumn width="16">
                    <Accordion>
                        <Accordion.Title onMouseEnter={() => { this.handleHover(true) }} onMouseLeave={() => { this.handleHover(false) }} className="workspace-submenu-row"
                            active={activeIndex === 0}
                            index={0}
                            onClick={this.handleClick}
                        >
                      <Icon color="white" name="dropdown"></Icon>
                            <span className="white bold">Channels</span>
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
                                    <AddChannelModal refreshChannels={this.props.refreshChannels}></AddChannelModal>
                                

                                </List.Item>
                            </List>
                        </Accordion.Content>
                    </Accordion>
                </GridColumn>
            </GridRow>
        )
    }
}
