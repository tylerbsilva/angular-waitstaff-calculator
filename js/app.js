var app = angular.module('waitstaffCalc', []);

app.controller('calcController', function($scope){
  $scope.mealCount = 0;
  $scope.tipTotal = 0;

  $scope.submit= function(){
    if ($scope.inputNumbers.$valid){
      console.log($scope.data);
      // Find subtotal with tax
      $scope.subtotal = $scope.tax($scope.data.mealPrice, $scope.data.taxRate);
      // Calculate tip amount
      $scope.tipAmount = $scope.tip($scope.subtotal, $scope.data.tipPercentage);
      // Update Total
      $scope.total = $scope.subtotal + $scope.tipAmount;
      // Add tips to total tips
      $scope.tipTotal += $scope.tipAmount;
      // Add 1 to the meal count
      $scope.mealCount++;
    }
  };

  $scope.tax = function(price, taxRate){
    var tax = price*(taxRate/100);
    return price + tax;
  }
  $scope.tip = function(price, tipPercent){
    return price*(tipPercent/100);
  }


});
