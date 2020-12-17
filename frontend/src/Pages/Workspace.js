import React, { Component } from 'react'
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';
import WorkspaceMenu from '../Components/WorkspaceMenu';
import Chat from '../Components/Chat';

export default class Workspace extends Component {

    state = {
        refreshChat: false,
    }


    changeState = (name, value) => {
        this.setState({[name]:value})
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
                    <WorkspaceMenu changeState={this.changeState}></WorkspaceMenu>
                    <Chat refreshChat={this.state.refreshChat} changeState={this.changeState}></Chat>
                </GridRow>
            </Grid>
        )
    }
}
