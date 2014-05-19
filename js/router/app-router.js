define(['backbone', 'view/book-view'], function(Backbone, BookView){
    var AppRouter = Backbone.Router.extend({
        initialize: function() {
            Backbone.history.start();
        },
        routes: {
            'book/:id': 'book',

        },

	book : function(id) {
	    new BookView({root: $("#app"), id:id});	   
	    console.log(id);
	},
       

    });
    
    return AppRouter;
});