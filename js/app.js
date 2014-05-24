var App = {
    key : 'kBalTLaEbuAf3GWqfN3nw',
    secret: 'zP2xpCd5Vu8aGpNw67U3PoYZOUf1QvzFPcEB8Bt3Fj0',
    getURL : function(relativeURL) {
    	jQuery.ajaxSetup({ cache: true });
    	return "http://www.corsproxy.com/www.goodreads.com" + relativeURL + "&format=xml&key=" + App.key;
    } ,
    
	saveToken: function(key, secret) {
		localStorage["goodreads.key"] = key;
		localStorage["goodreads.secret"] = secret;
	},
	
	createOAuth : function() {
		 jQuery.ajaxSetup({ cache: true });   
		var options = {
			 enablePrivilege: true,
			 consumerKey: App.key,
			 consumerSecret: App.secret,

			 requestTokenUrl : 'http://www.goodreads.com/oauth/request_token',
			 authorizationUrl : "http://www.goodreads.com/oauth/authorize",
			 accessTokenUrl : "http://www.goodreads.com/oauth/access_token"
/*
			 requestTokenUrl : 'http://www.corsproxy.com/www.goodreads.com/oauth/request_token',
			 authorizationUrl : "http://www.corsproxy.com/www.goodreads.com/oauth/authorize",
			 accessTokenUrl : "http://www.corsproxy.com/www.goodreads.com/oauth/access_token"
*/
	     };
		var retval = OAuth(options);
		//if (localStorage["goodreads"] != null) {
			var tokenArray = [localStorage["goodreads.key"], localStorage["goodreads.secret"]];
			retval.setAccessToken(tokenArray);
		//}
		return retval;
	},
	
	isLoggedIn : function() {
		return (localStorage["goodreads.key"] != null);
	}
		
};

define
(['router/app-router', 'view/app-view']
 , function(AppRouter, AppView){
     new AppView({root : $("#app")});
     new AppRouter();
     
 });