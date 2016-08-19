var app = angular.module('watchers', []);
app.controller('watchersController', function($scope) {
	$scope.objectEquality = false;
	$scope.isWatchGroup = false;
	$scope.message = "doesn't"
	$scope.value = 'Some Value';
	$scope.collections = [1,2,3];
	$scope.reference = {property: 'Property Value'};


	$scope.watchFunction = function(type){
		if(type == 'value'){
			$scope.value = 'Some Other Value';
		}
		else if(type == 'collections'){
			$scope.collections = [4,5,6];
		}
		else if(type == 'reference'){
			$scope.reference = {someOtherProperty: 'Some Other Property Value'};
		}
	}

		var unWatchGroup;
		$scope.fireWatchGroup = function(flag){
			if(flag){
				unWatchGroup = $scope.$watchGroup(['value', 'collections', 'reference'],  function (newValues, oldValues) {
					console.log('watchGroup fired for value "[value, collections, reference]"');
					alert("Note: watchGroup fires if you change value OR collection OR reference")
				});		
			}else{
				unWatchGroup();
				alert("Note: watchGroup doesn't fires anymore, only respective watcher fires for value, collectio or reference")
			}
		}

		var unWatchValue, unWatchCollection, unWatchReference;
		unWatchValue = $scope.$watch('value', function () {
			console.log('watcher fired for value');
		});

		unWatchCollection = $scope.$watch('collections', function () {
			console.log('watcher fired for collection');
		});

		unWatchReference = $scope.$watch('reference', function () {
			console.log('watcher fired for reference');
		});

		$scope.changeOption = function(objectEquality){
			if(objectEquality){
				alert("Note that on adding a property to the Reference or adding an item to the collection watcher does fires")
				unWatchValue();
				unWatchCollection();
				unWatchReference();

				$scope.message = "does"

				unWatchValue = $scope.$watch('value', function () {
					console.log('watcher fired for value');
					
				}, objectEquality);

				unWatchCollection = $scope.$watch('collections', function () {
					console.log('watcher fired for collection');
					
				}, objectEquality);

				unWatchReference = $scope.$watch('reference', function () {
					console.log('watcher fired for reference');
					
				}, objectEquality);
			}
			else
				{
					alert("Note that on adding a property to the Reference or adding an item to the collection watcher doesn't fires")
					unWatchValue();
					unWatchCollection();
					unWatchReference();

					$scope.message = "doesn't";

					unWatchValue = $scope.$watch('value', function () {
						console.log('watcher fired for value');
					}, objectEquality);

					unWatchCollection = $scope.$watch('collections', function () {
						console.log('watcher fired for collection');
					}, objectEquality);

					unWatchReference = $scope.$watch('reference', function () {
						console.log('watcher fired for reference');
					}, objectEquality);
				}
		}

	var propertyCount = 1;
	$scope.addProperty = function(){
		$scope.reference['property'+ propertyCount] = propertyCount;
		console.log($scope.reference);
		propertyCount++;
		alert("Note: Watcher " + $scope.message + " fired on adding a property to the Reference")		
	}

	var itemCount = 4;
	$scope.addItem = function(){
		$scope.collections.push(itemCount);
		console.log($scope.collections);
		itemCount++;
		alert("Note: Watcher " + $scope.message + " fired on adding an Item to the collection")			
	}

 })