import React, { Component } from 'react'
import { Menu, Popup, Icon } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

export default class UserProfileMenu extends Component {

    state = {
        open: false,
        redirect: false,
        new_channel: 0,
    }


    setOpen = (open) => {
        this.setState({ open: open })
    }

    signOut = () => {
        localStorage.clear();
        this.setState({ redirect: true })
    }

    editProfile = () => {

    }


    render() {
        if (this.state.redirect === true) {
            this.setState({ redirect: false })
            return (

                <Redirect to="/login"></Redirect>
            )
        }
        return (
            <Popup id="header-menu-popup"
                trigger={
                    <button className="unstyled profile-img-btn">
                        <img id="profile-img" src="https://ca.slack-edge.com/T01GTD2333N-U01GJ5P688M-gb0c7d943951-48"></img>
                    </button>
                }
                basic
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
                open={this.state.open}
                position='bottom right'
                content={<Menu className="menu-popup"
                    onItemClick={() => this.setOpen(false)}              
                    vertical
                >

                    <Menu.Item onClick={this.signOut}>
                        Sign out
                    <Icon name="log out"></Icon>
                    </Menu.Item>


                </Menu>

                }
                on='click'
            >


            </Popup>
        )
    }
}
