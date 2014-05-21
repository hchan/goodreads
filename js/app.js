var App = {
    key : 'kBalTLaEbuAf3GWqfN3nw',
    secret: 'zP2xpCd5Vu8aGpNw67U3PoYZOUf1QvzFPcEB8Bt3Fj0',
    getURL : function(relativeURL) {
    	jQuery.ajaxSetup({ cache: true });
    	return "http://www.corsproxy.com/www.goodreads.com" + relativeURL + "&format=xml&key=" + App.key;
    } ,
    
	save: function(key, secret) {
		console.log("key :" + key);
		console.log("secret :" + secret);
	}
		
};

define
(['router/app-router', 'view/app-view']
 , function(AppRouter, AppView){
     new AppView({root : $("#app")});
     new AppRouter();
     
 });