define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/book', 
'model/book'
 ],
 function($, _, Backbone, Resthub, bookTmpl, BookClass){
     var retval = Resthub.View.extend
     ({
	                
         initialize: function() {             
             $("#main").html(bookTmpl());
	     var bookModel = new BookClass();
	     var options = {};

	     options.id = this.options.id;
	     var callback = function(data) {
		 var x2js = new X2JS();
		 var jsonObj = x2js.xml2json(data)
		 //	     var booksHtml = booksTmpl(jsonObj);
		 // this is a composite view, but instead of rendering "#book" with a template,
		 // let's do it the simple way
		 console.log(jsonObj.GoodreadsResponse.book);
		 $("#book").html(jsonObj.GoodreadsResponse.book.title.toString());

		 $("#reviews").html(jsonObj.GoodreadsResponse.book.reviews_widget.toString());
		 


	     }
	     bookModel.fetch(options, callback);
             
         },

     });               
     return retval;
 }
);