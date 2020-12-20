import React, { Component } from 'react'
import Message from './Message';

export default class MessageDisplay extends Component {
    constructor(props){
        super(props);
    }

    state = {

    }

    
    render() {
        let messages = this.props.messages.map((data, idx) => {
            alert(JSON.stringify(data))
            return (
                <div>
                    <span>User#{data.sender} : {data.content}</span>
                </div>
                // <Message user/>

                // </Message>
            )
        })
        return (
            <div>
                {messages}
            </div>
        )
    }
}
