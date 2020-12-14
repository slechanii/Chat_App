import React, { Component } from 'react'
import { Grid, GridRow, GridColumn, Accordion, List } from 'semantic-ui-react';
import { FaChevronDown, FaHashtag, FaPlusSquare, FaPlus } from 'react-icons/fa';
export default class ChannelsMenu extends Component {
    state = {
        activeIndex: 0,
        hover: false,

    };

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
        return (
            <GridRow columns="16"  >
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
                                <List.Item className="workspace-submenu-row">
                                    <List.Icon > <FaHashtag></FaHashtag></List.Icon>
                                    <List.Content className="channel-title-menu">
                                        General
                                    </List.Content>
                                </List.Item>
                                <List.Item className="workspace-submenu-row">
                                    <List.Icon > <FaHashtag></FaHashtag></List.Icon>
                                    <List.Content className="channel-title-menu">
                                        General2
                                    </List.Content>
                                </List.Item>
                                <List.Item className="workspace-submenu-row">
                                    <List.Icon >       <FaPlusSquare ></FaPlusSquare></List.Icon>
                                    <List.Content className="channel-title-menu">
                                        Add channels
                                    </List.Content>
                                </List.Item>

                            </List>
                        </Accordion.Content>
                    </Accordion>
                </GridColumn>
            </GridRow>
        )
    }
}
