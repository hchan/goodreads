define(['backbone', 'view/book-view', 'view/profile-view'], function(Backbone, BookView, ProfileView){
    var AppRouter = Backbone.Router.extend({
        initialize: function() {
            Backbone.history.start();
        },
        routes: {
            'book/:id': 'book',
	    'profile': 'profile'
        },

	book : function(id) {
	    new BookView({root: $("#app"), id:id});	   
	    console.log(id);
	},

	profile : function() {
	    new ProfileView({root: $("#app")});
	}
       

    });
    
    return AppRouter;
});