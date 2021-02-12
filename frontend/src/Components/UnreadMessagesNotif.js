import React, { Component } from 'react'

export default class UnreadMessagesNotif extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <span className="unread-messages-container">
                <span className="unread-messages-txt">
                    {Math.abs(this.props.unreadMessages)}
                </span>
            </span>
        )
    }
}
