mineralApp.controller("mineralsController", function ($scope, $http, Mineral, MineralClass) {

    $scope.view = 'table';
    $scope.columns = {
      name: true,
      composition: true,
      color: true,
      hardness: true,
      density: true
    };

    fillMinerals();
    $scope.fillMinerals = fillMinerals;

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

    $scope.uploadImage = function(){

        var formData = $("form#uploadMineralImage").serialize();

        $.post('/api/minerals/'+$scope.editedMineral.id+'/uploadImage', formData, function(data) {
            console.log(data);
        }, handleError);

        return false;
    }

    $scope.getUploadImageUrl = function(){
      return '/api/minerals/'+$scope.editedMineral.id+'/uploadImage';
    }

});

$(document).on("submit", "form#uploadMineralImage", function(event){
    event.preventDefault();

    var url = angular.element('#mineralsController').scope().getUploadImageUrl();
    $.ajax({
        url: url,
        type: $(this).attr("method"),
        dataType: "JSON",
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function (data, status){
          successAlert("Изображение успешно загружено");
          $('#uploadImageModal').modal('hide');
          angular.element('#mineralsController').scope().fillMinerals();
        },
        error: function (xhr, desc, err){
          errorAlert(err);
        }
    });

});
