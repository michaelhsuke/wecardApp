angular.module('starter.services', [])

  .factory('QRScanService', ['$q', function ($q) {

    return {
      scan: function (config) {
        var q = $q.defer();

        cordova.plugins.barcodeScanner.scan(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        }, config);

        return q.promise;
      },
      createCode: function (type, data) {
        var q = $q.defer();
        cordova.plugins.barcodeScanner.encode(type, data, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };

  }])
  .factory('Camera', ['$q', function ($q) {

    return {
      getPicture: function (options) {
        var q = $q.defer();

        navigator.camera.getPicture(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    }
  }])
  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var contacts = [{
      id: 0,
      name: '张三',
      lastText: 'You on your way?',
      face: 'img/ben.png',
      job: '研发工程师',
      company: '百度'
    }, {
      id: 1,
      name: '韩某某',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png',
      job: '产品经理',
      company: '阿里'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg',
      job: '创始人',
      company: ''
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png',
      job: 'CEO'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png',
      job: '公关',
      company: '百度'
    }];

    return {
      all: function () {
        return contacts;
      },
      remove: function (chat) {
        contacts.splice(contacts.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < contacts.length; i++) {
          if (contacts[i].id === parseInt(chatId)) {
            return contacts[i];
          }
        }
        return null;
      }
    };
  })
  .factory('UserService', function () {
    var userInfo = {
      "id": 10000,
      "username": "michaelhsuke",
      "name": "徐可",
      "company": "三六五",
      "gender": 1,
      "birthday": "1988-10-28",
      "position": "PHP开发工程师",
      "contacts": [
        {"type": 1, "value": "15600063221"}, // 电话号码
        {"type": 2, "value": "michaelhsuke"}, // 微信
        {"type": 3, "value": "254182535"}, // QQ
        {"type": 4, "value": "michael.hsu.ke@gmail.com"}  // 微博
      ]
    };

    return {
      getUser: function() {
        return userInfo;
      },
      setUsername: function(_username) {
        userInfo['username'] = _username;
      },
      getUsername: function() {
        return userInfo['username'];
      }
    }
  });
