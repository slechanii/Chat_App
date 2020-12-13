import React, { Component } from 'react'
import { Grid, GridRow, GridColumn, Icon, Button } from 'semantic-ui-react';
import { FaChevronDown, FaPenSquare } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs'


export default class WorkspaceName extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Grid className="workspace-name-grid" >
                <GridRow columns="16">
                    <GridColumn width="12" className="testcol">
                        <span className="bold">{this.props.title}</span> <FaChevronDown size="0.75em"></FaChevronDown>
                    </GridColumn>
                    <GridColumn width="4" >


                        <Button circular className="new-message-btn">
                            <BsPencilSquare color="black" size="1.10em"></BsPencilSquare>
                        </Button>

                    </GridColumn>
                </GridRow>
            </Grid>
        )
    }
}
