angular.module('starter.controllers', [])

  .controller('HomeCtrl', function ($cordovaBarcodeScanner, $scope, Camera, QRScanService, $ionicModal, $ionicPopup, $timeout) {
    $scope.getPhoto = function () {
      console.log('Getting camera');
      Camera.getPicture({
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false
      }).then(function (imageURI) {
        console.log(imageURI);
        $scope.lastPhoto = imageURI;
      }, function (err) {
        console.err(err);
      });
    };

    // 扫码函数
    $scope.scanQrode = function () {
      // fix show cancel info after open camera
      $ionicModal.fromTemplate('').show();

      console.log('start scan');
      QRScanService.scan()
        .then(function (result) {
          if (result.cancelled) {
            // this is a super hack. When QR scan gets cancelled by
            // clicking the back button on android, the app quits...
            // doing a blank modal to catch the back button press event
            $ionicModal.fromTemplate('').show().then(function () {
              $ionicPopup.alert({
                title: 'QR Scan Cancelled',
                template: 'You cancelled it!'
              });
            });
          } else {
            $ionicPopup.alert({
              template: 'Result: ' + result.text
            });
          }
        }, function (error) {
          $ionicPopup.alert({
            title: 'Unable to scan the QR code',
            template: 'Too bad, something went wrong.'
          });
        });
    };

    $scope.createQrCode = function () {

      var options = {
        // render method: 'canvas', 'image' or 'div'
        render: 'canvas',

        // version range somewhere in 1 .. 40
        minVersion: 1,
        maxVersion: 40,

        // error correction level: 'L', 'M', 'Q' or 'H'
        ecLevel: 'L',

        // offset in pixel if drawn onto existing canvas
        left: 0,
        top: 0,

        // size in pixel
        size: 200,

        // code color or image element
        fill: '#000',

        // background color or image element, null for transparent background
        background: null,

        // content
        text: 'no text',

        // corner radius relative to module width: 0.0 .. 0.5
        radius: 0,

        // quiet zone in modules
        quiet: 0,

        // modes
        // 0: normal
        // 1: label strip
        // 2: label box
        // 3: image strip
        // 4: image box
        mode: 0,

        mSize: 0.1,
        mPosX: 0.5,
        mPosY: 0.5,

        label: 'no label',
        fontname: 'sans',
        fontcolor: '#000',

        image: null
      };

      $('#my-qrcode').qrcode({
        size: 200,
        text: 'https://larsjung.de/jquery-qrcode/latest/demo/',
        image: 'img/ben.png'
      });
    };

    $scope.createQrCode();

  })

  .controller('ContactCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      //elem.hidden();
      //alert(JSON.stringify(event.target));
      $('#chat_item_' + chat.id).remove();
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);

    $scope.openWeibo = function () {
      alert('good');
      var ref = cordova.InAppBrowser.open('http://weibo.com', '_system', 'location=yes');
      alert(ref);
    };
  })

  .controller('ContactDocumentCtrl', function ($scope) {
    $scope.openLink = function () {
      alert('hello');
      //window.open('http://weibo.com', '_system');
      alert('world');
    };
  })

  .controller('AccountCtrl', function ($scope, $ionicModal, $ionicActionSheet) {
    $scope.settings = {
      enableFriends: true
    };

    // 修改头像modal
    $ionicModal.fromTemplateUrl('avatar-modal.html', function (modal) {
      $scope.avatarModal = modal;
    }, {
      animation: 'fade-in'
    });

    // 修改自我简介modal
    $ionicModal.fromTemplateUrl('self-introduction-modal.html', function (modal) {
      $scope.selfIntroModal = modal;
    }, {
      animation: 'slide-in-up',
      focusFirstInput: true
    });

    // 修改联系方式modal
    $ionicModal.fromTemplateUrl('contact-information-modal.html', function (modal) {
      $scope.contactInfoModal = modal;
    }, {
      animation: 'slide-in-up',
      focusFirstInput: true
    });

    // 修改我的档案modal
    $ionicModal.fromTemplateUrl('self-document-modal.html', function (modal) {
      $scope.selfDocModal = modal;
    }, {
      animation: 'slide-in-up',
      focusFirstInput: true
    });

    // =============================================

    // 打开修改头像modal
    $scope.openAvatarModal = function ($event) {
      $event.stopPropagation();
      $scope.avatarModal.show();
    };

    // 打开修改自我自我简介的modal
    $scope.openSelfIntroModal = function () {
      $scope.selfIntroModal.show();
    };

    // 打开修改联系方式modal
    $scope.openContactInfoModal = function () {
      $scope.contactInfoModal.show();
    };

    // 打开我的档案modal
    $scope.openSelfDocModal = function () {
      $scope.selfDocModal.show();
    };

    $scope.changePhoto = function () {
      window.location.href = '#/tab/avatar';
    };

    $scope.showActionsheet = function () {
      $ionicActionSheet.show({
        //titleText: 'ActionSheet Example',
        buttons: [
          {
            text: '从相册中选择'
          },
          {
            text: '拍照'
          },
        ],
        //destructiveText: 'Delete',
        cancelText: '取消',
        cancel: function () {
          console.log('CANCELLED');
        },
        buttonClicked: function (index) {
          console.log('BUTTON CLICKED', index);
          if (index == 0) {
            alert('从相册中选择');
          } else if (index == 1) {
            alert('拍照')
          }
          return true;
        },
        destructiveButtonClicked: function () {
          console.log('DESTRUCT');
          return true;
        }
      });
    };
  })
  .controller('AvatarModalCtrl', function ($scope) {
    //alert('ok');
    $scope.closeAvatarModal = function () {
      alert('ok');
      $scope.modal.hide();
    };
  })
  .controller('selfIntroModalCtrl', function ($scope) {
    $scope.user = {};

    // 更新自我简介
    $scope.updateSelfIntro = function () {
      alert($scope.user.selfIntroText);
      $scope.modal.hide();
    };

  })
  .controller('ContactInfoCtrl', function ($scope) {
    // 联系人信息
    $scope.contactInfo = {};

    $scope.updateContactInfo = function () {
      alert(JSON.stringify($scope.contactInfo));
    }
  })
  .controller('SelfDocCtrl', function ($scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('doc-editor-modal.html', function (modal) {
      $scope.openDocEditorModal = modal;
    }, {
      animation: 'fade-in',
      focusFirstInput: true
    });

    $scope.openDocEditor = function () {
      $scope.openDocEditorModal.show();
      //$scope.modal.hide();
      $scope.modal.hide();
    };
  })
  .controller('SelfDocEditorCtrl', function ($scope) {

    $scope.updateSelfDoc = function () {

    };
  });
