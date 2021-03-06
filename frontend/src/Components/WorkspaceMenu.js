import React, { Component } from 'react'
import { Grid, GridRow, GridColumn, Divider } from 'semantic-ui-react';
import WorkspaceName from './WorkspaceName';
import { VscFiles } from 'react-icons/vsc';
import { BsBookmark } from 'react-icons/bs';
import ChannelsMenu from './ChannelsMenu';
import { FaPlus, FaPlusSquare } from 'react-icons/fa';
import MessagesMenu from './MessagesMenu';
import Chat from './Chat';

export default class WorkspaceMenu extends Component {

    state = {
        refreshChat: false,
    }

    changeState = (name, value) => {
        this.setState({[name]:value})
    }

    render() {
        if (this.state.refreshChat === true){
            this.setState({refreshChat: false})
            this.props.changeState("refreshChat", true)
        }
        
        return (
            <GridColumn className="workspace-menu" width={2}>
                <Grid className="text-not-selectable">
                    <GridRow className="workspace-main-row">
                        <GridColumn className="nopadding-nomargin"  >
                            <WorkspaceName title="Your Workspace"></WorkspaceName>
                        </GridColumn>
                    </GridRow>

                    {/* Drafts */}
                    <GridRow  id="drafts-row" columns="16" className="workspace-submenu-row side-menu-item no-padding" >
                        <GridColumn className="no-padding icon-col" width="1" >
                            <VscFiles></VscFiles>
                        </GridColumn>
                        <GridColumn className="nopadding-nomargin" width="14">
                            <span className="bold workspace-menu-text">Drafts</span>
                        </GridColumn>
                    </GridRow>

                    {/* Saved Items */}
                    <GridRow columns="16" className="workspace-submenu-row side-menu-item" >
                        <GridColumn className=" no-padding icon-col" width="1" >
                            <BsBookmark></BsBookmark>
                        </GridColumn>
                        <GridColumn className="nopadding-nomargin" width="14">
                            <span className="bold workspace-menu-text">Saved items</span>
                        </GridColumn>
                    </GridRow>

                    {/* Starred Channels list */}
                    <ChannelsMenu title="Starred channels" starChannels={true} channels={this.props.starredChannels} refreshChannels={this.props.refreshChannels}  changeState={this.changeState} ></ChannelsMenu>
                    
                    {/* Standard Channels list */}
                    <ChannelsMenu title="Channels" starChannels={false} channels={this.props.channels} starredChannels={this.props.starredChannels} refreshChannels={this.props.refreshChannels}  changeState={this.changeState} ></ChannelsMenu>
                    <MessagesMenu channels={this.props.userChats} refreshChannels={this.props.refreshChannels}  changeState={this.changeState}></MessagesMenu>
                    {/* <ChannelsMenu title="Direct messages" channels={this.props.userChats}></ChannelsMenu> */}
                   
                </Grid>
                <GridColumn width={14}> 
            </GridColumn>
            </GridColumn>

        )
    }
}
