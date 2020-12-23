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
            <Grid verticalAlign='middle' className="workspace-name-grid" >
                <GridRow  className="nopadding-nomargin" columns="16">
                    <GridColumn className="nopadding-nomargin" width="12" >
                        <div className="bold workspace-name ">{this.props.title} <FaChevronDown size="0.75em"></FaChevronDown></div>
                    </GridColumn>
                    <GridColumn width="4" >


                        {/* <Button circular className="new-message-btn"> */}
                        <Icon id="write-messsage-icon" circular color="black"  size="em" name="pencil square"></Icon>
                            {/* <BsPencilSquare color="#3F0E40" size="1.10em"></BsPencilSquare> */}
                        {/* </Button> */}

                    </GridColumn>
                </GridRow>
            </Grid>
        )
    }
}
