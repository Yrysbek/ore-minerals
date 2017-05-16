mineralApp.controller("mineralsController", function ($scope, $http, Mineral, MineralClass) {

    $scope.view = 'table';
    $scope.columns = {
      name: true,
      composition: true,
      color: true,
      hardness: true,
      density: true
    };
    $scope.page = 1;

    fillMinerals();
    $scope.fillMinerals = fillMinerals;

    function fillMinerals(){
      $http.get('/api/minerals', {params:{page: $scope.page}}).then(function(result) {
        $scope.Minerals = result.data.rows;
        $scope.pageCount = result.data.pageCount;
      }, handleError);
    }

    $scope.movePage = function(move){
      if((move==-1 && $scope.page<=1) || (move==1 && $scope.page>=$scope.pageCount))
        return;
      $scope.page += move;
      fillMinerals();
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
      $scope.viewMode = false;
      $scope.editedMineral = Mineral;
    }

    $scope.viewMineral = function(Mineral){
      $scope.viewMode = true;
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

    $scope.elements = [
      "H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar",
      "K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br",
      "Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te",
      "I","Xe","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm",
      "Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn",
      "Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr",
      "Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Uut","Fl","Uup","Lv","Uus","Uuo"
    ];

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
