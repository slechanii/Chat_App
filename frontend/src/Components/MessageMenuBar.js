import React, { Component } from "react";
import { Menu, Icon, Popup } from "semantic-ui-react";
import Axios from "axios";
import configData from "../config.json";

export default class MessageMenuBar extends Component {
    constructor(props)
    {
        super(props)
    }
    state = {
        isMessageWritter: false,
    }

    deleteMessage = () => {


       Axios.delete(configData.SERVER_URL + "messages/" + this.props.messageId + "/")
            .then((res) => {
                this.props.refreshMessages();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount () {
        this.setState({isMessageWritter: this.props.profileId === parseInt(localStorage.getItem("user_id"))})

    }
    
  
    render() {
    return (
      <Menu className="message-menu-bar">
        {this.state.isMessageWritter === true && (
          <>
            <Menu.Item onClick={this.props.editMessage} data-tooltip="Edit message" data-inverted="" className="message-menu-bar-btn">
              <Icon name="edit outline"></Icon>
            </Menu.Item>
            <Menu.Item data-tooltip="Delete message" onClick={this.deleteMessage} data-inverted=""  className="message-menu-bar-btn">
            
              <Icon name="trash alternate outline"></Icon>
            </Menu.Item>
          </>
        )}
        <Menu.Item  data-tooltip="Reactions" data-inverted=""  className="message-menu-bar-btn">
          <Icon name="smile outline"></Icon>
        </Menu.Item>
      </Menu>
    );
  }
}
