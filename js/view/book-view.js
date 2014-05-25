define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/book', 
'model/book'
 ],
 function($, _, Backbone, Resthub, bookTmpl, BookClass){
     var retval = Resthub.View.extend
     ({
	                
         initialize: function() {       
			var thisView = this;
             $("#main").html(bookTmpl());
			 
			if (App.isLoggedIn()) {
				this.getMyReview();				
			}
			
			$("#editReview").click(function() {
				$(".reviewAction").hide();
				$("#editReviewDiv").show();
			});
			
			$("#cancelEdit").click(function() {
				thisView.initialize();
			});
			$("#doEditReview").click(function() {
				thisView.doEditReview(viewThis);
			});
			
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
		
		doEditReview : function(viewThis) {
			console.log("inside doEditReview");
		},
		
		createReview : function(viewThis) {
			console.log(viewThis);
			console.log($("#reviewTextarea").val());
			var oauth = App.createOAuth();
				var requestOptions = {
					method : "POST",
					url : "https://www.corsproxy.com/goodreads.com/review.xml",
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
		},
		
		getMyReview : function() {
			var thisView = this;
			var oauth = App.createOAuth();
			var userID = null;
			var getMyReviewOptions = {
				method : "GET",
				url : "http://www.corsproxy.com/www.goodreads.com/review/show_by_user_and_book.xml",
				data : {
					user_id : App.getUserID(),
					book_id : thisView.options.id
				},
				success : function(data) {
					 var x2js = new X2JS();
					 var jsonObj = x2js.xml2json($.parseXML(data.text));
					$("#myReviewDiv").show();
					$("#myReview").html(jsonObj.GoodreadsResponse.review.body);		
					
					
				},
				failure : function(data) {
					$("#createReviewDiv").show();
				}
			}
			oauth.request(getMyReviewOptions);
		}

     });               
     return retval;
 }
);