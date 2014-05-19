define
(['underscore', 'backbone'], function(_, Backbone) {
    return Backbone.Model.extend({
	

	defaults: {
	    content: 'empty book...',
	    done: false
	},
	fetch : function (options, callback) {

	    var url = App.getURL("/book/show/" + options.id + "?noop=noop");
	    console.log(url);
	    $.ajax({
		url: url,
		success: callback,
		dataType: 'xml'
	    });
	
	}
    });
});
    
	
				
