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
        alreadyEditing: false,
        editedMessage: -1, 
    }

 
    componentDidUpdate () {
        // this.scrollToBottom();
    }

    // Scroll to bottom of chat
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView();
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
        if (date){
        let yesterday = new Date();
        yesterday.setDate(new Date().getDate() - 1)
        if (new Date().toDateString() === date.toDateString())
            return ("Today")
        else if (date.toLocaleDateString() == yesterday.toLocaleDateString())
            return ("Yesterday")    
        else     
            return dateFormat(date, "mmmm dS yyyy")
        }
        return ("error")
    }


    render() {
        /* Checking if current message username is the same as the previous one, changing display
           of message depending on it like on the official Slack. */
        var old_username = "jdajzdjzajdjadjajd"
        var old_date = "djzakdjad"
        let messages = this.props.messages.map((data, idx) => {
            var showUsername = false
            var showDate = false
            var local_date_str = this.getDateToDisplay(new Date(data.sent_date))
            if (local_date_str != old_date)
                showDate = true
            old_date = local_date_str    
            var current_username = this.props.messages[idx].sender_name
            if (current_username != old_username)
                showUsername = true
            old_username = current_username  
            return (
                
                <div className="">
                     { showDate === true ?  <DateSeparator date={local_date_str}></DateSeparator>
                    : null}
                    <Message setEditedMessage={(id) => {this.setState({editedMessage: id})} } editedMessage={this.state.editedMessage} setEditing={(new_state) => {this.setState({alreadyEditing: new_state})}} isAlreadyEditing={this.state.alreadyEditing} refreshMessages={this.getMessages} refreshChannels={this.props.refreshChannels} profile_id={data.sender_id} showUsername={showUsername} date={data.sent_date} username={data.sender_name} messageId={data.id} message={data.content}></Message>
               
                   
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
