const form = document.getElementById('superform')

form.addEventListener("submit", register, false);

async function register(event){
	event.preventDefault();
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
	chrome.runtime.sendMessage({username: username, email: email, password: password},
		function(response) {
			console.log("hello!")
		}
	)
}