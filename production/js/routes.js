'use strict';


angular.module('sc-App')
     .config(['$stateProvider','$urlRouterProvider',
        function(t,e){
        e.otherwise('/'),
        t.state('dashboard',
            {
                url:'/',
                templateUrl:'views/dashboard.html',
                activetab: 'dashboard'
            });
       }
    ]);



    // angular.module('sc-App')
    //  .config(['$stateProvider','$urlRouterProvider',
    //     function(t,e){
    //     e.otherwise('/'),
    //     t.state('dashboard',
    //         {
    //             url:'/',
    //             templateUrl:'views/dashboard.html',
    //             activetab: 'dashboard'
    //         })
    //     .state('tables',
    //         {
    //             url:'/tables',
    //             templateUrl:'views/tables.html',
    //             activetab: 'tables'
    //         })
    //     .state('clients',
    //         {
    //             url:'/clients',
    //             templateUrl:'views/clients.html',
    //             activetab: 'clients'
    //         })
    //     .state('products',
    //         {
    //             url:'/products',
    //             templateUrl:'views/products.html',
    //             activetab: 'products'
    //         })
    //     .state('distributors',
    //         {
    //             url:'/distributors',
    //             templateUrl:'views/distributors.html',
    //             activetab: 'distributors'
    //         });
    // }
    // ]);


// angular.module('sc-App',['ngRoute', 'viewController'])
// angular.module('sc-App',['ngRoute'])
//     .config(function ($routeProvider, $locationProvider){
//         $routeProvider
//             .when('/', {
//                 templateUrl:'views/dashboard.html',
//                 // controller: 'dashController',
//             })
//             .when('/clients', {
//                 templateUrl:'views/clients.html',
//                 // controller: 'ListController',
//             })
//             .when('/products', {
//                 templateUrl:'views/products.html',
//                 // controller: 'ListController',
//             })
//             .when('/distributors', {
//                 templateUrl:'views/distributors.html',
//                 // controller: 'ListController',
//             })
//             .otherwise({
//                 redirectTo: '/'
//             });
//         $locationProvider.html5Mode(true);
//         });


