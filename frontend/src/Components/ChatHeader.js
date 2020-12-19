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
                    <Image className="profile-img-chat" src="https://ca.slack-edge.com/T01GTD2333N-U01GJ5P688M-gb0c7d943951-24" size="mini"></Image>
                    <span>1</span>
                    <Button icon labelPosition='left'>
                        <FaPause></FaPause>
                        Pause
    </Button>
                    <Button content='Secondary' secondary />
                </Grid.Column>
                <Divider></Divider>
            </Grid.Row>
        )
    }
}
