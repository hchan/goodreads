define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/login'
 ],
 function($, _, Backbone, Resthub, loginTmpl){
     var retval = Resthub.View.extend
     ({
	 
        initialize: function() {          
			
             this.loginWithBrowserOAuth();
	    
		},
		
		loginWithJavaProxy :function() {
			var callbackURL = window.location.href;
			callbackURL = callbackURL.replace("#login", "#authorizeOK");
			window.location.href='http://localhost:8080/rest/goodreads/authenticate?callbackURL=' + callbackURL;
		},
		
		loginWithBrowserOAuth : function() {
			$("#app").html(loginTmpl());
             
			// https://github.com/bytespider/jsOAuth/
			 var oauth;
			 // Goodreads OutOfBand Authorization
			 var goodreadsOOBauthorizationWindow = null;
			 oauth = App.createOAuth();
			 oauth.fetchRequestToken(function(data) { // uses requestTokenUrl
				
				 console.log(data);
				
				 goodreadsOOBauthorizationWindow = window.open(data, '_goodreadsOOBhorization', "width=600, height=600"); // uses authorizationUrl
			 });
			 
			 $("#done").click(function() {
				oauth.fetchAccessToken(function(data) {
					var accessToken = oauth.getAccessToken();
					console.log(accessToken);
					App.saveToken(accessToken[0], accessToken[1]);
					var curLocation = window.location.href;
					var newLocation = curLocation.replace(window.location.hash, "");
					window.location.href = newLocation;
					goodreadsOOBauthorizationWindow.close();
				});
			});
		}
	     
	    
     });  
     return retval;
     
 })