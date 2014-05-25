define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/login'
 ],
 function($, _, Backbone, Resthub, loginTmpl){
     var retval = Resthub.View.extend
     ({
		
		waitInterval : null,
		postMessageCount : 0,
        initialize: function() {          
			
             this.loginWithBrowserOAuth();
	    
		},
		
		loginWithJavaProxy :function() {
			var callbackURL = window.location.href;
			callbackURL = callbackURL.replace("#login", "#authorizeOK");
			window.location.href='http://localhost:8080/rest/goodreads/authenticate?callbackURL=' + callbackURL;
		},
		
		updateWaitingText : function(thisView) {
			var waitingText = $("#waitingText").html();
			var loopCount = 0;
			thisView.waitInterval = self.setInterval(function() {
				var animatedText = waitingText;
				var indexOfAnimation = loopCount % waitingText.length;
				var preText = waitingText.substring(0, indexOfAnimation);
				var postText = waitingText.substring(indexOfAnimation+1);
				$("#waitingText").html(preText + "." + postText);
				loopCount++;
				
			}, 500);
			
		},
		
		doAuthorizeOK : function(thisView, oauth) {
			
			oauth.fetchAccessToken(function(data) {
				var accessToken = oauth.getAccessToken();
				console.log(accessToken);
				App.saveToken(accessToken[0], accessToken[1]);
				var countDown = 10;
				clearInterval(thisView.waitInterval);
				thisView.waitInterval = self.setInterval(function() {
					$("#waitingText").html("Authentication OK.  Redirecting back home in " + countDown + "s");
					countDown--;
					if (countDown == -1) {
						clearInterval(thisView.waitInterval);
						window.location.href="#home";
					}
				}, 1000);
			});
		},
		
		
		loginWithBrowserOAuth : function() {
			$("#app").html(loginTmpl());
			$(".callbackURL").html(App.oauthCallbackURL);
			var thisView = this;
			// https://github.com/bytespider/jsOAuth/
			 var oauth;
			 oauth = App.createOAuth();
			 
			 
			this.updateWaitingText(thisView);
             
			window.addEventListener("message", receiveMessage, false);

			function receiveMessage(event)
			{
				//console.log(event);
				//console.log(event.orgin);
				//console.log("Wow, cross communication works");
				thisView.postMessageCount++;
				if (thisView.postMessageCount == 3) {
					thisView.doAuthorizeOK(thisView, oauth);					
				}
			}
			 
			
			 oauth.fetchRequestToken(function(data) { // uses requestTokenUrl
				
				 console.log(data);
				var authorizationURL = data;
				$("#authorizationFrame").attr('src',authorizationURL);
				 //goodreadsOOBauthorizationWindow = window.open(data, '_goodreadsOOBhorization', "width=600, height=600"); // uses authorizationUrl
				 
				 
			 });
			 
			 $("#done").click(function() {
				oauth.fetchAccessToken(function(data) {
					var accessToken = oauth.getAccessToken();
					console.log(accessToken);
					App.saveToken(accessToken[0], accessToken[1]);
					var curLocation = window.location.href;
					var newLocation = curLocation.replace(window.location.hash, "");
					window.location.href = newLocation;
					//goodreadsOOBauthorizationWindow.close();
				});
			});
		}
	     
	    
     });  
     return retval;
     
 })