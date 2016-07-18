var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.expandable', 'ui.grid.selection', 'ui.grid.pinning', 'ui.grid.pagination']);

app.controller('MainCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {
  $scope.gridOptions = {
    paginationPageSizes: [5, 10, 15],
    paginationPageSize: 5,
    expandableRowTemplate: 'expandableRowTemplate.html',
    expandableRowHeight: 150,
    //subGridVariable will be available in subGrid scope
    expandableRowScope: {
      subGridVariable: 'subGridScopeVariable'
    }
  }

  $scope.gridOptions.columnDefs = [
    { name: 'id' },
    { name: 'name'},
    { name: 'age'},
    { name: 'address.city'}
  ];

  $http.get('complex.json')
    .success(function(data) {
      for(i = 0; i < data.length; i++){
        data[i].subGridOptions = {
          columnDefs: [ {name:"Id", field:"id"},{name:"Name", field:"name"} ],
          data: data[i].friends
        }
      }
      $scope.gridOptions.data = data;
    });

    $scope.gridOptions.onRegisterApi = function(gridApi){
      $scope.gridApi = gridApi;
    };

    $scope.expandAllRows = function() {
      $scope.gridApi.expandable.expandAllRows();
    }

    $scope.collapseAllRows = function() {
      $scope.gridApi.expandable.collapseAllRows();
    }
}]);