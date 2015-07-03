var app = angular.module('waitstaffCalc', []);

app.controller('calcController', ['$scope', function($scope){
  $scope.mealCount = 0;
  $scope.tipTotal = 0;
  $scope.submit= function(){
    if ($scope.inputNumbers.$valid){
      // Find subtotal with tax
      $scope.subtotal = $scope.tax($scope.data_mealPrice, $scope.data_taxRate);
      // Calculate tip amount
      $scope.tipAmount = $scope.tip($scope.subtotal, $scope.data_tipPercentage);
      // Update Total
      $scope.total = $scope.subtotal + $scope.tipAmount;
      // Add tips to total tips
      $scope.tipTotal += $scope.tipAmount;
      // Add 1 to the meal count
      $scope.mealCount += 1;
      // Average Tip
      $scope.averageTip = $scope.tipTotal/$scope.mealCount;
      // Clear input values
      $scope.resetForm();
    } else {
      alert('Oops! Something went wrong!');
    }
  };
  $scope.resetForm = function(){
    $scope.data.mealPrice = '';
    $scope.data.taxRate = '';
    $scope.data.tipPercentage = '';
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
    $scope.subtotal = '';
    $scope.tipAmount = '';
    $scope.total = '';
    $scope.tipTotal = '';
    $scope.mealCount = '';
    $scope.averageTip = '';
  }
]});
