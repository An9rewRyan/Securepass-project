/*global chrome*/
import React from "react";
import {
    Link,
    Navigate
} from 'react-router-dom';

let serverhost = 'http://127.0.0.1:8000'

class Menu extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            registred: false,
            token_valid: false,
            checked: false,
            no_token: false,
            token: undefined,
            updates: 0
        }
        this.check_if_registred = this.check_if_registred.bind(this);
    }
    componentDidMount(){
        let data = this.check_if_registred()
        console.log("fetched data!")
    }
    async check_if_registred(){
        let url = serverhost + "/check"
        let data = await chrome.storage.local.get(['access_token'])
        console.log("actually doing something...")
        let token = data.access_token
        console.log(token)
        if (token){
            try{
                let response = await fetch(url,{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "access_token":token,
                        "token_type": "jwt"
                    })
                })
                let json = await response.json()
                if (json.status === "success"){
                    this.setState({token_valid: true, registred: true})
                }
                if (json.status === "failed" && json.explain === "token expired"){
                    this.setState({registred: true})
                }
                console.log(json.status, json.explain)
            }
            catch(err){
                console.log(err)
            }
        this.setState({checked:true})
        return
      }
      this.setState({no_token:true, checked:true})
      return
    }
 
    render(){
        let registered = this.state.registred
        let token_valid = this.state.token_valid
        let checked = this.state.checked
        let no_token = this.state.no_token
        console.log(registered, token_valid, checked, no_token)
        return(
                <ul>
                {!checked &&
                    <p>loading...</p>
                }
                {(no_token || checked && !registered) &&
                    <li>
                        <Link to={"/signup"}>Signup</Link>
                    </li>
                }
                {(no_token || checked && registered && !token_valid) &&
                    <li>
                        <Link to={"/signin"}>Signin</Link>
                    </li>
                }
                {checked && registered && token_valid &&
                    <li>
                        <Navigate to={"/home"} replace={true}/>
                    </li>
                }
            </ul>
        )
    }
}

export default Menu;