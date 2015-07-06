var iApp=angular.module('indexApp',['ngRoute','ngResource','ui.bootstrap','appScanningServices']);
iApp.config(['$routeProvider',function($routeProvider){
    $routeProvider.
        when('/appScanning',{templateUrl:'appScanning/appScanning.html',controller:appScanningController}).
        when('/recommendSeries',{templateUrl:'RecommendSeries/recommendSeries.html',controller:recommendSeriesController}).
        when('/superTag',{templateUrl:'superTag/superTag.html',controller:SuperTagListController}).
        when('/localVideo',{templateUrl:'localVideo/localVideo.html',controller:localVideoController,resolve: localVideoController.resolve}).
        when('/mainCrm',{templateUrl:'mainCrm/mainCrm.html',controller:mainCrmController}).
        when('/mainIndex',{templateUrl:'mainIndex/mainIndex.html',controller:mainIndexController}).
        otherwise({redirectTo:'/mainIndex'});
    //$locationProvider.html5Mode(true);
}]);

