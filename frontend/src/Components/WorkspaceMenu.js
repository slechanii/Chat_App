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
                <Grid>
                    <GridRow className="workspace-main-row">
                        <GridColumn >
                            <Divider></Divider>
                            <WorkspaceName title="Your Workspace"></WorkspaceName>
                            <Divider></Divider>
                        </GridColumn>
                    </GridRow>

                    {/* Drafts */}
                    <GridRow columns="16" className="workspace-submenu-row" >
                        <GridColumn className="icon-col" width="1" >
                            <VscFiles></VscFiles>
                        </GridColumn>
                        <GridColumn width="15">
                            <span className="bold workspace-menu-text">Drafts</span>
                        </GridColumn>
                    </GridRow>

                    {/* Saved Items */}
                    <GridRow columns="16" className="workspace-submenu-row" >
                        <GridColumn className="icon-col" width="1" >
                            <BsBookmark></BsBookmark>
                        </GridColumn>
                        <GridColumn width="15">
                            <span className="bold workspace-menu-text">Saved items</span>
                        </GridColumn>
                    </GridRow>

                    {/* Channels list */}
                    <ChannelsMenu changeState={this.changeState} ></ChannelsMenu>
                    <MessagesMenu></MessagesMenu>
                   
                </Grid>
                <GridColumn width={14}> 
                   {/* <Chat></Chat> */}
            </GridColumn>
            </GridColumn>

        )
    }
}
