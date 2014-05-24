define(['backbone', 'view/book-view', 'view/profile-view', 'view/login-view', 'view/update-token', 'view/app-view'], 
	function(Backbone, BookView, ProfileView, LoginView, UpdateTokenView, AppView){
    var AppRouter = Backbone.Router.extend({
        initialize: function() {
            Backbone.history.start();
        },
        routes: {
            'book/:id': 'book',
			'profile': 'profile',
			'login': 'login',
			'updateToken' : 'updateToken',
			'home':'home'
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
		},
		   
		updateToken : function() {
			new UpdateTokenView({root: $("#app")});
		},
		
		home : function() {
			new AppView({root: $("#app")});
		}

    });
    
    return AppRouter;
});
