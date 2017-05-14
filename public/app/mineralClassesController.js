mineralApp.controller("mineralClassesController", function ($scope, $http, MineralClass) {

    fillMineralClasses();

    function fillMineralClasses(){
      MineralClass.query(function(MineralClasses) {
        $scope.MineralClasses = MineralClasses;
      }, handleError);
    }

    $scope.saveMineralClass = function(){
      MineralClass.save($scope.editedMineralClass, function(MineralClass){
        $scope.editedMineralClass = {};
        successAlert('Минерал успешно создан');
        fillMineralClasses();
      }, handleError);
    }

    $scope.deleteMineralClass = function(MineralClass){
      if(confirm('Удалить Минерал \'' + MineralClass.name + '\'?'))
        MineralClass.$delete(function(result){
          successAlert('Минерал успешно удален');
          fillMineralClasses();
        }, handleError);
    }

    $scope.editMineralClass = function(MineralClass){
      $scope.editedMineralClass = MineralClass;
    }

    $scope.updateMineralClass = function(MineralClass){
      MineralClass.$update(function(result){
        $scope.editedMineralClass = {};
        successAlert('Минерал успешно отредактирован');
        fillMineralClasses();
      }, handleError);
    }

});
