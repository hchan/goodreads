define(['backbone', 'model/todo'], function(Backbone, Todo){
	  
    var Todos = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Todo,
    
    initialize : function() {
    	console.log("HERE")
    	$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    		console.log("YOYO")
            options.crossDomain = true;
    		$.support.cors = true
//   		options.headers = { 'Access-Control-Allow-Origin': '*',
//    				'access-control-allow-credentials' : true
//    		};
//            options.xhrFields = {
//              withCredentials: true
//            };
          });
    },

    //url : 'https://www.goodreads.com/search.xml?key=kBalTLaEbuAf3GWqfN3nw&q=Warcraft',
    
    url : 'http://www.corsproxy.com/www.goodreads.com/search.xml?key=kBalTLaEbuAf3GWqfN3nw&q=Warcraft',
    
   // url: App.URL_ROOT + '/api/todo',
   // url : 'https://api.github.com/users/hchan/repos?per_page=100',

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
      return todo.get('order');
    }

  });
  return Todos;
});
