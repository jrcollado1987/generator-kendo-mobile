(function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app = {
        models: {}
    };


    var bootstrap = function () {
        app.mobileApp = new kendo.mobile.Application(document.body, {

        <% if(navigation != 'drawer') { %>
            // you can change the default transition (slide, zoom or fade)
            transition: '<%= transition %>',
         <% } %>

            // comment out the following line to get a UI which matches the look
            // and feel of the operating system
            skin: '<%= theme %>',

            // the application needs to know which view to load first
            initial: 'views/<%= view %>.html'
        });
    };

    if (window.cordova) {
        // this function is called by Cordova when the application is loaded by the device
        document.addEventListener('deviceready', function () {

            // hide the splash screen as soon as the app is ready. otherwise
            // Cordova will wait 5 very long seconds to do it for you.
            navigator.splashscreen.hide();

            bootstrap();

        }, false);
    }
    else {
        bootstrap();
    }

    window.app = app;
}());