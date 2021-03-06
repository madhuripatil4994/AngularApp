/******************************************************************************
 *  Purpose         : Dashboard controller for controlling dashboard.html.
 *  @description
 *  @file           : dashboardCtrl.js
 *  @overview       : to handle events on dashboard.html.
 *  @author         : madhuri chaudhari
 *  @version        : 1.0
 *  @since          : 16-04-2018
 ******************************************************************************/
app.controller('dashboardCtrl', function($scope, $mdDialog, $rootScope, $state) {
  $rootScope.flag = true;
  $scope.showDialog = function(clickEvent, item) {
    $mdDialog.show({
      locals: {
        mobileData: item
      },
      controller: dialogController,
      templateUrl: 'templates/mobileDialog.html',
      parent: angular.element(document.body),
      targetEvent: clickEvent,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen
    });
  };


  var data = JSON.parse(localStorage.getItem('CartArray'));
  if(data !=undefined){
  $scope.cartArray = data;
  }
  else{
    $scope.cartArray = [];
  }
  
  $scope.addToCart = function(mobileData) {
    if (mobileData !== undefined) {
      if ($scope.cartArray.length === 0) {
        $scope.cartArray.push(mobileData);
        // $rootScope.arrayOfCart = $scope.cartArray;
        localStorage.setItem("CartArray", JSON.stringify($scope.cartArray));
        $rootScope.arrayOfCart = JSON.parse(localStorage.getItem('CartArray'));
        console.log("scope", $scope.cartArray);
        console.log("rootScope", $rootScope.arrayOfCart);
      } else {
        var isRepeated = false;
        for (var i = 0; i < $scope.cartArray.length; i++) {
          if ($scope.cartArray[i].id === mobileData.id) {
            console.log("cart ", $scope.cartArray[i].id);
            console.log("mobile ", mobileData.id)
            isRepeated = true;
            // console.log($scope.cartArray);
          }
        }
        if (!isRepeated) {
          $scope.cartArray.push(mobileData);
          localStorage.setItem("CartArray", JSON.stringify($scope.cartArray));
          $rootScope.arrayOfCart = JSON.parse(localStorage.getItem('CartArray'));
          // $rootScope.arrayOfCart = $scope.cartArray;
          // console.log( $scope.cartArray);
        }

      }

    }

  };

  /*
   * @description DialogController for handling dialog controls.
   * @param {service} $scope is a service
   * @param {service} $mdDialog is a service
   * @param {object} mobileData clicked object data
   */
  function dialogController($scope, $mdDialog, mobileData) {
    $scope.mobileData = mobileData;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }
});
