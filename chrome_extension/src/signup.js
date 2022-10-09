/*global chrome*/
import React from 'react';

let serverhost = 'http://127.0.0.1:8000'

class SignupForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {
            name: "",
            email: "",
            password: "",
          }
        };

      this.handleChange = this.handle_change.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
      const username = this.state.user.name
      const email = this.state.user.email
      const password = this.state.user.password
      let token = await this.get_token(username, email, password)
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
          <h2>Welcome to Securepass project!</h2>
          <form onSubmit={this.handleSubmit}>
              <label>
                <div>Name:</div>
                <input  type="text" name="name" value={this.state.user.name} onChange={this.handleChange}/>
              </label>
              <br></br>
              <label>
                <div>Email:</div>
                <input type="text" name="email" value={this.state.user.email} onChange={this.handleChange} />
              </label>
              <label>
                <div>Password:</div>
                <input type="password" name="password" value={this.state.user.password} onChange={this.handleChange} />
                <PasswordChecker password = {this.state.user.password}/>
              </label>
            <input type="submit" value="send"/>
          </form>
          </div>
        );
      }
    }

class PasswordChecker extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pass_message: {},
        }
  
        this.handleChange = this.handleChange.bind(this);
      }

    componentDidUpdate(prevProps){
      if(prevProps.password !== this.props.password){
        this.handleChange(this.props.password)
      }
    }

    handleChange(pass) {
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
      this.setState({pass_message: message})
      }
    
    render(){
      return(
        <div>
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
        </div>
      )
    }
}

export {SignupForm}