define(['backbone', 'model/book'], function(Backbone, book){
	  
    return  Backbone.Collection.extend({

	// Reference to this collection's model.
	model: book,
    
	initialize : function() {
    
	},

	fetch : function (options, callback) {

	    var url = App.getURL("/search.xml") + "?q=" + options.q + "&format=xml&key=" + App.key;
	    $.ajax({
		url: url,
		success: callback,
		dataType: 'xml'
	    });
	}
    
    });
});
