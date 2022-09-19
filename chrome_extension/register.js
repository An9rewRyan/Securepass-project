const username = document.getElementById('username').textContent
const email = document.getElementById('email').textContent
const password = document.getElementById('password').textContent
const form = document.getElementById('superform')

form.addEventListener("submit", register, false);



async function register(event){
	event.preventDefault();

	chrome.runtime.sendMessage({username: username, email: email, password: password},
		function(response) {
			let options = {
				type: "basic",
				title: "Notification from securepass project",
				message: "Registration completed",
				iconUrl: "images/get_started128.png"
				};
				
				chrome.notifications.create(options, callback);
				
				function callback(){
					console.log('Registration completed!')
			}
		}
	)
}