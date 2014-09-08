/**
 * Signup view model
 */
var app = app || {};

app.signup = (function () {
    'use strict';

    var signupViewModel = (function () {
        var dataSource;
        var $signUpForm;
        var $formFields;
        var $signupWrapper;
        var validator;

        // Register user after required fields (username and password) are validated in Backend Services
        var signup = function () {

            dataSource.Gender = parseInt(dataSource.Gender);
            var birthDate = new Date(dataSource.BirthDate);

            if (birthDate.toJSON() === null) {
                birthDate = new Date();
            }

            dataSource.BirthDate = birthDate;

            Everlive.$.Users.register(dataSource.Username, dataSource.Password, dataSource)
                .then(function () {
                    app.showAlert("Registration successful");
                    app.mobileApp.navigate('#<%= navigate %>');
                },
                function (err) {
                    app.showError(err.message);
                });
        };

        // Executed after Signup view initialization
        // init form validator
        var init = function () {

            $signUpForm = $('#signupForm');
            $formFields = $signUpForm.find('input, textarea, select');
            $signupWrapper = $('#signupButtonWrapper');
            validator = $signUpForm.kendoValidator({ validateOnBlur: false }).data('kendoValidator');

            $formFields.on('keyup keypress blur change input', function () {
                if (validator.validate()) {
                    $signupWrapper.removeClass('disabled');
                } else {
                    $signupWrapper.addClass('disabled');
                }
            });
        };

        // Executed after show of the Signup view
        var show = function () {

            dataSource = kendo.observable({
                Username: '',
                Password: '',
                DisplayName: '',
                Email: '',
                Gender: '0',
                About: '',
                Friends: [],
                BirthDate: new Date()
            });
            kendo.bind($('#signupForm').find('ul'), dataSource, kendo.mobile.ui);
        };

        // Executed after hide of the Signup view
        // disable signup button
        var hide = function () {
            $signupWrapper.addClass('disabled');
        };

        var onSelectChange = function (sel) {
            var selected = sel.options[sel.selectedIndex].value;
            sel.style.color = (selected == 0) ? '#b6c5c6' : '#34495e';
        };

        return {
            init: init,
            show: show,
            hide: hide,
            onSelectChange: onSelectChange,
            signup: signup
        };

    }());

    return signupViewModel;
}());
