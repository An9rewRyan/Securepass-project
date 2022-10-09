/*global chrome*/

import React from 'react';

let serverhost = 'http://127.0.0.1:8000'

class SignupForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {
            username: "",
            email: "",
          }
        };

      this.handleChange = this.handle_change.bind(this);
      this.handleSubmit = this.handle_submit.bind(this);
    }

    handle_change(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
    
        this.setState({
          user
        });
    }

    async get_token(username, email, password) {
        let url = serverhost + '/signup'
        let response_json = {}
        try{
          let response = await fetch(url,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              method: "POST",
              body: JSON.stringify({username: username, email: email, password: password})
          })
          if (!response.ok){ // or check for response.status
            throw new Error(response.statusText);
          }
          response_json = await response.json()
        }
        catch(error){
          alert(error)
          return error
        }
        return response_json.access_token; 
      }
      
    async handleSubmit(event){
      event.preventDefault();
      const username = document.getElementById('username').value
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value
      let token = await get_token(username, email, password)
      if (!(token instanceof Error)){
        chrome.storage.local.set({"access_token": token}, function() {
          console.log('Value is set to ' + token);
          });
        chrome.storage.local.get(['access_token'], function(result) {
          console.log('Value currently is ' + result.access_token);
        });
        alert("You sucessfully registered to Securepass project!")
        return {"status":"sucess"}
        }
    }

    render() {
      return (
          <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>Name:</div>
              <input  type="text" value={this.state.user.name} onChange={this.handleChange}/>
            </label>
            <br></br>
            <label>
            <div>Email:</div>
              <input type="text" value={this.state.user.email} onChange={this.handleChange} />
            </label>
            {PasswordChecker}
          </form>
          </div>
        );
      }
    }

export default SignupForm;

class PasswordChecker extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            pass_message: {},
        }
  
        this.handleChange = this.handle_change.bind(this);
      }
    
    handleChange(event) {
        let pass = event.target.value
        let message = {}
        if (pass.length <12){
            message.length="Password has to be at least 12 characters long!\n"
        }
        if (!(/[A-Z]/.test(pass))) {
            message.upper="Password has to contain at least one uppercase symbol!\n"
        }
        if (!(/[a-z]/.test(pass))) {
            message.lower="Password has to contain at least one lowercase symbol!\n"
        }
        if (!(/\d/.test(pass))) {
            message.number="Password has to contain at least one number!\n"
        }
        if (!(/[!@#\$%\^\&*\)\(+=._-]/.test(pass))) {
            message.special="Password has to contain at least one special character!\n"
        }
        if (pass.replace(/\D/g, '').length > parseInt(pass.length/2)){
            message.mostly_number="Password should not be mostly numeric!\n"
        }
        this.setState({password: event.target.value});
        this.setState({pass_message: message})
        }
    
    render(){
    <label>
        <div>Password:</div>
        <input type="password" value={this.state.password} onChange={this.handleChange} />
        {this.state.pass_message && (
          <div>
            <div style={{color: "red"}}>{this.state.pass_message.length}</div>
            <div style={{color: "red"}}>{this.state.pass_message.upper}</div>
            <div style={{color: "red"}}>{this.state.pass_message.lower}</div>
            <div style={{color: "red"}}>{this.state.pass_message.number}</div>
            <div style={{color: "red"}}>{this.state.pass_message.special}</div>
            <div style={{color: "red"}}>{this.state.pass_message.mostly_number}</div>
          </div>
        )}
      </label>
    }
}

