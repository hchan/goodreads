var App = {
    key : 'kBalTLaEbuAf3GWqfN3nw',
    secret: 'zP2xpCd5Vu8aGpNw67U3PoYZOUf1QvzFPcEB8Bt3Fj0',
	
	oauthCallbackURL : "http://hchan.github.io/goodreads/authorizeOK.html",
	
	corsProxy : "http://cors-anywhere.herokuapp.com",
	
    getURL : function(relativeURL) {
    	jQuery.ajaxSetup({ cache: true });
    	return App.corsProxy + "/www.goodreads.com" + relativeURL;
		//  + "&format=xml&key=" + App.key;
    } ,
    
	saveToken: function(key, secret) {
		localStorage["goodreads.key"] = key;
		localStorage["goodreads.secret"] = secret;
	},
	
	saveUserID : function(userID) {
		localStorage["goodreads.userID"] = userID;
	},
	
	getUserID : function(userID) {
		return localStorage["goodreads.userID"];
	},
	
	getToken : function() {
		var token = {};
		token['key'] = localStorage["goodreads.key"];
		token['secret'] = localStorage["goodreads.secret"];
		return token;
	},
	
	deleteToken : function() {
		localStorage.removeItem("goodreads.key");
		localStorage.removeItem("goodreads.secret");
		localStorage.removeItem("goodreads.userID");
	},
	
	createOAuth : function() {
		 jQuery.ajaxSetup({ cache: true });   
		var options = {
			 enablePrivilege: true,
			 consumerKey: App.key,
			 consumerSecret: App.secret,
			 
			
/*
			 requestTokenUrl : 'http://www.goodreads.com/oauth/request_token',
			 authorizationUrl : "http://www.goodreads.com/oauth/authorize",
			 accessTokenUrl : "http://www.goodreads.com/oauth/access_token",
*/
			 requestTokenUrl : App.getURL("/oauth/request_token"),
			 authorizationUrl : "http://www.goodreads.com/oauth/authorize", // note this is a OutOfBand request - hence no CORS - in fact, CORS will break this
			 accessTokenUrl : App.getURL("/oauth/access_token"),
			 
			 /*
			 * this urlToSignForFunc is a Henry Chan feature
			 * Basically, because we are using a CORS proxy, our URL Signature will contain the CORS Proxy URL
			 * This is bad ... so this function will create the OAuth signature STRIPPING OUT the CORS Proxy URL
			 */
			 urlToSignForFunc : App.urlToSignForFunc

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
	},
	
	urlToSignForFunc : function(url) {
		var retval = url;
		//retval = retval.replace("www.corsproxy.com/", "");
		//retval = retval.replace("cors-anywhere.herokuapp.com/", "");
		var corsProxyHost = App.corsProxy;
		corsProxyHost = corsProxyHost.replace("http://", "");
		corsProxyHost = corsProxyHost.replace("https://", "");
		retval = retval.replace(corsProxyHost + "/", ""); 
		return retval;
	}
		
};

define
(['router/app-router', 'view/app-view']
 , function(AppRouter, AppView){
     new AppView({root : $("#app")});
     new AppRouter();
     
 });