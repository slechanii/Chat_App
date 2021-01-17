import React, { Component } from 'react'
import Message from './Message';
import { Grid, Divider } from 'semantic-ui-react';
import jquery from 'jquery';
import DateSeparator from './DateSeparator';
import dateFormat from 'dateformat';

export default class MessageDisplay extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        deltaY: 0,
        maxDelta: 0,
    }

    componentDidMount() {
        // IE, Chrome, Safari, Opera
        window.addEventListener("wheel", this.scrollHandler);

        // Firefox
        window.addEventListener("DOMMouseScroll", this.scrollHandler);

        const maxDelta = jquery(".container-content").height() - window.innerHeight;

        this.setState({
            maxDelta
        });

        jquery(".container-content.left").css(
            "transform",
            `translateY(-${jquery(".container-content").height()}px)`
        );
        this.scrollToBottom();
    }

    componentDidUpdate () {
        this.scrollToBottom();
    }

    // Scroll to bottom of chat
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
      

    scrollHandler = event => {
        this.setState(state => {
            let newDeltaY = state.deltaY + event.deltaY;

            newDeltaY = Math.max(0, newDeltaY);
            newDeltaY = Math.min(this.state.maxDelta, newDeltaY);

            return {
                deltaY: newDeltaY
            };
        });
    };

    getDateToDisplay = (date) => {
        let yesterday = new Date();
        yesterday.setDate(new Date().getDate() - 1)
        if (new Date().toDateString() === date.toDateString())
            return ("Today")
        else if (date.toLocaleDateString() == yesterday.toLocaleDateString())
            return ("Yesterday")    
        else     
            return dateFormat(date, "mmmm dS yyyy")
    }


    render() {
        /* Checking if current message username is the same as the previous one, changing display
           of message depending on it like on the official Slack. */
        var old_username = "jdajzdjzajdjadjajd"
        let messages = this.props.messages.map((data, idx) => {
            var showUsername = false
            var current_username = this.props.messages[idx].sender_name
            if (current_username != old_username)
                showUsername = true
            old_username = current_username  
            var local_date_str = this.getDateToDisplay(new Date(data.sent_date))
                        // let date = local_date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
    
            return (
                <div className="">
                    <Message showUsername={showUsername} date={data.sent_date} username={data.sender_name} message={data.content}></Message>
                    <DateSeparator date={local_date_str}></DateSeparator>
                </div>
            )
        })
        return (
            <Grid.Row className="message-display-container">
                <div className="">
                    {messages}

                    {/* Blank div to make scroll to bottom easy */}
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>

            </Grid.Row>
        )
    }
}
