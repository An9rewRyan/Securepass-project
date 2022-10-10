/*global chrome*/
import {
        BrowserRouter as Router,
        Routes,
        Route, 
        Link,
        Navigate,
        json
        // useLocation,
        // RouteMatch
    } from 'react-router-dom';
import SignupForm from "./components/SignupForm";
import AboutPage from "./components/About";
import HomePage from "./components/Home";
import React from "react";
import { checkPropTypes } from 'prop-types';

let serverhost = 'http://127.0.0.1:8000'

class Routing extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            registred: false,
            token_valid: false,
            checked: false,
            no_token: false,
            token: undefined
        }
        this.check_if_registred = this.check_if_registred.bind(this);
    }
    componentDidMount(){
        this.check_if_registred()
    }
    async check_if_registred(){
        let url = serverhost + "/check"
        let data = await chrome.storage.local.get(['access_token'])
        console.log("actually doing something...")
        let token = data.access_token
        console.log(token)
        if (token){
          fetch(url,{
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
          .then(response => response.json())
          .then(json => {
            if (json.status === "sucess"){
                this.setState({token_valid: true, registred: true})
            }
            if (json.status === "failed" && json.explain === "token expired"){
                this.setState({registred: true})
            }
        })
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
            <Router>
                <ul>
                    {!checked &&
                        <p>loading...</p>
                    }
                    {(no_token || checked && !registered) &&
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    }
                    {(no_token || checked && registered && !token_valid) &&
                        <li>
                            <Link to="/signin">Signin</Link>
                        </li>
                    }
                    {checked && registered && token_valid &&
                        <li>
                            <Navigate to={"/home"} replace={true} />
                        </li>
                    }
                </ul>
                <div className="App">
                    <Routes>
                        <Route exact path='/about' element={< AboutPage />}></Route>
                        <Route exact path='/signup' element={< SignupForm />}></Route>
                        <Route exact path='/signin' element={< SignupForm />}></Route>
                        <Route exact path='/home' element={< HomePage />}></Route>
                    </Routes>
                </div>
            </Router>           
        )
    }
}

export default Routing