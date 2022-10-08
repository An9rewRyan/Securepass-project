/*global chrome*/

let serverhost = 'http://127.0.0.1:8000'

async function get_token(username, email, password) {
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
  
async function signup(event){
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
    }
  }

export {signup};