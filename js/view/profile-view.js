define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/profileInfo'
 ],
 function($, _, Backbone, Resthub, profileInfoTmpl){
     var retval = Resthub.View.extend
     ({
	 
         initialize: function() {    
			this.doProfileWithBroswerOAuth();
			
			
			
			 
			 
		},
		
		
		doProfileWithJavaProxy : function() {
			$.ajax({
				type: "GET",
				url: "http://localhost:8080/rest/goodreadsproxy" + "/www.goodreads.com/api/auth_user",		
				
				//xhrFields: {
				//	  withCredentials: true
				 //  }				
				}).done(function(data) {
			
						if (data.indexOf("REDIRECT: ") != -1) {
							window.location.href = data.replace("REDIRECT: ", "");
						} else {
							var x2js = new X2JS();
							var jsonObj = x2js.xml2json($.parseXML(data));
							console.log(jsonObj);
							var profileInfoHtml = profileInfoTmpl(jsonObj);

							$("#app").html(profileInfoHtml);	
						}
			});
		},
		
		doProfileWithBroswerOAuth : function() {
			var oauth = App.createOAuth();
			console.log(oauth.getAccessToken());

	 
			//oauth.fetchAccessToken(function(data) { // uses accessTokenUrl
				//console.log(data);
				var requestOptions = {
					method : "GET",
					//url : "http://www.goodreads.com/api/auth_user?format=xml&key=kBalTLaEbuAf3GWqfN3nw&noop=noop",
					url : App.getURL("/api/auth_user"),
					//urlToSignForFunc : App.urlToSignForFunc,
					success : function(data) {
						 var x2js = new X2JS();
						 var jsonObj = x2js.xml2json($.parseXML(data.text));
						 console.log(jsonObj);
						 var profileInfoHtml = profileInfoTmpl(jsonObj);

						 $("#app").html(profileInfoHtml);			     
					}
				};
			 
				oauth.request(requestOptions);
		}
	     
	    
     });  
     return retval;
     
 })