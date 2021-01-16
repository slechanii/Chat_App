import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';

export default class Message extends Component {
    constructor(props) {
        super(props);
    }

    state = {

    }


    render() {
        let local_date = new Date(this.props.date) 
        let time = local_date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})

        return (

            <div className="message-row">

                <div className="message-left-col">
                    {this.props.showUsername === false &&
                        <span className="chat-message-side-time">{time}</span>
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
                                {time} 
                        </span>
                        </div>
                    }
                    <p className="chat-message">
                        {/* {this.props.message} */}
                        <span dangerouslySetInnerHTML={{ __html: this.props.message }}></span>
                    </p>
                </div>
            </div>

        )
    }
}
