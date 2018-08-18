window.onload = function() {
	MainPage();
}

var MainPage = function MainPage(){


	var options = {
		allowSignUp: false,
		allowedConnections: ['google-oauth2'],
		theme: {
			logo: '',
			primaryColor: '#37CCEB',
			foregroundColor: '#000'
		},
		languageDictionary: {
			title: 'Login'
		}
	};

	var lock = new Auth0Lock('4KipMUJpu0LRw6ryoywsCelEP0mUdiG9', 'vrjuliao.auth0.com', options);
	// Listening for the authenticated event
	lock.on("authenticated", function(authResult) {
		// Use the token in authResult to getUserInfo() and save it to localStorage
		lock.getUserInfo(authResult.accessToken, function(error, profile) {
			if (error) {
			// Handle error
			return;
		}
		
		});
	});

	document.getElementById('rate').addEventListener("click", function(){
		lock.show();
	});
};