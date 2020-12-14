import React, { Component } from 'react'
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';


export default class WorkspaceSideMenu extends Component {
    render() {
        return (
            <Grid>
                <GridRow>
                    <GridColumn>
                    <VscFiles></VscFiles>
                    </GridColumn>
                    <GridColumn>

                    </GridColumn>
                </GridRow>
            </Grid>
        )
    }
}
