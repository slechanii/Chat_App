import React, { Component } from 'react'
import { Menu, Popup, Segment, Icon } from 'semantic-ui-react'
import { VscInfo } from 'react-icons/vsc';
import Axios from 'axios';
import configData from "../config.json";
import { Redirect } from "react-router-dom";

export default class ChannelMenu extends Component {

    state = {
        open: false,
        redirect: false,
        new_channel: 0,
    }

    setOpen = (open) => {
        this.setState({ open: open })
    }

    pickNewChannelToLoad = () =>{
        let new_channel_id = this.props.channels[0]["id"];
        if (new_channel_id === this.props.channelId)
            new_channel_id = this.props.channels[1]["id"]
        return (new_channel_id)    
    }

    deleteChannel = () => {
        this.setOpen(false);        
        Axios.delete(configData.SERVER_URL + "channels/" + this.props.channelId + "/")
             .then((res) => {              
                this.props.refreshChannels()   
                this.setState({redirect:true})
                this.setState({new_channel: this.pickNewChannelToLoad()})
                this.setState({redirect:true})
             })
    }

    render() {


        if (this.state.redirect === true) {
            let channel_url = "/workspace/" + this.state.new_channel;
            this.setState({ redirect: false })
            this.setState({ new_channel: 0 })
            this.props.changeState("refreshChat", true)
            return <Redirect to={channel_url}/>
        }
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
