import React, { Component } from 'react'
import Message from './Message';
import { Grid } from 'semantic-ui-react';
import jquery from 'jquery';

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
    
 

    render() {
        let messages = this.props.messages.map((data, idx) => {
            return (
                <div className="">
                    <Message showUsername={true} date={data.sent_date} username={data.sender_name} message={data.content}></Message>
                </div>
            )
        })
        return (
            <Grid.Row className="message-display-container">
                <div className="">
                {messages}
                </div>
                   
            </Grid.Row>
        )
    }
}
