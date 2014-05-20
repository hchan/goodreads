define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/profile'
 ],
 function($, _, Backbone, Resthub, profileTmpl){
     var retval = Resthub.View.extend
     ({
	                
         initialize: function() {          
	     jQuery.ajaxSetup({ cache: true });   
             $("#app").html(profileTmpl());
             
	    // https://github.com/bytespider/jsOAuth/
	     var oauth, options;

	     options = {
		 enablePrivilege: true,
		 consumerKey: App.key,
		 consumerSecret: App.secret,
		 
		 requestTokenUrl : 'http://www.goodreads.com/oauth/request_token',
		 authorizationUrl : "https://www.goodreads.com/oauth/authorize",
		 accessTokenUrl : "http://www.goodreads.com/oauth/access_token"
		 
	     };
	     
	     oauth = OAuth(options);
	     oauth.fetchRequestToken(function(data) { // uses requestTokenUrl
		 console.log("NICE");
		 
		 window.open(data, '_blank'); // uses authorizationUrl
		 $("#getProfile").click(function() {
		     oauth.fetchAccessToken(function(data2) { // uses accessTokenUrl
			 console.log(data2);
			 var requestOptions = {
			     method : "GET",
			     url : "https://www.goodreads.com/api/auth_user",
			 };
 
			 oauth.request(requestOptions);
			 
			 
		     });
		 });
	     })

	     console.log("Nice");
	     //https://github.com/amoshg/backbone-oauth-1.0a
	     var oauth;
	     oauth = new Backbone.OAuth({
		 consumerKey : App.key,
		 consumerSecret: App.secret,
		 requestURL : 'http://www.goodreads.com/oauth/request_token',
		 authURL : "https://www.goodreads.com/oauth/authorize",
		 accessURL : "http://www.goodreads.com/oauth/access_token"
	     });
	     atoken = oauth.getRequestToken();
	     console.log(atoken);

	     
	     var request_data = {
		 url : 'http://www.goodreads.com/oauth/request_token',
		 method: 'POST'
	     };
	     var headers = oauth.toHeader(oauth.authorize(request_data));
	   	    

	     var ajaxObj = $.ajax({
		 url: request_data.url,
		 type: request_data.method,
		 headers: headers
	     }).done(function(data) {
		 console.log(data);
		
		 var oauth_token = data;
		 var oauth_token_secret = data;
		 oauth_token = oauth_token.replace("oauth_token=", "");
		 var indexOfAmpersand = oauth_token.indexOf("&");
//		 console.log(indexOfAmpersand);
		 oauth_token = oauth_token.substring(0, indexOfAmpersand);
		 console.log(oauth_token);

		 oauth_token_secret = oauth_token_secret.substring(oauth_token_secret.indexOf("oauth_token_secret"));
		 oauth_token_secret = oauth_token_secret.replace("oauth_token_secret=", "");
		 console.log(oauth_token_secret);
//		 var headers = oauth.toHeader(oauth.authorize(request_data));
//		 headers.Authorization += ", oauth_token=\"" + oauth_token + "\""
//		 headers.Authorization += ", oauth_token_secret=\"" + oauth_token_secret + "\""
		 
		 window.open("https://www.goodreads.com/oauth/authorize?oauth_token=" + oauth_token, '_blank');

		 var token = {
		     "public" : oauth_token,
		     "secret":  oauth_token_secret
		 }
		 /*
		 $.ajax({
		     url: 'https://www.goodreads.com/oauth/authorize?oauth_token=' + oauth_token,
		     //url: 'https://www.goodreads.com/api/auth_user',
//		     url: 'http://www.goodreads.com/oauth/access_token',
//		     url : 'https://www.goodreads.com/owned_books/user?format=xml',
		     //url: 'https://www.goodreads.com/api/auth_user',
		     //url: 'https://www.goodreads.com/api/auth_user?oauth_token=' + oauth_token,
		     type: 'GET',
		     headers:  oauth.toHeader(oauth.authorize(request_data, token))
		    
		 }).done(function(data2) {
		     //console.log(data2);
		     
		     
		 });
		 */
		 $("#getProfile").click(function() {

		     console.log(oauth_token);
		     token = {
			 public : oauth_token
		     }
		     headers = oauth.toHeader(oauth.authorize(request_data, token));
		     console.log(headers);
		     $.ajax({
			 url: "http://www.goodreads.com/oauth/access_token",
			 type: "GET",
			 headers: headers
		     }).done(function (data) {
			 console.log(data);
		     });
		 });



	     });

	   

	 }
     });  
     return retval;
     
 });