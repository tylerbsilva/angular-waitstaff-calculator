var app = angular.module('waitstaffCalc', []);

app.controller('calcController', function($scope){
  $scope.subtotal = 56.7;
  $scope.tip = 23.6;
  $scope.total = 1456.23;
  $scope.tipTotal = 123.43;
  $scope.mealCount = 24;
  $scope.averageTip = 125.24;
});
