/*global chrome*/
import React from 'react';

class AboutPage extends React.Component{
    render(){
        return(
            <div>
                <h1>Congratulations!</h1>
                <h2>You sucessfully registered!</h2>
                <form>
                    <label>
                        Site_url:
                    </label>
                    <input type="text"/>          
                    <label>
                        Password:
                    </label>
                    <input type="password"/>
                    <input type="submit" value="Add new password"/>
                </form>
            </div>
        )
    }
}

export default AboutPage;