define
(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/status'
 ],
 function($, _, Backbone, Resthub, statusTmpl){
     var retval = Resthub.View.extend
     ({
	                
        initialize: function() {       
			var thisView = this;
            $("#main").html(statusTmpl);
			
			$("#updateStatus").click(function() {
				$(".action").hide();
				$("#updateStatusDiv").show();
				$("#updateStatusTextarea").val($("#currentStatus").html());
			});
			
			$("#doUpdateStatus").click(function() {
				thisView.updateStatus(thisView);
			});
			
			$("#deleteStatus").click(function() {
				thisView.deleteStatus(thisView);
			}),
			
			
			$("#cancel").click(function() {
				thisView.initialize(thisView);
			});
			this.getMyStatus();		
			
		},
		
		deleteStatus: function(thisView) {
			if ($("#statusID").val() == "") {
				thisView.initialize(thisView);
			} else {
				var oauth = App.createOAuth();
				var requestOptions = {
					method : "POST",
					url : App.getURL("/user_status/destroy/" + $("#statusID").val() + "?formal=xml"),
					
					success : function(data) {
						//var x2js = new X2JS();
						//var jsonObj = x2js.xml2json($.parseXML(data.text));
						//console.log(jsonObj.GoodreadsResponse);
						thisView.initialize();
					},
					failure : function(data) {
						thisView.initialize();
					}
				}
				oauth.request(requestOptions);
			}
		},
		
		updateStatus : function(thisView) {
			var oauth = App.createOAuth();
			var requestOptions = {
				method : "POST",
				url : App.getURL("/user_status.xml"),
				data : {
					"user_status[body]" : $("#updateStatusTextarea").val()
				},
				success : function(data) {
					var x2js = new X2JS();
					var jsonObj = x2js.xml2json($.parseXML(data.text));
					console.log(jsonObj.GoodreadsResponse);
					thisView.initialize();
				},
				failure : function(data) {
					
				}
			}
			oauth.request(requestOptions);
		},
		
		getMyStatus : function() {
			var oauth = App.createOAuth();
			var requestOptions = {
				method : "GET",
				url : App.getURL("/user/show/" + App.getUserID() + ".xml") + "?format=xml&key=" + App.key,
				data : {
					id : App.getUserID()
				},
				success : function(data) {
					var x2js = new X2JS();
					var jsonObj = x2js.xml2json($.parseXML(data.text));
					try {				
						console.log(jsonObj.GoodreadsResponse.user.updates);
						var lastUpdate = jsonObj.GoodreadsResponse.user.updates.update[0];
						var statusID = lastUpdate.object.user_status.id.toString();
						$("#currentStatus").html(lastUpdate.body);
						$("#statusID").val(statusID);
					} catch (e) {
						$("#currentStatus").html("No Status");
						$("#statusID").val("");
					}
				},
				failure : function(data) {
					// 404 not found, therefore we create a review
					console.log("NOT FOUND");
					$("#currentStatusDiv").show();
					$("#currentStatus").html("Empty status");
				}
			}
			oauth.request(requestOptions);
		}
    });               
    return retval;
 }
);