let serverhost = 'http://127.0.0.1:8000'

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
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
            .then(response => sendResponse(response))
            .catch(error => console.log(error))

        return true; 
}
);