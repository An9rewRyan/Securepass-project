let serverhost = 'http://127.0.0.1:8000'

chrome.runtime.onMessage.addListener(
    function(request, sendResponse) {
        var url = serverhost + '/signup'
        console.log(request)
        fetch(url,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              method: "POST",
              body: JSON.stringify({username: request.username, email: request.email, password: request.password})
            })
            .then(response => response.json())
            .then(response => {
                console.log("response: ",response)
                chrome.storage.local.set({"access_token": response.access_token}, function() {
                    console.log('Value is set to ' + response.access_token);
                  });
                chrome.storage.local.get(['access_token'], function(result) {
                    console.log('Value currently is ' + result.access_token);
                });
            })
            .catch(error => console.log(error))

        return true; 
}
);