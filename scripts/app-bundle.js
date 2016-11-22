define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App(userLoggedIn, authToken, user) {
            var _this = this;
            if (userLoggedIn === void 0) { userLoggedIn = false; }
            if (authToken === void 0) { authToken = null; }
            if (user === void 0) { user = null; }
            this.userLoggedIn = userLoggedIn;
            this.authToken = authToken;
            this.user = user;
            firebase.auth().onAuthStateChanged(function (user) {
                _this.userLoggedIn = user ? true : false;
                _this.user = user;
                console.log(user);
            });
        }
        App.prototype.login = function () {
            var _this = this;
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                _this.authToken = result.credential.accessToken;
                _this.user = result.user;
                _this.userLoggedIn = true;
                console.log(result);
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
        };
        App.prototype.logout = function () {
            var _this = this;
            firebase.auth().signOut().then(function () {
                _this.userLoggedIn = false;
            }).catch(function (error) {
                throw new Error(error);
            });
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        longStackTraces: environment_1.default.debug,
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <a href=\"javascript:void(0);\" click.delegate=\"login()\" if.bind=\"!userLoggedIn\">Login via Google</a>\n    <a href=\"javascript:void(0);\" click.delegate=\"logout()\" if.bind=\"userLoggedIn\">Logout</a>\n\n    <div class=\"profile\">\n        <h1>${user.displayName}</h1>\n        <h2>${user.email}</h2>\n        <img src.bind=\"user.photoURL\" if.bind=\"user.photoURL\">\n    </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map