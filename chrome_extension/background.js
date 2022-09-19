let serverhost = 'http://127.0.0.1:8000'

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var url = serverhost + '/marco/'
        
        fetch(url)
            .then(response => response.json())
            .then(response => sendResponse({message: response}))
            .catch(error => console.log(error))

        return true; 
}
);