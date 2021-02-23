import React, { Component } from "react";
import { Grid, GridRow, GridColumn } from "semantic-ui-react";
import UserProfileMenu from "./UserProfileMenu";
import UserProfilePopup from "./UserProfilePopup";
import MessageMenuBar from "./MessageMenuBar";

export default class Message extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    hover: false,
    editing: false
  };

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
    //   <div
    //     className="message-row"
    //     onMouseEnter={() => this.setState({ hover: true })}
    //     onMouseLeave={() => this.setState({ hover: false })}
    //   >
    //     <div className="message-left-col">
    //       {this.props.showUsername === false && (
    //         <span className="chat-message-side-time">{time}</span>
    //       )}
    //       {this.props.showUsername === true && (
    //         <UserProfilePopup
    //           profile_id={this.props.profile_id}
    //           refreshChannels={this.props.refreshChannels}
    //           username={this.props.username}
    //         ></UserProfilePopup>
    //       )}
    //     </div>
    //     <div className="message-right-col">
    //       {this.props.showUsername === true && (
    //         <div className="chat-message-header">
    //           <div className="message-menu-col">
    //             {this.state.hover === true && <MessageMenuBar></MessageMenuBar>}
    //           </div>
    //           {username_trigger}
    //           {/* <UserProfileMenu isUsername={true}></UserProfileMenu> */}
    //           <span className="chat-message-time">{time}</span>
    //         </div>
    //       )}

    //       {this.props.showUsername === false && (
    //         <div className="chat-message-header-menu">
    //           <div className="message-menu-col">
    //             {this.state.hover === true && <MessageMenuBar></MessageMenuBar>}
    //           </div>
          
    //         </div>
    //       )}

    //       <p className="chat-message">
    //         {/* {this.props.message} */}
    //         <span
    //           dangerouslySetInnerHTML={{ __html: this.props.message }}
    //         ></span>
    //       </p>
    //     </div>
    //   </div>
    <Grid>
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
              {/* <UserProfileMenu isUsername={true}></UserProfileMenu> */}
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
            {/* {this.props.message} */}
            <span
              dangerouslySetInnerHTML={{ __html: this.props.message }}
            ></span>
          </p>
            </GridColumn>
            <GridColumn>
            {this.state.hover === true && <MessageMenuBar></MessageMenuBar>}
            </GridColumn>
        </GridRow>
    </Grid>
    );
  }
}
