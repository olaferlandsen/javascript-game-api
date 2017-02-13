

angular.module('game')
	.controller('gameCtrl', function ($scope) {
		
		$scope.items = [
			{
				name    : 'Espada de Hierro',
				type    :   'sword',
				weight  : 10,
				size    : 3,
				price   : 400,
				attack  : 50,
				critical:10,
				defense : 0
			},
			{
				name    : 'Armadura',
				type    :   'sword',
				weight  : 10,
				size    : 3,
				price   : 2500,
				attack  : 0,
				defense : 200
			},
			{
				name    : 'Guantes',
				type    :   'sword',
				weight  : 10,
				size    : 3,
				price   : 300,
				attack  : 0,
				defense : 20
			},
			{
				name    : 'Botas',
				type    :   'sword',
				weight  : 10,
				size    : 3,
				price   : 300,
				attack  : 0,
				defense : 55.7
			},
			{
				name    : 'Escudo de Acero',
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
				
				onKill:function () {
					$scope.me.statistics.kills++;
					
					console.log('has matado al enemigo');
					$scope.me.addExperience(1000);
					$scope.me.inventory.addGold(enemy.inventory.getGold())
				},
				onHit: function (points) {
					console.log('atacaste al enemigo ' + points);
					$scope.me.addExperience(10)
				},
				onMiss: function () {
					console.log('fallaste...');
				},
				onBlock: function (blockPoits, finalAttack) {
					console.log('el enemigo bloqueo ' + blockPoits +'/' +finalAttack);
					$scope.me.addExperience(5)
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
				alert('You are dead');
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