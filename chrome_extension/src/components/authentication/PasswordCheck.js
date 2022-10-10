import React from 'react';

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

export {PasswordChecker}