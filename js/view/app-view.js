define
(['jquery', 'underscore', 'backbone', 'handlebars-orig', 'resthub', 'hbs!template/app', 
  'hbs!template/books',
'collection/books'],
 function($, _, Backbone, Handlebars, Resthub, appTmpl, booksTmpl, booksClass){
     var AppView = Resthub.View.extend
     ({
	                
         initialize: function() {             
	     
             this.template = appTmpl; 

	     this.render();

	     $("#searchButton").click(function() {
		 var books = new booksClass();
		 var options = {};
		 options.q = $("#search").val();
		 var callback = function(data) {
		     var x2js = new X2JS();
		     var jsonObj = x2js.xml2json(data)
		     var booksHtml = booksTmpl(jsonObj);
		     $("#main").html(booksHtml);
		 }
		 books.fetch(options, callback);
	     });  
             
         },

     });               
     return AppView;
 }
);