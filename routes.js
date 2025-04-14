(function () {
    'use strict';
    angular.module('MenuApp')
      .config(RoutesConfig);
  
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
  
      $urlRouterProvider.otherwise('/');
  
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'home.template.html'
        })
  
        .state('categories', {
          url: '/categories',
          template: '<categories categories="$ctrl.categories"></categories>',
          controller: ['MenuDataService', function (MenuDataService) {
            var $ctrl = this;
            MenuDataService.getAllCategories().then(function (response) {
              $ctrl.categories = response.data;
            });
          }],
          controllerAs: '$ctrl'
        })
  
        .state('items', {
          url: '/items/{category}',
          template: '<items items="$ctrl.items"></items>',
          controller: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            var $ctrl = this;
            MenuDataService.getItemsForCategory($stateParams.category).then(function (response) {
              $ctrl.items = response.data;
            });
          }],
          controllerAs: '$ctrl'
        });
    }
  })();
  