const submit_button = document.getElementById('#keywordsubmit')
const search_form = document.getElementById('#keyword')
const form = document.getElementById('superform')

form.addEventListener("submit", notify, false);

async function notify(event){
	event.preventDefault();

	chrome.runtime.sendMessage({topic: 'search_topic'},
		function(response) {
			let options = {
				type: "basic",
				title: "Notification from opengenus foundation",
				message: "https://iq.opengenus.org",
				iconUrl: "images/get_started128.png"
				};
				
				
				chrome.notifications.create(options, callback);
				
				function callback(){
					console.log('Popup done!')
			}
		}
	)
	}
		




