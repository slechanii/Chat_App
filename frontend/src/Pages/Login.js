import React, { Component } from 'react'
import { Grid, Message, Form } from 'semantic-ui-react'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import configData from  "../config.json";

export default class Register extends Component {

    state = { username: '', password: '', submittedUsername: '', submittedPassword: '', redirect: false, error:false,}

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
            this.setState({error: true})
            console.log("Error : " + error)
        })
    }

    render() {
        if (this.state.redirect === true){
            return <Redirect to="/workspace" />
        }
        const { username, password, submittedUsername, submittedPassword } = this.state 
        return (

            <Grid className="register-container" verticalAlign="top">
            <Grid.Row className="register-row" centered>
              <Grid.Column width={4}>
                <p className="register-text">Sign in to Slack-lite</p>
    
                <Form error={this.state.error} onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <Form.Input
                      required
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                      className="input-username"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      required
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      className="input-password"
                    />
                  </Form.Field>
                  <Form.Button className="input-button" content="Sign in" />
                  <Message
                    error
                    header="Something went wrong"
                    content="This account or the username/password pair given doesn't exist"
                  />
                </Form>
    
                <p className="register-subtext"><a href="register">You don't have an account yet ?  </a></p>
     
              </Grid.Column>
            </Grid.Row>
          </Grid>

        )
    }
}
