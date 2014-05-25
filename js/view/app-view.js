define
(['jquery', 'underscore', 'backbone', 'handlebars-orig', 'resthub', 'hbs!template/app', 
  'hbs!template/books',
  'collection/books',
  'hbs!template/loginMenu',
],
 function($, _, Backbone, Handlebars, Resthub, appTmpl, booksTmpl, booksClass, loginMenuTmpl){
     var AppView = Resthub.View.extend
     ({
	                
         initialize: function() {             
			
             this.template = appTmpl; 

			this.render();
			if (App.isLoggedIn()) {
				$("#login").html(loginMenuTmpl());
			} else {
				$("#login").html("<a href='#login'>Login</a>");
			}

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