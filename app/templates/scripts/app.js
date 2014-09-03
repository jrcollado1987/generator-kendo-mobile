(function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app = {
        models: {},
        settings: {
        <% if(everlive && everliveKey) { %>

            everlive: {
                apiKey: '<%= everliveKey %>', // Put your Backend Services API key here
                scheme: 'http'
            },
        <% } %>
            eqatec: {
                productKey: '$EQATEC_PRODUCT_KEY$',  // Put your EQATEC product key here
                version: '1.0.0.0' // Put your application version here
            },

            feedback: {
                apiKey: '$APPFEEDBACK_API_KEY$'  // Put your AppFeedback API key here
            },

            facebook: {
                appId: '1408629486049918', // Put your Facebook App ID here
                redirectUri: 'https://www.facebook.com/connect/login_success.html' // Put your Facebook Redirect URI here
            },

            google: {
                clientId: '406987471724-q1sorfhhcbulk6r5r317l482u9f62ti8.apps.googleusercontent.com', // Put your Google Client ID here
                redirectUri: 'http://localhost' // Put your Google Redirect URI here
            },

            liveId: {
                clientId: '000000004C10D1AF', // Put your LiveID Client ID here
                redirectUri: 'https://login.live.com/oauth20_desktop.srf' // Put your LiveID Redirect URI here
            },

            adfs: {
                adfsRealm: '$ADFS_REALM$', // Put your ADFS Realm here
                adfsEndpoint: '$ADFS_ENDPOINT$' // Put your ADFS Endpoint here
            },

            messages: {
                mistSimulatorAlert: 'The social login doesn\'t work in the In-Browser Client, you need to deploy the app to a device, or run it in the simulator of the Windows Client or Visual Studio.',
                removeActivityConfirm: 'Are you sure you want to delete this Activity?'
            }
        }
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

         // Initialize Everlive SDK
        app.evelive = new Everlive({
             apiKey: app.settings.everlive.apiKey,
             scheme: app.settings.everlive.scheme
        });


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