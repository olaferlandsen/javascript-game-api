angular.module('game')
	.controller('gameCtrl', function ($scope, $rootScope, $timeout) {
		
		$scope.enemies = [];
		// Wolf
		$scope.enemies.push(new Person({
			name    :   'Wolf',
			attack  :   20,
			defense :   5,
			life    :   {
				max:100,
				current:100
			},
			image   :   {
				live    :   'img/wolf-live.png',
				dead    :   'img/wolf-dead.png'
			}
		}));
		// Troll
		$scope.enemies.push(new Person({
			name    :   'Bear',
			attack  :   45,
			defense :   15,
			life    :   {
				max:100,
				current:100
			},
			image   :   {
				live    :   'img/bear-live.png',
				dead    :   'img/bear-dead.png'
			}
		}));
		// Bear
		$scope.enemies.push(new Person({
			name    :   'Troll',
			attack  :   45,
			defense :   100,
			life    :   {
				max:100,
				current:100
			},
			image   :   {
				live    :   'img/troll-live.png',
				dead    :   'img/troll-dead.png'
			}
		}));
		// Me
		$scope.me = new Person({
			name    :   'You',
			attack  :   57,
			defense :   45,
			life    :   {
				max     :100,
				current :100
			},
			level   :   1
		});
		// Attack
		$scope.attackTo = function (enemy) {
			$scope.me.attackTo(enemy);
			enemy.attackTo($scope.me);
			
			if ($scope.me.getExperience() > 1000 ) {
				$scope.me.addLevel(1);
				$scope.me.subExperience(1000);
				$scope.me.addAttack(20);
				$scope.me.addDefense(20);
				//$scope.me.addCritial(10);
				$scope.me.addLife(100);
			}
			if ($scope.me.isDead()) {
				alert('You are dead');
			}
		};
		
		
	});