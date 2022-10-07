const form = document.getElementById('superform')
const submit_bttn = document.getElementById('submitter')

form.addEventListener("submit", register, false);

async function register(event){
	event.preventDefault();
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
	chrome.runtime.sendMessage({username: username, email: email, password: password},
		function(response) {
			console.log(response)
			chrome.storage.local.set({"access_token": response.access_token}, function() {
				console.log('Value is set to ' + response.access_token);
			 });
			chrome.storage.local.get(['access_token'], function(result) {
				console.log('Value currently is ' + result.access_token);
			});
		}
	)
	alert("You sucessfully registered to Securepass project!")
}