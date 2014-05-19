define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/app'],
 function($, _, Backbone, Resthub, appTmpl){
     var AppView = Resthub.View.extend
     ({
	                
         initialize: function() {             
             this.template = appTmpl;   
             this.render();
         },

     });               
     return AppView;
 }
);