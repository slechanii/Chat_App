import React, { Component } from 'react'
import { Grid, GridRow, GridColumn, Divider } from 'semantic-ui-react';
import WorkspaceName from './WorkspaceName';
import { VscFiles } from 'react-icons/vsc';
import { BsBookmark } from 'react-icons/bs';
import ChannelsMenu from './ChannelsMenu';
import { FaPlus, FaPlusSquare } from 'react-icons/fa';

export default class WorkspaceMenu extends Component {
    render() {
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
                    <ChannelsMenu></ChannelsMenu>

                    {/* Add Channels */}
                    <GridRow columns="16" className="workspace-submenu-row" >
                        <GridColumn className="add-channels-menu" width="2" >
                          <FaPlusSquare ></FaPlusSquare>
                        </GridColumn>
                        <GridColumn width="14">
                            <span className="bold workspace-menu-text" id="add-channels-menu-txt">Add channels</span>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </GridColumn>
        )
    }
}
