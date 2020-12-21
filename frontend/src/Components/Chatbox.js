import React, { Component } from 'react'
import { Grid, Input, GridRow, Container, TextArea } from 'semantic-ui-react'

export default class Chatbox extends Component {
    render() {
        return (
            <Grid.Row className="chatbox-container">
                <Grid className="chatbox">
                    <Grid.Row className="chatbox-textarea-row">  
                <TextArea placeholder="Send a message to #channel" className="chatbox-input"></TextArea>
                    </Grid.Row>
                    <GridRow className="chatbox-formatting-row">
                    <button></button>
                     </GridRow>
                </Grid>
            </Grid.Row>



        )
    }
}
