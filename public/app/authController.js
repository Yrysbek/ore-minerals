mineralApp.controller("authController", function ($scope, $http) {
    $scope.signin = function(){
      $http.post('/signin', {login: $scope.user.login, password: $scope.user.password}).then(function(result){
        window.location = '/';
      }, function(error){
        $scope.error = error.data;
      });
    }
});
