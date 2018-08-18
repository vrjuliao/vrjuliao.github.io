var database;
var ui;
var rateValue;
var currentUser;
var app;
window.onload = function() {
	MainPage();
	// openModal();
}

var uiConfig = {
		callbacks: {
			signInSuccess: function(authResult, credential, redirectUrl) {
				// User successfully signed in.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
				
				saveData(firebase.auth().currentUser.uid);
				return false;
    		},
			uiShown: function() {
			// The widget is rendered.
			// Hide the loader.
			}
		},
	  	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
		signInFlow: 'popup',
		signInSuccessUrl: true,
		signInOptions: [
			// Leave the lines as is for the providers you want to offer your users.
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID
	  	]
  		// Terms of service url.
  		// tosUrl: '<your-tos-url>'
	};

var MainPage = function MainPage(){
	var appConfig = {
		apiKey: "AIzaSyB9vK4Z7fJTd8RplEsYJ-h48XWMn7Clb_I",
		authDomain: "vrjuliao-personal-page.firebaseapp.com",
		databaseURL: "https://vrjuliao-personal-page.firebaseio.com",
		projectId: "vrjuliao-personal-page",
		storageBucket: "vrjuliao-personal-page.appspot.com",
		messagingSenderId: "177182763925",
	};

	app = firebase.initializeApp(appConfig);
	// database = firebase.database;

	ui = new firebaseui.auth.AuthUI(firebase.auth());
};

var saveData = function(userId){
	document.getElementById('firebaseui-auth-container').style.visibility = "hidden";
	document.getElementById('thanks').style.display = "block";
	firebase.database().ref('users/' + userId).set(rateValue).then(function(success){
		firebase.auth().signOut().then(function(){
			localStorage.clear();
			closeModal();
		});
	});
};

var openModal = function includeHTML() {
	var z, i, elmnt, file, xhttp;
	/*loop through a collection of all HTML elements:*/
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("include-html");
		if (file) {
			/*make an HTTP request using the attribute value as the file name:*/
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {elmnt.innerHTML = this.responseText;}
					if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
					/*remove the attribute, and call this function once more:*/
					elmnt.removeAttribute("include-html");
					includeHTML();
				}
			}      
			xhttp.open("GET", file, true);
			xhttp.addEventListener("load", function(){
				loadModal();
				document.getElementById("close_modal").addEventListener("click", closeModal);
			});
			xhttp.send();
			/*exit the function:*/
			return;
		}
	}
};

var closeModal = function closeModal(){
	var modalDiv = document.getElementById("modal");
	var att = document.createAttribute("include-html");
	att.value = "modal.html";
	modalDiv.setAttributeNode(att);
	modalDiv.removeChild(document.getElementById("page_modal"));
}

var loadModal = function(){
	ui.start('#firebaseui-auth-container', uiConfig);
	document.getElementById("star1").addEventListener("click", function(){setRate(1);});
	document.getElementById("star2").addEventListener("click", function(){setRate(2);});
	document.getElementById("star3").addEventListener("click", function(){setRate(3);});
	document.getElementById("star4").addEventListener("click", function(){setRate(4);});
	document.getElementById("star5").addEventListener("click", function(){setRate(5);});
	setRate(0);
}

var setRate = function setRate(value){
	rateValue = value;

	//cleaning stars
	for(index=1; index <= 5; index++){
		document.getElementById("star"+index).src = "images/empty_star.png";
	}
	//input rate 
	for(index=1; index <= value; index++){
		document.getElementById("star"+index).src = "images/full_star.png";
	}

	var firebaseSignIn;
	firebaseSignIn = document.getElementById("firebaseui-auth-container");
	if(value > 0){
		firebaseSignIn.style.opacity = 1;
		firebaseSignIn.style.pointerEvents = "auto";
	} else {
		firebaseSignIn.style.opacity = 0.5;
		firebaseSignIn.style.pointerEvents = "none";
	}
}