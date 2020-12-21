import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';

export default class Message extends Component {
    constructor(props) {
        super(props);
    }

    state = {

    }


    render() {

        return (

            <div className="message-row">

                <div className="message-left-col">
                    {this.props.showUsername === false &&
                        <span className="chat-message-side-time">6:33</span>
                    }
                    {this.props.showUsername === true &&
                        <img id="profile-img-chat-message" src="https://ca.slack-edge.com/T01GTD2333N-U01GJ5P688M-gb0c7d943951-48"></img>

                    }
                </div>
                <div className="message-right-col">

                    {this.props.showUsername === true &&
                        <div className="chat-message-header">
                            <span className="chat-message-username">
                                {this.props.username}
                            </span>
                            <span className="chat-message-time">
                                6:33 PM
                        </span>
                        </div>
                    }
                    <p className="chat-message">
                        {this.props.message}
                    </p>
                </div>
            </div>

        )
    }
}
