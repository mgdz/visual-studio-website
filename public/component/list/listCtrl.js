/**
 * ------------------------------------------
 * 相册专辑分类（list）控制器
 * @version  1.0
 * @update   2015/12/29
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($scope, $http, $location, $stateParams) {
		$scope._all = [];
		$scope._environment = [];
		$scope._black = [];
		$scope._film = [];
		$scope._other = [];
		$scope._travel = [];
		$scope._city = [];
		$scope._micro = [];
		$scope._impress = [];
		$scope.isActive();
		$scope.listTypeConfirm = function () {
			$stateParams.type === 'all' && ($scope.showList = $scope._all);
			$stateParams.type === 'environment' && ($scope.showList = $scope._environment);
			$stateParams.type === 'black' && ($scope.showList = $scope._black);
			$stateParams.type === 'film' && ($scope.showList = $scope._film);
			$stateParams.type === 'other' && ($scope.showList = $scope._other);
			$stateParams.type === 'travel' && ($scope.showList = $scope._travel);
			$stateParams.type === 'city' && ($scope.showList = $scope._city);
			$stateParams.type === 'micro' && ($scope.showList = $scope._micro);
			$stateParams.type === 'impress' && ($scope.showList = $scope._impress);
		};
		if ($scope._all.length === 0) {
			whichType('people');
			whichType('private');
			whichType('scenery');
			whichType('love');
		} else
			$scope.listTypeConfirm();

		// 一级导航类别区分
		function whichType(type) {
			if ($location.absUrl().indexOf(type) === -1) return;
			else {
				var _jsonUrl = "/json/" + type + "_list.json";
				$http.get(_jsonUrl)
					.success(function (_data) {
						//					$scope._all = _data.lists;
						$scope._all = _data;
						_.each($scope._all, function (element) {
							element.type === 'environment' && $scope._environment.push(element);
							element.type === 'black' && $scope._black.push(element);
							element.type === 'film' && $scope._film.push(element);
							element.type === 'other' && $scope._other.push(element);
							element.type === 'travel' && $scope._travel.push(element);
							element.type === 'city' && $scope._city.push(element);
							element.type === 'micro' && $scope._micro.push(element);
							element.type === 'impress' && $scope._impress.push(element);
						});
						$scope.listTypeConfirm();
					});
//				debugger;
			}
		}
		//		$scope.$on('ngRepeatFinished', function () {
		//			// 下面是在dom render完成后执行的js
		//			// ng-repeat渲染之后再加载页脚
		//			$("#footer").html('<div ng-include="' + "'module/layout/footer.html'" + '"ng-controller="navCtrl"></div>');
		//		});
	}
};

define(['angular'], f)