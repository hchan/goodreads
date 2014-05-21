define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/login' 
 ],
 function($, _, Backbone, Resthub, loginTmpl){
     var retval = Resthub.View.extend
     ({
	 
         initialize: function() {          
	     jQuery.ajaxSetup({ cache: true });   
             $("#app").html(loginTmpl());
             $("#login").click(function() {
            	 App.saveToken($("#key"), $("#secret"));
             });
	 }
	     
     });  
     return retval;
 })
