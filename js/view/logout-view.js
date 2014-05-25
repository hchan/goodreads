define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/logout'
],
 function($, _, Backbone, Resthub, logoutTmpl){
     var retval = Resthub.View.extend
     ({
	                
         initialize: function() {             
			var token = App.getToken();
            $("#app").html(logoutTmpl(token));
			
			$("#deleteToken").click(function() {
				App.deleteToken();
				window.location.href="#home";
			});
			
			$("#home").click(function() {
				window.location.href="#home";
			});
		},

     });               
     return retval;
 }
);