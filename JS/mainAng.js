var angApp = angular.module("angApp", ["ngRoute", "ngAnimate", "ngMessages"]);

angApp.config(["$routeProvider", function (route) {
   
}]);

angApp.run(["$rootScope", function (rsc) {
    var height = angular.element($(".home-content")).height();
    angular.element($(window)).on("scroll", function () {
        if ($(this).scrollTop() >= height) {
            angular.element($("nav")).addClass("fixed");
            console.log("true");
        } else {
            angular.element($(".navbar")).removeClass("fixed");
            console.log("false");
        }
    });

    angular.element($('#carousel')).owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        loop: true,
        animateOut: 'zoomOut',
        animateIn: 'zoomIn',
    });

    angular.element($(".home-content")).particleground({
        dotColor: '#fff',
        lineColor: '#e0e0e0',
    });
}]);

angApp.controller("mainCtrl", ["$scope", "addSer", function (sc, add) {
    sc.subscribers = ["shehab@gmail.com"];
    sc.addNew = function () {
        add.addNewSub(sc.subscribers, sc.email);
    };
}]);

angApp.directive("email", [function () {
    return {
        require: "ngModel",
        link: function (scope, element, attr, ctrl) {
            ctrl.$validators.wrongEmail = function (modelView, valueView) {
                if (scope.emailPattern.test(valueView) || valueView === "") {
                    return true
                } else {
                    return false
                }
            };
            ctrl.$validators.alreadyExist = function (modelView, valueView) {
                if (scope.subscribers.indexOf(valueView) > -1) {
                    return false
                } else {
                    return true
                }
            };
        },
        controller: ["$scope", "$element", "$attrs", function (sc, ele, att) {
            sc.emailPattern = /^([a-z0-9\.\-]{5,})@([a-z0-9]{3,8})\.([a-z]{2,3})$/;
        }]
    };
}]);

angApp.service("addSer", [function () {
    this.addNewSub = function (sub, name) {
        sub.push(name);
        alert("Thanks for subscription");
    };
}]);
