define(['backbone', 'view/book-view', 'view/profile-view', 'view/login-view'], function(Backbone, BookView, ProfileView, LoginView){
    var AppRouter = Backbone.Router.extend({
        initialize: function() {
            Backbone.history.start();
        },
        routes: {
            'book/:id': 'book',
	    'profile': 'profile',
	    'login': 'login'
        },

	book : function(id) {
	    new BookView({root: $("#app"), id:id});	   
	    console.log(id);
	},

	profile : function() {
	    new ProfileView({root: $("#app")});
	},

	login : function() {
	    new LoginView({root: $("#app")});
	}
       

    });
    
    return AppRouter;
});
