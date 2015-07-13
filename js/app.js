var app = angular.module('waitstaffCalc', ['ngRoute', 'ngAnimate']);

app.run(function($rootScope, $location, $timeout) {
  $rootScope.$on('$routeChangeError', function() {
    $location.path("/");
  });
  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.isLoading = true;
  });
  $rootScope.$on('$routeChangeSuccess', function() {
    $timeout(function() {
      $rootScope.isLoading = false;
    }, 1000);
  });
});

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl : './js/templates/home.html',
      controller: 'calcController'
    })
    .when('/new-meal', {
      templateUrl: './js/templates/new-meal.html',
      controller: 'calcController'
    })
    .when('/earnings', {
      templateUrl: './js/templates/earnings.html',
      controller: 'calcController'
    })
    .otherwise('/');
}]);

app.factory('dataStore', function(){
  return {
    dataStore : {
      mealCount : 0,
      tipTotal: 0,
      subtotal : 0,
      tipAmount : 0,
      total : 0,
      tipTotal : 0,
      mealCount : 0,
      averageTip : 0
    }
  }
});

app.controller('calcController', ['$scope','$location', '$route', 'dataStore' ,function($scope,$location,$route, dataStore){
  $scope.mealCount = dataStore.dataStore.mealCount;
  $scope.tipTotal = dataStore.dataStore.tipTotal;
  $scope.subtotal = dataStore.dataStore.subtotal;
  $scope.tipAmount = dataStore.dataStore.tipAmount;
  $scope.total = dataStore.dataStore.total;
  $scope.tipTotal = dataStore.dataStore.tipTotal;
  $scope.mealCount = dataStore.dataStore.mealCount;
  $scope.averageTip = dataStore.dataStore.averageTip;
  $scope.submit= function(){
    if ($scope.inputNumbers){
      // Find subtotal with tax
      $scope.subtotal = $scope.tax($scope.data.mealPrice, $scope.data.taxRate);
      dataStore.dataStore.subtotal = $scope.subtotal;
      // Calculate tip amount
      $scope.tipAmount = $scope.tip($scope.subtotal, $scope.data.tipPercentage);
      dataStore.dataStore.tipAmount = $scope.tipAmount;
      // Update Total
      $scope.total = $scope.subtotal + $scope.tipAmount;
      dataStore.dataStore.total = $scope.total;
      // Add tips to total tips
      $scope.tipTotal += $scope.tipAmount;
      dataStore.dataStore.tipTotal = $scope.tipTotal;
      // Add 1 to the meal count
      $scope.mealCount += 1;
      dataStore.dataStore.mealCount = $scope.mealCount;
      // Average Tip
      $scope.averageTip = $scope.tipTotal/$scope.mealCount;
      dataStore.dataStore.averageTip = $scope.averageTip;
      // Clear input values
      $scope.resetForm();
    } else {
      alert('Oops! Something went wrong!');
    }
  };
  $scope.resetForm = function(){
    $scope.data = "";
  }
  $scope.tax = function(price, taxRate){
    var tax = price*(taxRate/100);
    return price + tax;
  }
  $scope.tip = function(price, tipPercent){
    return price*(tipPercent/100);
  }
  $scope.resetAll = function(){
    $scope.resetForm();
    dataStore.dataStore.mealCount = 0;
    dataStore.dataStore.tipTotal = 0;
    dataStore.dataStore.subtotal = 0;
    dataStore.dataStore.tipAmount = 0;
    dataStore.dataStore.total = 0;
    dataStore.dataStore.tipTotal = 0;
    dataStore.dataStore.mealCount = 0;
    dataStore.dataStore.averageTip = 0;
    $location.path('calculator');
    $route.reload();
  }
}]);
