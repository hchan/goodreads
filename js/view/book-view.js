define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/book', 
'model/book'
 ],
 function($, _, Backbone, Resthub, bookTmpl, BookClass){
     var retval = Resthub.View.extend
     ({
	                
         initialize: function() {             
             $("#main").html(bookTmpl());
			 
			if (App.isLoggedIn()) {
				$("#createReviewDiv").show();
			}
			
			var viewThis = this;
			var createReviewFunc = function () {
				viewThis.createReview(viewThis);
			};
			$("#createReview").click(createReviewFunc);
			 var bookModel = new BookClass();
			 var options = {};

			 options.id = this.options.id;
			 var callback = function(data) {
			 var x2js = new X2JS();
			 var jsonObj = x2js.xml2json(data)
			 //	     var booksHtml = booksTmpl(jsonObj);
			 // this is a composite view, but instead of rendering "#book" with a template,
			 // let's do it the simple way
			 console.log(jsonObj.GoodreadsResponse.book);
			 $("#book").html(jsonObj.GoodreadsResponse.book.title.toString());

			 $("#reviews").html(jsonObj.GoodreadsResponse.book.reviews_widget.toString());
			 


			 }
			 bookModel.fetch(options, callback);
				 
		},
		
		createReview : function(viewThis) {
			console.log(viewThis);
			console.log($("#reviewTextarea").val());
			var oauth = App.createOAuth();
				var requestOptions = {
					method : "POST",
					url : "https://www.goodreads.com/review.xml",
					data : {
						book_id : viewThis.options.id,
						"review[review]" : $("#reviewTextarea").val()
					},
					success : function(data) {
						 var x2js = new X2JS();
						 var jsonObj = x2js.xml2json($.parseXML(data.text));
						 console.log(jsonObj);
						 var profileInfoHtml = profileInfoTmpl(jsonObj);

						 $("#app").html(profileInfoHtml);			     
					}
				};
			 
			oauth.request(requestOptions);
		}

     });               
     return retval;
 }
);