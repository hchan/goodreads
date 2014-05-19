var App = {
    getURL : function(relativeURL) {
	jQuery.ajaxSetup({ cache: true });
	return "http://www.corsproxy.com/www.goodreads.com" + relativeURL + "&format=json&key=kBalTLaEbuAf3GWqfN3nw";
    } 
    
		
};

define
(['router/app-router', 'view/app-view']
 , function(AppRouter, AppView){
     new AppView({root : $("#app")});
     new AppRouter();
     
 });