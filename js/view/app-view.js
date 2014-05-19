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
		 books.fetch();
	     });  
             
         },

     });               
     return AppView;
 }
);