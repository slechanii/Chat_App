import React, { Component } from 'react'
import { Grid, GridRow, GridColumn, Divider } from 'semantic-ui-react';
import WorkspaceName from './WorkspaceName';

export default class WorkspaceMenu extends Component {
    render() {
        return (
            <GridColumn className="workspace-menu" width={2}>
                <Grid>
                    <GridRow >
                        <GridColumn >
                            <Divider></Divider>
                            <WorkspaceName title="Your Workspace"></WorkspaceName>
                        
                            <Divider></Divider>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </GridColumn>
        )
    }
}
