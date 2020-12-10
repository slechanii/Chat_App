import React, { Component } from 'react'
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';

export default class Workspace extends Component {
    render() {
        return (
            <Grid className="workspace-grid">
                <GridRow columns={16}>
                    <GridColumn className="workspace-menu" width={4}>
f
                    </GridColumn>
                    <GridColumn className="workspace-chat" width={12}>

                    </GridColumn>
                </GridRow>
            </Grid>
        )
    }
}
