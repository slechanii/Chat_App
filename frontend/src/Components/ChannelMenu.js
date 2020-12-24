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
        // alert(this.state.open)
        return (
            <Popup
                trigger={<button className="unstyled" id="chat-info-btn" >
                    <VscInfo size="2em"></VscInfo>
                </button>}
                basic
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
                open={this.state.open}
                content={<Menu
                    items={[
                        { key: 'copy', content: 'Copy', icon: 'copy' },
                        { key: 'code', content: 'View source code', icon: 'code' },
                    ]}
                    onItemClick={() => this.setOpen(false)}
                    secondary
                    vertical
                />}
                on='click'
            >
            
                
            </Popup>
        )
    }
}
