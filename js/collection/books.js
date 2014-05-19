define(['backbone', 'model/book'], function(Backbone, book){
	  
    return  Backbone.Collection.extend({

	// Reference to this collection's model.
	model: book,
    
	initialize : function() {
    
	},

	fetch : function (options, callback) {

	    var url = App.getURL("/search.xml?q=" + options.q);
	    $.get(url, callback);
//format=xml&key=kBalTLaEbuAf3GWqfN3nw&q=adventure
	}
    
	//url : 'http://www.corsproxy.com/www.goodreads.com/search.xml?key=kBalTLaEbuAf3GWqfN3nw&q=Warcraft'
    });
});
