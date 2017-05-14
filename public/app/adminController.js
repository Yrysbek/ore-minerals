mineralApp.controller("adminController", function ($scope, $http, User, Role) {

    fillUsers();
    $scope.table = 'users';

    function fillUsers(){
      User.query(function(users) {
        $scope.users = users;
      }, handleError);
    }

    $scope.saveUser = function(){
      User.save($scope.editedUser, function(user){
        $scope.editedUser = {};
        successAlert('Пользователь успешно создан');
        fillUsers();
      }, handleError);
    }

    $scope.deleteUser = function(user){
      if(confirm('Удалить пользователя \'' + user.login + '\'?'))
        user.$delete(function(user){
          successAlert('Пользователь успешно удален');
          fillUsers();
        }, handleError);
    }

    $scope.editUser = function(user){
      $scope.editedUser = user;
    }

    $scope.setRoles = function(user){
      $scope.selectedUser = user;
      var userRoleIds = [];
      for(var key in user.Role){
        userRoleIds.push(user.Role[key].id);
      }
      for(var key in $scope.roles){
        $scope.roles[key].selected = userRoleIds.indexOf($scope.roles[key].id)!=-1;
      }
    }

    $scope.saveUserRoles = function(userRoles){
      var selectedRoles = [];
      for(var key in $scope.roles){
        if($scope.roles[key].selected){
          selectedRoles.push($scope.roles[key].id);
        }
      }
      $http.post('/api/users/'+$scope.selectedUser.id+'/setRoles', {roles:selectedRoles}).then(function(result){
        successAlert('Роли пользователя успешно сохранены');
        fillUsers();
      }, handleError);
    }

    $scope.updateUser = function(user){
      user.$update(function(result){
        $scope.editedUser = {};
        successAlert('Пользователь успешно отредактирован');
        fillUsers();
      }, handleError);
    }

    fillRoles();

    function fillRoles(){
      Role.query(function(roles) {
        $scope.roles = roles;
      }, handleError);
    }

    $scope.saveRole = function(){
      Role.save($scope.editedRole, function(role){
        $scope.editedRole = {};
        successAlert('Роль успешно создана');
        fillRoles();
      }, handleError);
    }

    $scope.deleteRole = function(role){
      if(confirm('Удалить роль \'' + user.login + '\'?'))
        role.$delete(function(role){
          successAlert('Роль успешно удалена');
          fillRoles();
        }, handleError);
    }

    $scope.editRole = function(role){
      $scope.editedRole = role;
    }

    $scope.updateRole = function(role){
      role.$update(function(result){
        $scope.editedRole = {};
        successAlert('Роль успешно отредактирована');
        fillRoles();
      }, handleError);
    }
});
