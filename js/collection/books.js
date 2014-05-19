define(['backbone', 'model/book'], function(Backbone, book){
	  
    return  Backbone.Collection.extend({

	// Reference to this collection's model.
	model: book,
    
	initialize : function() {
    
	},

    
    
	url : 'http://www.corsproxy.com/www.goodreads.com/search.xml?key=kBalTLaEbuAf3GWqfN3nw&q=Warcraft'
    });
});
