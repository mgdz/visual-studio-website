/**
 * ------------------------------------------
 * 人像摄影（people）父控制器
 * @version  1.0
 * @update   2015/12/14
 * @author   cisheng(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function (angular, tpl) {

	//angular会自动根据controller函数的参数名，导入相应的服务
	return {
		controller: function ($scope, $stateParams, $http, $interval, $q) {
			$scope.showPicWall = {};
			$scope.showList = [];
			$scope._all = [];
			$scope._environment = [];
			$scope._black = [];
			$scope._film = [];
			$scope._private = [];
			$scope.state = [0, 0, 0, 0, 0];
			$scope.listTypeConfirm = function () {
				$stateParams.type === 'all' && ($scope.showList = $scope._all);
				$stateParams.type === 'environment' && ($scope.showList = $scope._environment);
				$stateParams.type === 'black' && ($scope.showList = $scope._black);
				$stateParams.type === 'film' && ($scope.showList = $scope._film);
				$stateParams.type === 'private' && ($scope.showList = $scope._private);
			};
			$http.get("/json/people_picwall.json")
				.success(function (_data) {
					$scope.showPicWall = _data;
				});
			$scope.activeTypeConfirm = function (_index) {
				$scope.state = _.map($scope.state, function () {
					return 0;
				});
				$scope.state[_index] = 1;
			};
			$scope.isActive = function () {
				$stateParams.type === 'all' && $scope.activeTypeConfirm(1);
				$stateParams.type === 'environment' && $scope.activeTypeConfirm(2);
				$stateParams.type === 'black' && $scope.activeTypeConfirm(3);
				$stateParams.type === 'film' && $scope.activeTypeConfirm(4);
				$stateParams.type === 'private' && $scope.activeTypeConfirm(5);
			};
		},
		tpl: tpl
	};
};

define([
	'angular',
	'text!module/people/people.html'
], f)
