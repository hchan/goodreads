define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/update-token' 
 ],
 function($, _, Backbone, Resthub, updateTokenTmpl){
     var retval = Resthub.View.extend
     ({
	 
         initialize: function() {          
	     jQuery.ajaxSetup({ cache: true });   
             $("#app").html(updateTokenTmpl());
             $("#update").click(function() {
            	 App.saveToken($("#key"), $("#secret"));
				alert("Token updated");
             });
	 }
	     
     });  
     return retval;
 })
