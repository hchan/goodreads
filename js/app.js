var App = {
    getURL : function(relativeURL) {
	return "http://www.corsproxy.com/www.goodreads.com" + relativeURL + "&format=json&key=kBalTLaEbuAf3GWqfN3nw";
    } 
    
		
};

define(['router/app-router', 'view/app-view', 'json2']
        , function(AppRouter, AppView){
    
    // Send to the server all warn or error logs
    console.level = 'warn';
    
    new AppView({root: $('#todoapp')});
    new AppRouter();
    
});