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
	     console.log(this.options);
	     options.id = this.options.id;
	     bookModel.fetch(options);
             
         },

     });               
     return retval;
 }
);