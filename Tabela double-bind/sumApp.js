// Tworzymy moduł aplikacji
var myApp = angular.module('userApp', []);

//binduje dane
myApp.directive('contenteditable', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        // view -> model
        element.bind('blur', function() {
          scope.$apply(function() {
            ctrl.$setViewValue(element.html());
          });
        });
  
        // model -> view
        ctrl.$render = function() {
          element.html(ctrl.$viewValue);
        };
        // load init value from DOM
        ctrl.$render();
      }
    };
  });
  

// Tworzymy kotroler UserCtrl
myApp.controller('UserCtrl', ['$scope', '$http', function ($scope, $http) {
    
    // tworzymy model
    $scope.users = [];
    $scope.newUser = {};
    $scope.summary={};
    // zasilamy danymi z pliku JSON  
    $http.get('users.json').success(function (data) {
        $scope.users = data;
        _setIndexes();
    });
    $scope.addUser = function () {
        var newUser = { name: "", index_number: "", javascript: 0, jQuery: 0, PHP: 0 };
        newUser.index = $scope.users.length;
        $scope.users.push(newUser);
        _calculateUsersSums();
    };
    $scope.rowChanged =function () {
        $scope.users.forEach(function (user, index) {
             _repairUserFields(user)
        });
        _calculateUsersSums();
        _calculateSummary();
    };
    $scope.deleteUser = function (user) {
        $scope.users.splice(user.index, 1);
        _setIndexes();
    };
    
    // metody prywatne
    function _setIndexes() {
        $scope.users.forEach(function (user, index) {
            user.index = index;
        });
        _calculateUsersSums();
        _calculateSummary();
    };
    function _calculateUsersSums() {
        $scope.users.forEach(function (user) {
           
            user.sum = 0;
            user.sum += user.javascript + user.jQuery + user.PHP;
        });
    };
    function _repairUserFields(user) {
        user.javascript=_checkIfNumber(user.javascript);
        user.jQuery = _checkIfNumber(user.jQuery);
        user.PHP = _checkIfNumber(user.PHP);
    }
    function _checkIfNumber(value) {
        if (!isNaN(value)) {
            return parseInt(value)
        }
        else {
            return 0;
        }
    }
    function _calculateSummary(){
        var sum=$scope.summary;
        sum.javascript=0;
        sum.jQuery=0;
        sum.PHP=0;
        $scope.users.forEach(function (user) {
            sum.javascript+=user.javascript;
            sum.jQuery+=user.jQuery;
            sum.PHP+=user.PHP;
        });
        sum.totalSum=sum.javascript+sum.jQuery+sum.PHP;
        $scope.summary=sum;
    }
    
}]);

