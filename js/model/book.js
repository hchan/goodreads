define(['underscore', 'backbone'], function(_, Backbone) {
  return Backbone.Model.extend({


      defaults: {
	  content: 'empty book...',
	  done: false
    }


  });
})
