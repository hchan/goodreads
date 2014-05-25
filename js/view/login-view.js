define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/login'
 ],
 function($, _, Backbone, Resthub, loginTmpl){
     var retval = Resthub.View.extend
     ({
		authorizationFrameSrc : "",
		
        initialize: function() {          
			
             this.loginWithBrowserOAuth();
	    
		},
		
		loginWithJavaProxy :function() {
			var callbackURL = window.location.href;
			callbackURL = callbackURL.replace("#login", "#authorizeOK");
			window.location.href='http://localhost:8080/rest/goodreads/authenticate?callbackURL=' + callbackURL;
		},
		
		updatePollingText : function(thisView) {
			var pollingText = $("#pollingText").html();
			var loopCount = 0;
			var loadingInterval = self.setInterval(function() {
				var animatedText = pollingText;
				var indexOfAnimation = loopCount % pollingText.length;
				var preText = pollingText.substring(0, indexOfAnimation);
				var postText = pollingText.substring(indexOfAnimation+1);
				$("#pollingText").html(preText + "." + postText);
				loopCount++;
				//console.log($("#authorizationFrame").attr('src'));
				//var frameSrc = $("#authorizationFrame").attr('src');
				//if (frameSrc == null) {
				//	frameSrc = "";
				//} else {
				//	console.log(frameSrc);
				//}
				console.log(thisView.authorizationFrameSrc);
				if (thisView.authorizationFrameSrc.indexOf("http://en.wikipedia.org/wiki/OAuth") != -1) {
					console.log("break loop");
					clearInterval(loadingInterval);
				}
			}, 500);
			
		},
		
		loginWithBrowserOAuth : function() {
			$("#app").html(loginTmpl());
			var thisView = this;
			this.updatePollingText(thisView);
             
			window.addEventListener("message", receiveMessage, false);

			function receiveMessage(event)
			{
			  console.log("Wow, cross communication works");
			}
			
			//$('#authorizationFrame').load(function(data){
			//	console.log('frame has (re)loaded');
			//	console.log(data.target.contentWindow);
				
				//thisView.authorizationFrameSrc = data.target.contentWindow.location + "";
			//});

 
			 
			// https://github.com/bytespider/jsOAuth/
			 var oauth;
			 // Goodreads OutOfBand Authorization
			 //var goodreadsOOBauthorizationWindow = null;
			 oauth = App.createOAuth();
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