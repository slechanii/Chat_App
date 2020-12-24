import React, { Component } from 'react'
import { Menu, Popup, Segment, Icon } from 'semantic-ui-react'
import { VscInfo } from 'react-icons/vsc';

export default class ChannelMenu extends Component {

    state = {
        open: false,
    }

    setOpen = (open) => {
        this.setState({ open: open })
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
                    items={[
                        { key: 'leave', content: 'Leave channel', icon: 'log out' },
                        { key: 'delete', content: 'Delete channel', icon: 'delete' },
                    ]}
                    onItemClick={() => this.setOpen(false)}
                    // secondary
                    vertical
                />}
                on='click'
            >
            
                
            </Popup>
        )
    }
}
