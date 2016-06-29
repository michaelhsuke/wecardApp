angular.module('starter.controllers', [])
    .controller('HomeCtrl', function ($cordovaBarcodeScanner, $scope, Camera, QRScanService, $ionicModal, $ionicPopup, $timeout, $state) {
      console.log('show scope');

      $scope.tabs = $state.current.data;
      console.dir($scope);

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
          console.log(err);
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

    .controller('ContactCtrl', function ($cordovaBarcodeScanner, $scope, Chats, $state, $ionicPopover, $ionicPopup, QRScanService, $ionicModal) {
      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //
      //$scope.$on('$ionicView.enter', function(e) {
      //});
      $scope.filterName = '';

      $scope.matchUsers = function (userInfo, name) {
        //console.dir($scope);
        console.log(name);
        var filterName = $('#filter_name').val();
        if (userInfo.name && userInfo.name.toLocaleLowerCase().indexOf(filterName) != -1) {
          return true;
        } else {
          return false;
        }
      };

      $ionicPopover.fromTemplateUrl('templates/add-friend-popover.html', {
        scope: $scope
      }).then(function (popover) {
        $scope.popover = popover;
      });

      $scope.openPopover = function ($event) {
        //$scope.popover.show($event);
        //document.body.classList.add('platform-ios');
        $scope.popover.show($event);
      };

      $scope.closePopover = function () {
        $scope.popover.hide();
      };

      $scope.$on('$destroy', function () {
        $scope.popover.remove();
      });

      $scope.$on('popover.hidden', function () {

      });

      $scope.$on('popover.removed', function () {

      });

      $scope.scanQRCode = function () {
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
                var user = JSON.parse(result.text);
                $state.go('tab.contact.detail', {'chatId': user['id']});
              }
            }, function (error) {
              $ionicPopup.alert({
                title: 'Unable to scan the QR code',
                template: 'Too bad, something went wrong.'
              });
            });
      };


      $scope.fireTouchStart = function (event) {
        console.log('touch start');
        //console.dir(event);
        console.dir(arguments);
      };

      $scope.fireTouchEnd = function () {
        console.log('touch end');
      };

      $scope.detectEvent = function ($event) {
        console.log('detect event');
        console.dir($event);
        //$event.preventDefault();
      };

      $scope.goToDetail = function (contactID, $event) {
        //alert(contactID);  // todo
        //alert($event.name);
        console.dir($event);
        //console.log(document.querySelector('#chat_item_' + contactID).getAttribute('id'));
        $state.go('tab.contact.detail', {'chatId': contactID});
      };

      $scope.stopPropagation = function ($event) {
        console.dir($event);
        alert('ok');
        $event.stopPropagation();
      };

      $scope.showAddContactForm = function () {
        console.log('add contact');
        $scope.popover.hide();
        $state.go('tab.contact.add');
      };

      $scope.chats = Chats.all();
      $scope.remove = function (chat) {
        //elem.hidden();
        //alert(JSON.stringify(event.target));
        $('#chat_item_' + chat.id).remove();
        Chats.remove(chat);
      };
    })
    .controller('ContactDetailCtrl', function ($scope, $stateParams, Chats, $state) {
      $scope.chat = Chats.get($stateParams.chatId);

      // 联系人信息
      $scope.contactInfo = {
        id: 1001,
        avatar: 'img/ben.png',
        name: '徐可',
        basic: [{
          'title': '居住地',
          'val': '江苏南京'
        }, {
          'title': '公司',
          'val': '三六五网络'
        }, {
          'title': '职位',
          'val': '研发工程师'
        }, {
          'title': '行业',
          'val': '计算机/互联网'
        }],
        intro: 'hello, where where',
        contacts: [
          {
            type: 1,
            desc: '电话',
            account: '15600063221',
            icon: 'ion-ios-telephone'
          }, {
            type: 2,
            desc: '微信',
            account: 'michaelhsuke',
            icon: 'ion-chatbubbles'
          }, {
            type: 3,
            desc: 'QQ',
            account: '254182535',
            icon: 'ion-chatbubbles'
          }, {
            type: 4,
            desc: '微博',
            account: 'michael.hsu.ke@gmail.com',
            icon: 'ion-ios-world'
          }
        ]
      };

      $scope.backContactList = function () {
        $state.go('tab.contact.list');
      };

      $scope.openWeibo = function () {
        alert('good');
        var ref = cordova.InAppBrowser.open('http://weibo.com', '_system', 'location=yes');
        alert(ref);
      };
    })
    .controller('ContactDocumentCtrl', ['$scope', '$ionicHistory', function ($scope, $ionicHistory) {
      $scope.back2Parent = function () {
        $ionicHistory.goBack();
      };

      $scope.works = [
        {
          'title': '研发工程师',
          'company': '翼拍网路',
          'startDate': '2015/08',
          'endDate': '现在',
          'logo': 'img/t.jpg',
          'desc': '“脱欧”的公投已经结束，当然这还不是最终的结果，因为还需要一定的法律论证，从而能够将公投的结果作为最后的政策实施。全面退出欧盟后，英国至少需要花费几年的时间才能来重新完善其与单个欧盟成员国之间的规则和协议。'
        }, {
          'title': '研发工程师',
          'company': '广联达软件',
          'startDate': '2014/07',
          'endDate': '2015/05',
          'logo': 'img/one+.png',
          'desc': '有这样一群人，他们在与死神拼斗的急诊“前线”，忙时只能蹲在角落吃两口饭；他们在与病魔对抗的手术台，一站十几个小时……365天无休，被人埋怨斥责，甚至遭暴力伤害，却依然为我们与疾病苦战！今天，中国医师节，为所有救死扶伤的医生护士，转！致敬！'
        }
      ];

      $scope.openLink = function () {
        console.log('hello');
        //alert('hello');
        //window.open('http://weibo.com', '_system');
        //alert('world');
      };
    }])
    .controller('AccountCtrl', function ($scope, $ionicModal, $ionicActionSheet, $state) {
      $scope.gotoPage = function (page) {
        $state.go(page);
      };

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

      $scope.showActionSheet = function () {
        $ionicActionSheet.show({
          //titleText: 'ActionSheet Example',
          buttons: [
            {
              text: '从相册中选择'
            },
            {
              text: '拍照'
            }
          ],
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

      $scope.logOut = function () {
        $state.go('signin')
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
    })
  // 登录控制器
    .controller('SignInCtrl', ['$scope', '$state', '$ionicPopover', 'UserService', 'Hammer', function ($scope, $state, $ionicPopover, UserService, Hammer) {
      console.log(UserService.getUsername());
      console.log('inject');  // todo
      console.dir(Hammer);  // todo
      UserService.setUsername('helloworld');
      console.log(UserService.getUsername());

      var touchPad = document.getElementById('touch_pad');
      var mc = new Hammer.Manager(touchPad);
      var Tap = new Hammer.Tap({
        taps: 1
      });
      var Pinch = new Hammer.Pinch();
      var Rotate = new Hammer.Rotate();


      //mc.add(Tap);
      //mc.add(Pinch);
      mc.add(Rotate);

      //mc.on('tap', function(e) {
      //  alert('tap event occurred');
      //});
      //
      //mc.on('pinch', function(e) {
      //  alert('pinch event occurred.');
      //});

      //mc.on('rotate', function(e) {
      //  alert('rotate event occurred.');
      //});

      mc.on('rotatemove', function (e) {
        // do something cool
        //var rotation = currentRotation + Math.round(liveScale * e.rotation);
        //$.Velocity.hook($stage, 'rotateZ', rotation + 'deg');
        alert('rotatemove');
      });
      mc.on('rotateend', function (e) {
        // cache the rotation
        //currentRotation += Math.round(e.rotation);
        alert('rotateend');
      });
      // above is test code
      $scope.signIn = function (user) {
        console.log('Sign-In', user);
        $state.go('tab.home');
      };
    }])
    .controller('TabCtrl', function ($scope) {
      console.log('Now in tab controller');
      $scope.tabList = ['a', 'b', 'c'];
    })
    .controller('ContactAddFormCtrl', ['$scope', '$state', '$ionicTabsDelegate', '$ionicHistory', '$ionicActionSheet', 'Upload', '$document', '$window', function ($scope, $state, $ionicTabsDelegate, $ionicHistory, $ionicActionSheet, Upload, $document, $window) {
      // 窗口的宽度与高度
      $scope.windowWidth = $window.innerWidth;
      $scope.windowHeight = $window.innerHeight;

      $scope.fileChanged = function (e) {
        var files = e.target.files;
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = function (e) {
          $scope.imgSrc = this.result;
          $scope.$apply();
        };

        fileReader.onloadend = function (e) {
          $scope.$apply();
        };
      };

      $scope.clear = function () {
        $scope.imageCropStep = 1;
        delete $scope.imgSrc;
        delete $scope.result;
        delete $scope.resultBlob;
      };

      $scope.uploadChange = function (files, file) {
        var img = new Image();
        var fileReader = new FileReader();
        var ratio = 1;
        var width = 100;
        fileReader.onload = function (e) {
          img.src = fileReader.result;
        };
        fileReader.readAsDataURL(file);

        img.onload = function () {
          ratio = this.width / this.height;

          var width = $window.innerWidth;
          var height = width / ratio;
          var cropArea = $document.find('#crop_area');
          var canvas = $document.find('#crop_area canvas');
          cropArea.css('width', width + 'px');
          cropArea.css('height', height + 'px');

          if (this.width > width) {
            canvas.css('width', width + 'px');
            canvas.css('height', height + 'px');
          }
        };
      };

      // upload on file select or drop
      $scope.upload = function (file) {
        console.dir(file);  // todo
        $scope.file = file;
        Upload.upload({
          url: 'upload/url',
          data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
          console.log('Error status: ' + resp.status);
        }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
      };

      $scope.sayHello = function () {
        alert('hello');
      };

      $scope.backContacts = function () {
        $state.go('tab.contact.list');
      };

      $scope.addContactDone = function () {
        console.log('add contact done');
      };


      $scope.changePhoto = function () {
        window.location.href = '#/tab/avatar';
      };

      $scope.triggerUploadPhoto = function () {
        $ionicActionSheet.show({
          buttons: [
            {
              text: '从相册中选择'
            },
            {
              text: '拍照'
            }
          ],
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
    }])
    .controller('EditProfileCtrl', function ($scope, $state) {
      $scope.editable = false;

      $scope.basicEditable = false;  // 基本资料是否处于可编辑状态
      $scope.contactsEditable = false;  // 联系方式是否处于可编辑状态

      $scope.changeBasicEditable = function() {
        $scope.basicEditable = !$scope.basicEditable;
      };

      $scope.changeContactsEditable = function() {
        $scope.contactsEditable = !$scope.contactsEditable;
      };

      // 联系人信息
      $scope.contactInfo = {
        id: 1001,
        avatar: 'img/ben.png',
        name: '徐可',
        basic: [{
          'title': '居住地',
          'val': '江苏南京'
        }, {
          'title': '公司',
          'val': '三六五网络'
        }, {
          'title': '职位',
          'val': '研发工程师'
        }, {
          'title': '行业',
          'val': '计算机/互联网'
        }],
        intro: '码农界的小学生',
        contacts: [
          {
            type: 1,
            desc: '电话',
            account: '15600063221',
            icon: 'ion-ios-telephone'
          }, {
            type: 2,
            desc: '微信',
            account: 'michaelhsuke',
            icon: 'ion-chatbubbles'
          }, {
            type: 3,
            desc: 'QQ',
            account: '254182535',
            icon: 'ion-chatbubbles'
          }, {
            type: 4,
            desc: '微博',
            account: 'michael.hsu.ke@gmail.com',
            icon: 'ion-ios-world'
          }
        ]
      };

      // 返回到设置主界面
      $scope.backSettings = function () {
        $state.go('tab.settings.options');
      };

      $scope.gotoPage = function (page) {
        $state.go(page);
      };
    })
    .controller('EditAvatarCtrl', ['$scope', '$state', function($scope, $state) {
      // 返回到设置主界面
      $scope.backSettings = function () {
        $state.go('tab.settings.options');
      };

    }])
    .controller('EditDocumentCtrl', ['$scope', '$state', function($scope, $state) {
      // 返回到设置主界面
      $scope.backSettings = function () {
        $state.go('tab.settings.options');
      };

      // 初识界面是不可以编辑
      $scope.worksEditable = false;
      $scope.changeWorksEditable = function() {
        $scope.worksEditable = !$scope.worksEditable;
      };

      // 工作经历信息
      $scope.works = [
        {
          'title': '研发工程师',
          'company': '翼拍网路',
          'startDate': '2015/08',
          'endDate': '现在',
          'logo': 'img/t.jpg',
          'desc': '“脱欧”的公投已经结束，当然这还不是最终的结果，因为还需要一定的法律论证，从而能够将公投的结果作为最后的政策实施。全面退出欧盟后，英国至少需要花费几年的时间才能来重新完善其与单个欧盟成员国之间的规则和协议。'
        }, {
          'title': '研发工程师',
          'company': '广联达软件',
          'startDate': '2014/07',
          'endDate': '2015/05',
          'logo': 'img/one+.png',
          'desc': '有这样一群人，他们在与死神拼斗的急诊“前线”，忙时只能蹲在角落吃两口饭；他们在与病魔对抗的手术台，一站十几个小时……365天无休，被人埋怨斥责，甚至遭暴力伤害，却依然为我们与疾病苦战！今天，中国医师节，为所有救死扶伤的医生护士，转！致敬！'
        }
      ];

      // 针对每条工作记录的是否可编辑判断
      $scope.workEditableArr = [];
      for (var i = 0; i < $scope.works.length; i++) {
        $scope.workEditableArr[i] = false;
      }

      $scope.changeWorkEditableArr = function (index) {
        $scope.workEditableArr[index] = !$scope.workEditableArr[index];
      };

    }]);
