/**
 * Created by xuke on 6/26/16.
 */
angular.
    module('utils.service', []).
    factory('utils', ['$ionicHistory', function ($ionicHistory) {
      return {
        back2Parent: function () {
          $ionicHistory.goBack();
        }
      };
    }]);