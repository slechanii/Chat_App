import React, { Component } from 'react'
import { Grid, Divider, Image, Button, Icon } from 'semantic-ui-react';
import { FaPause } from 'react-icons/fa';
import { BsStar } from 'react-icons/bs';

export default class ChatHeader extends Component {
    render() {
        return (
            <Grid.Row columns="16" className="chat-header">
                <Grid.Column width="8" className="center-vertical">
                    <Button id="channel-title-chat" className="unstyled text-btn">
                        #title
                    </Button>
                    <Button id="star-channel-btn" className="unstyled text-btn">
                        <BsStar ></BsStar>
                    </Button>
                    <div>
                        <Button id="chat-channel-topic" className="unstyled">
                            Add a topic
                        </Button>
                    </div>

                </Grid.Column>
                <Grid.Column width="8" className="center-vertical">
                    <div id="chat-header-menu-container">


                        <button className="unstyled user-count-channel-btn">
                            <div class="double-button-half-left">
                                <img id="profile-img-chat" src="https://ca.slack-edge.com/T01GTD2333N-U01GJ5P688M-gb0c7d943951-24"></img>
                            </div>
                            <div className="double-button-half-right user-count-channel">
                                <div className="double-button-count">
                                    1</div>
                            </div>
                        </button>
                        <Button icon labelPosition='left'>
                            <FaPause></FaPause>
                            Pause
    </Button>
                        <Button content='Secondary' secondary />

                    </div>
                </Grid.Column>

            </Grid.Row>
        )
    }
}
