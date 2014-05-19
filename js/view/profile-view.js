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
	     $.ajax({
		 url: request_data.url,
		 type: request_data.method,
		 headers: oauth.toHeader(oauth.authorize(request_data))
	     }).done(function(data) {
		 console.log(data);
	
	    
	     });




	 }
     });  
     return retval;
     
 });