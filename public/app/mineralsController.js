mineralApp.controller("mineralsController", function ($scope, $http, Mineral, MineralClass) {

    fillMinerals();

    function fillMinerals(){
      Mineral.query(function(Minerals) {
        $scope.Minerals = Minerals;
      }, handleError);
    }

    fillMineralClasses();

    function fillMineralClasses(){
      MineralClass.query(function(MineralClasses) {
        $scope.MineralClasses = MineralClasses;
      }, handleError);
    }

    $scope.saveMineral = function(){
      Mineral.save($scope.editedMineral, function(Mineral){
        $scope.editedMineral = {};
        successAlert('Минерал успешно создан');
        fillMinerals();
      }, handleError);
    }

    $scope.deleteMineral = function(Mineral){
      if(confirm('Удалить Минерал \'' + Mineral.name + '\'?'))
        Mineral.$delete(function(result){
          successAlert('Минерал успешно удален');
          fillMinerals();
        }, handleError);
    }

    $scope.editMineral = function(Mineral){
      $scope.editedMineral = Mineral;
    }

    $scope.updateMineral = function(Mineral){
      Mineral.$update(function(result){
        $scope.editedMineral = {};
        successAlert('Минерал успешно отредактирован');
        fillMinerals();
      }, handleError);
    }

});
