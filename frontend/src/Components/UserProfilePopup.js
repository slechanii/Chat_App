import React, { Component } from "react";
import { Menu, Popup, Segment, Icon, Button } from "semantic-ui-react";
import { VscInfo } from "react-icons/vsc";
import Axios from "axios";
import configData from "../config.json";
import { Redirect } from "react-router-dom";
import EditProfileModal from "./EditProfileModal.js";

export default class UserProfilePopup extends Component {
  state = {
    open: false,
    redirect: false,
    new_channel: 0
  };

  setOpen = open => {
    this.setState({ open: open });
  };

  addUserToChannel = () => {
    Axios.post(configData.SERVER_URL + "startChat/", {emitter_profile_id: localStorage.getItem("user_id"), receiver_profile_id: this.props.profile_id})
    .then((res) => {
        this.props.refreshChannels()  
    })
    .catch((err) => {
        console.log(err)
    })
}



  render() {

    const popup_size = this.props.username != localStorage.getItem("username") ? "small-user-popup" : "big-user-popup";
    var trigger = (
      <button className="unstyled profile-img-btn">
        <img
          id="profile-img"
          src="https://ca.slack-edge.com/T01GTD2333N-U01GJ5P688M-gb0c7d943951-48"
        ></img>
      </button>
    );
    // let trigger = (
    //     this.props.isUsername ?   <span className="chat-message-username">
    //         {/* {this.props.username} */}fzafza
    //      </span>
    //             :
    //             this.props.trigger

    return (
      <Popup
        flowing
        hoverable
        id="header-menu-popup"
        //     trigger={ this.props.isUsername ?   <span className="chat-message-username">
        //     {/* {this.props.username} */}fzafza
        //  </span>
        //         :
        //         this.props.trigger}
        trigger={trigger}
        offset={[50, 0]}
        onClose={() => this.setOpen(false)}
        onOpen={() => this.setOpen(true)}
        basic
        position="right center"
        content={
          <div className={`profile-popup-container ${popup_size}`}
            className="profile-popup-container">
            <div className="profile-popup-img-container">
              <img
                className="profile-popup-img"
                src="https://ca.slack-edge.com/T01GTD2333N-U01GJ5P688M-gb0c7d943951-512"
              ></img>
            </div>
            <div className="profile-popup-options-container">
              <div>
                <span className="popup-username">{this.props.username}</span>
              </div>

              {this.props.username != localStorage.getItem("username") &&
              <div className="popup-send-msg-container">
                <Button onClick={this.addUserToChannel}  color="blue" className="popup-send-msg-btn">Send Message</Button>
              </div>
              }
            </div>
          </div>
        }
        on="hover"
      ></Popup>
    );
  }
}
