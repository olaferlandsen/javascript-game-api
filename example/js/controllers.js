

angular.module('game')
	.controller('gameCtrl', function ($scope, $interval, $animate) {
		$scope.elementKill = angular.element(document.querySelector('.message.kill'));
		$scope.elementHit = angular.element(document.querySelector('.message.hit'));
		$scope.elementMiss = angular.element(document.querySelector('.message.miss'));
		$scope.elementBlocked = angular.element(document.querySelector('.message.blocked'));
		$scope.elementDead = angular.element(document.querySelector('.message.dead'));
		$scope.items = [
			{
				name    : 'Sword',
				type    :   'Sword',
				weight  : 10,
				size    : 3,
				price   : 400,
				attack  : 50,
				critical: 20,
				defense : 0
			},
			{
				name    : 'Armor',
				type    :   'Armor',
				weight  : 10,
				size    : 3,
				price   : 2500,
				attack  : 0,
				defense : 200
			},
			{
				name    : 'Helmet',
				type    :   'Helmet',
				weight  : 10,
				size    : 3,
				price   : 300,
				attack  : 0,
				defense : 20
			},
			{
				name    : 'Boots',
				type    :   'Boots',
				weight  : 10,
				size    : 2,
				price   : 300,
				attack  : 0,
				defense : 12
			},
			{
				name    : 'Gloves',
				type    :   'Gloves',
				weight  : 10,
				size    : 1,
				price   : 120,
				attack  : 0,
				defense : 7.5,
				critical:10,
			},
			{
				name    : 'Shield',
				weight  : 30,
				size    : 4,
				price   : 700,
				defense : 70
			}
		];
		$scope.enemies = [];
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
			},
			gold: (Math.floor( Math.random() * 1000 ) + 1),
			critical: (Math.floor( Math.random() * 30 ) + 1)
		}));
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
			},
			gold: (Math.floor( Math.random() * 1000 ) + 1),
			critical: (Math.floor( Math.random() * 30 ) + 1)
			
		}));
		$scope.enemies.push(new Person({
			name    :   'Troll',
			attack  :   97,
			defense :   70,
			level   :4,
			life    :   {
				max:100,
				current:100
			},
			image   :   {
				live    :   'img/troll-live.png',
				dead    :   'img/troll-dead.png'
			},
			gold: (Math.floor( Math.random() * 1000 ) + 1),
			critical: (Math.floor( Math.random() * 30 ) + 1)
			
		}));
		$scope.enemies.push(new Person({
			name    :   'Orc',
			attack  :   120,
			defense :   60,
			level   :6,
			life    :   {
				max:100,
				current:100
			},
			image   :   {
				live    :   'img/troll-live.png',
				dead    :   'img/troll-dead.png'
			},
			gold: (Math.floor( Math.random() * 1000 ) + 1),
			critical: (Math.floor( Math.random() * 30 ) + 1)
			
		}));
		$scope.enemies.push(new Person({
			name    :   'Ghost',
			attack  :   74,
			defense :   150,
			level   :6,
			life    :   {
				max:100,
				current:100
			},
			image   :   {
				live    :   'img/troll-live.png',
				dead    :   'img/troll-dead.png'
			},
			gold: (Math.floor( Math.random() * 1000 ) + 1),
			critical: (Math.floor( Math.random() * 30 ) + 1)
			
		}));
		$scope.enemies.push(new Person({
			name    :   'Dragon',
			attack  :   250,
			defense :   300,
			level   :9,
			life    :   {
				max:100,
				current:100
			},
			image   :   {
				live    :   'img/troll-live.png',
				dead    :   'img/troll-dead.png'
			},
			gold: (Math.floor( Math.random() * 1000 ) + 1),
			critical: (Math.floor( Math.random() * 30 ) + 1)
			
		}));
		// Me
		$scope.me = new Person({
			name    :   'You',
			attack  :   57,
			defense :   45,
			life    :   {
				max     :200,
				current :200
			},
			level   :   1,
			gold:1200,
			critical: (Math.floor( Math.random() * 30 ) + 1)
			
		});
		// Attack
		$scope.attackTo = function (enemy) {
			$scope.me.attackTo(enemy, {
				combo   :   (Math.floor(Math.random() * 1000)+1) % 2 == 0,
				comboX  :   Math.floor(Math.random() * 5 ) + 1,
				onKill  :   function () {
					$scope.me.statistics.kills++;
					$scope.me.addExperience(1000);
					$scope.me.inventory.addGold(enemy.inventory.getGold());
					
					$scope.message = 'KILL!';
					
					
					$animate.addClass($scope.elementKill, 'fade').then(function () {
						$animate.removeClass($scope.elementKill, 'fade')
					});
				},
				onHit   :   function (points) {
					$scope.message = 'HIT ' + points + ' POINTS!';
					$animate.addClass($scope.elementHit, 'fade').then(function () {
						$animate.removeClass($scope.elementHit, 'fade')
					});
					$scope.me.addExperience(10)
				},
				onMiss  :   function () {
					$scope.message = 'MISS!';
					$animate.addClass($scope.elementMiss, 'fade').then(function () {
						$animate.removeClass($scope.elementMiss, 'fade')
					});
				},
				onBlock :   function (blockPoits, finalAttack) {
					$scope.me.addExperience(5);
					$animate.addClass($scope.elementBlocked, 'fade').then(function () {
						$animate.removeClass($scope.elementBlocked, 'fade')
					});
				}
			}).then(function () {
				console.log('this', this);
			});
			
			
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
				$animate.addClass($scope.elementDead, 'fade').then(function () {
					$animate.removeClass($scope.elementDead, 'fade')
				});
			}
		};
		//
		$scope.buy = function (index) {
			var item = $scope.items[index];
			if ($scope.me.getGold() >= item.price ) {
				$scope.me.inventory.subGold(item.price);
				$scope.me.setItem(item);
				// remove item
				$scope.items.splice(index, 1);
			} else{
				console.error('no se puede comprar aun')
			}
		}
	});