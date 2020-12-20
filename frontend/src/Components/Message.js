import React, { Component } from 'react'

export default class Message extends Component {
    constructor(props){
        super(props);
    }

    state = {

    }

    
    render() {
        let messages = this.props.messages.map((data, idx) => {
            // alert(data.content)
            return (
                <div>
                    <span>User#{data.sender} : {data.content}</span>
                </div>
            )
        })
        return (
            <div>
                {messages}
            </div>
        )
    }
}
