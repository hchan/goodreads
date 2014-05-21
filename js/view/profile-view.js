define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/profile', 'hbs!template/profileInfo'
 ],
 function($, _, Backbone, Resthub, profileTmpl, profileInfoTmpl){
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
		 console.log(data);
		 window.open(data, '_blank'); // uses authorizationUrl
		 
	     });

	     $("#getProfile").click(function() {
		 console.log(oauth.getAccessToken());
		 oauth.fetchAccessToken(function(data2) { // uses accessTokenUrl
		     console.log(data2);
		     var requestOptions = {
			 method : "GET",
			 url : "https://www.goodreads.com/api/auth_user", // profile information
			 success : function(data) {
			     var x2js = new X2JS();
			     console.log(data.text);
			     var jsonObj = x2js.xml2json($.parseXML(data.text));
			     console.log(jsonObj);
			     var profileInfoHtml = profileInfoTmpl(jsonObj);

			     $("#profileInfo").html(profileInfoHtml);			     
			 }
		     };
			 
		     oauth.request(requestOptions);
			 
			 
		 });
	     });
	 }
	     
	    
     });  
     return retval;
     
 })