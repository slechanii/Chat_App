import React, { Component } from "react";
import { Grid, GridRow, GridColumn, Button } from "semantic-ui-react";
import UserProfileMenu from "./UserProfileMenu";
import UserProfilePopup from "./UserProfilePopup";
import MessageMenuBar from "./MessageMenuBar";
import Chatbox from "./Chatbox";

export default class Message extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    hover: false,
    editing: false,
  };

  editMessage = () => {
    if (this.props.isAlreadyEditing === false ){         
        this.setState({editing: true})
        this.props.setEditing(true);
        this.props.setEditedMessage(this.props.messageId)
    }
    else if (this.props.editedMessage === this.props.messageId){
        this.setState({editing: true})
        this.props.setEditing(true);
        this.props.setEditedMessage(this.props.messageId)
    }
    
  } 

  cancelEditing = () => {
    this.props.setEditing(false);
    this.props.setEditedMessage(-1)
    this.setState({editing: false})
  }

  render() {
    let local_date = new Date(this.props.date);
    let time = local_date.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit"
    });
    let username_trigger = (
      <span className="chat-message-username">{this.props.username}</span>
    );
    return ( 
    <Grid>
        {this.state.editing === false ?
        <GridRow         className="message-row"
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        columns="16">
            <GridColumn className="message-col-left" width="1">
            
            <div className="message-left-col">
          {this.props.showUsername === false && (
            <span className="chat-message-side-time">{time}</span>
          )}
          {this.props.showUsername === true && (
            <UserProfilePopup
              profile_id={this.props.profile_id}
              refreshChannels={this.props.refreshChannels}
              username={this.props.username}
            ></UserProfilePopup>
          )}
        </div>
            </GridColumn >
            <GridColumn width="14">
            {this.props.showUsername === true && (
            <div className="chat-message-header">
              <div className="message-menu-col">
          
              </div>
              {username_trigger}
              <span className="chat-message-time">{time}</span>
            </div>
          )}

          {this.props.showUsername === false && (
            <div className="chat-message-header-menu">
              <div className="message-menu-col">

              </div>
          
            </div>
          )}
            <p className="chat-message">
            <span
              dangerouslySetInnerHTML={{ __html: this.props.message }}
            ></span>
          </p>
            </GridColumn>
            <GridColumn>
            {this.state.hover === true && <MessageMenuBar editMessage={this.editMessage} refreshMessages={this.getMessages} messageId={this.props.messageId} profileId={this.props.profile_id}></MessageMenuBar>}
            </GridColumn>
        </GridRow>
        :
        <div  className="message-row-edit" columns="16">
        <Chatbox messageId={this.props.messageId}  cancelEditing={this.cancelEditing}  isEditing={true} oldMessage={this.props.message} ></Chatbox>
        {/* <Button color="grey">Cancel</Button>
        <Button color="green">Save changes</Button> */}
        </div>
        }
    </Grid>
    );
  }
}
