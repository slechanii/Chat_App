import React, { Component } from 'react'
import { Button, Grid, GridRow, GridColumn, Form } from 'semantic-ui-react'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import configData from  "../config.json";

export default class Register extends Component {

    state = { username: '', password: '', submittedUsername: '', submittedPassword: '', redirect: false,}

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { username, password } = this.state

        this.setState({ submittedUsername: username, submittedPassword: password })
        this.loginAccount(username, password)        
    }

    loginAccount = (username, password) => {
        axios.post(configData.SERVER_URL + "token/", {username:username, password:password})
        .then(res => {
            localStorage.setItem("username", username)
            this.setState({redirect:true})
        })
        .catch(error => {
            alert("Error : " + error)
        })
    }

    render() {
        if (this.state.redirect === true){
            return <Redirect to="/workspace" />
        }
        const { username, password, submittedUsername, submittedPassword } = this.state 
        return (
            <Grid verticalAlign="middle" columns={4} >
                <GridRow verticalAlign="middle" centered>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Input
                                placeholder='Username'
                                name='username'
                                value={username}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={this.handleChange}
                            />
                            <Form.Button content='Login' />
                        </Form.Group>
                    </Form>

                </GridRow>
            </Grid>
        )
    }
}
