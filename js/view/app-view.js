define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/app', 'collection/books'],
 function($, _, Backbone, Resthub, appTmpl, booksClass){
     var AppView = Resthub.View.extend
     ({
	                
         initialize: function() {             
	     
             this.template = appTmpl; 

	     this.render();

	     $("#searchButton").click(function() {
		 console.log("YO");
		 var books = new booksClass();
		 var options = {};
		 options.q = "abc";
		 var callback = function() {
		     console.log("DONE");
		 }
		 books.fetch(options, callback);
	     });  
             
         },

     });               
     return AppView;
 }
);