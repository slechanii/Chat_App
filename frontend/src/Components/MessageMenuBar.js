import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react';

export default class MessageMenuBar extends Component {
    render() {
        return (
            <Menu className="message-menu-bar">
            <Menu.Item>
                <Icon name="edit"></Icon>
            </Menu.Item>
                <Menu.Item>
                    <Icon name="delete"></Icon>
                </Menu.Item>
            </Menu>
        )
    }
}
