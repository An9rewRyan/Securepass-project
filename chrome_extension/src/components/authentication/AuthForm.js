/*global chrome*/
import React from 'react';
import {
  Navigate
} from 'react-router-dom';
import { AbsPassChecker} from './AbsPassChecker';

class AuthForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {
            name: "",
            email: "",
            password: "",
          },
          authenticated: false
        };
      this.url = ""
      this.pass_handler = AbsPassChecker
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
        let response_json = {}
        try{
          let response = await fetch(this.url,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              method: "POST",
              body: JSON.stringify({username: username, email: email, password: password})
          })
          if (!response.ok){ 
            throw new Error(response.statusText);
          }
          response_json = await response.json()
        }
        catch(error){
          console.log(error)
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
        chrome.storage.local.set({"access_token": token})
        this.setState({authenticated: true})
        }
    }

    render() {
      let authenticated = this.state.authenticated
      return(
          <div>
            {authenticated && <Navigate to={"/home"} replace={true} />}
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
                <this.pass_handler password={this.state.user.password} />
              </label>
            <input type="submit" value="send"/>
          </form>
          </div>
        );
      }
    }

export {AuthForm}

