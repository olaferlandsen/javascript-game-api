var Game;
(function (Game) {
    var Character;
    (function (Character) {
        var Karma = /** @class */ (function () {
            function Karma(startWith) {
                if (typeof startWith === "number")
                    this._karma = startWith;
                else
                    this._karma = 0;
            }
            Karma.prototype.add = function (quantity) {
                if (typeof quantity === "number")
                    this._karma += quantity;
                else
                    this._karma++;
            };
            Karma.prototype.sub = function (quantity) {
                if (typeof quantity === "number")
                    this._karma -= quantity;
                else
                    this._karma--;
            };
            Karma.prototype.getKarma = function () {
                return this._karma;
            };
            Karma.prototype.addProfile = function (profile, minKarma, maxKarma) {
                this._profiles[profile] = {
                    max: maxKarma,
                    min: minKarma
                };
            };
            Karma.prototype.fetchProfiles = function () {
                return Object.keys(this._profiles);
            };
            Karma.prototype.removeProfile = function (profile) {
                if (!(profile in this._profiles))
                    return false;
                delete this._profiles[profile];
                return true;
            };
            Karma.prototype.updateProfile = function (profile, minKarma, maxKarma) {
                if (!(profile in this._profiles))
                    return false;
                this._profiles[profile] = {
                    min: minKarma,
                    max: (typeof maxKarma === "number" ? maxKarma : minKarma)
                };
                return true;
            };
            Karma.prototype.getProfile = function (profile) {
                if (!(profile in this._profiles))
                    return null;
                return this._profiles[profile];
            };
            Karma.prototype.getMaxProfileKarma = function () {
                var max = 0;
                for (var profile in this._profiles)
                    max = Math.max(max, this._profiles[profile].max);
                return max;
            };
            Karma.prototype.getMinProfileKarma = function () {
                var min = 0;
                for (var profile in this._profiles)
                    min = Math.min(min, this._profiles[profile].min);
                return min;
            };
            Karma.prototype.useProfile = function (profile) {
                if (!(profile in this._profiles))
                    return false;
                this._karma = this._profiles[profile].min;
            };
            return Karma;
        }());
        Character.Karma = Karma;
    })(Character = Game.Character || (Game.Character = {}));
})(Game || (Game = {}));
