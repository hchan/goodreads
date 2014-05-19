define(['backbone'], function(Backbone){
    var AppRouter = Backbone.Router.extend({
        initialize: function() {
            Backbone.history.start();
        },
        routes: {
            'book/:id': 'book',
	    'any': 'any'
        },

	book : function(id) {
	    console.log(id);
	},
       
	any : function() {
	    console.log("xxx");
	}
    });
    
    return AppRouter;
});