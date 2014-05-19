define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/profile'
 ],
 function($, _, Backbone, Resthub, profileTmpl){
     var retval = Resthub.View.extend
     ({
	                
         initialize: function() {             
             $("#app").html(profileTmpl());
             
	     // https://github.com/ddo/oauth-1.0a
	     var oauth = OAuth({
		 consumer: {
		     public: App.key,
		     secret: App.secret,
		 }
	     });

	     
	     var request_data = {
		 url : 'http://www.goodreads.com/oauth/request_token',
		 method: 'POST'
	     };
	     
	   	    
	     jQuery.ajaxSetup({ cache: true });
	     var ajaxObj = $.ajax({
		 url: request_data.url,
		 type: request_data.method,
		 headers: oauth.toHeader(oauth.authorize(request_data))
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


		 var token = {
		     "public" : oauth_token,
		     "secret":  oauth_token_secret
		 }
		 
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
	    
	     });




	 }
     });  
     return retval;
     
 });