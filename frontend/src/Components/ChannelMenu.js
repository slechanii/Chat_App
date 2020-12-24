import React, { Component } from 'react'
import { Menu, Popup, Segment, Icon } from 'semantic-ui-react'
import { VscInfo } from 'react-icons/vsc';
import Axios from 'axios';
import configData from "../config.json";

export default class ChannelMenu extends Component {

    state = {
        open: false,
    }

    setOpen = (open) => {
        this.setState({ open: open })
    }


    deleteChannel = () => {
        this.setOpen(false);
        // alert("channel id is " + this.props.channelId)
        Axios.delete(configData.SERVER_URL + "channels/" + this.props.channelId + "/")
             .then((res) => {
                this.props.refreshChannels()    
             })
    }

    render() {
        return (
            
            <Popup id="header-menu-popup"
                trigger={<button className="unstyled" id="chat-info-btn" >
                    <VscInfo size="2em"></VscInfo>
                </button>}
                basic
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
                open={this.state.open}
                position='bottom right'
                content={<Menu className="menu-popup"
                    onItemClick={() => this.setOpen(false)}
                    // secondary
                    vertical
                >
                <Menu.Item>
                    Leave channel 
                    <Icon name="log out"></Icon>
                </Menu.Item>
                <Menu.Item onClick={this.deleteChannel}>
                    Delete channel 
                    <Icon name="delete"></Icon>
                </Menu.Item>
                
                </Menu>
            
            }
                on='click'
            >
            
                
            </Popup>
        )
    }
}
