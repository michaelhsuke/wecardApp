/**
 * Created by xuke on 5/19/16.
 */
angular.module('starter.directives', [])
    .directive('myTouchstart', [function () {
      return function (scope, element, attr) {
        console.dir(attr.myTouchstart);
        console.log(typeof attr.myTouchstart)
        element.on('touchstart', function (event) {
          scope.$apply(function () {
            scope.$eval(attr.myTouchstart);
          });
        });
      };
    }])
    .directive('myTouchend', [function () {
      return function (scope, element, attr) {
        element.on('touchend', function (event) {
          scope.$apply(function () {
            scope.$eval(attr.myTouchend);
          });
        });
      };
    }])
    .directive('detectEvents', function ($document) {
      return {
        link: function (scope, element, attr) {
          var sortTimer,
              touch,
              action,
              diffX,
              diffY,
              endX,
              endY,
              scroll,
              sort,
              startX,
              startY,
              swipe;

          function getCoord(e, c) {
            return /touch/.test(e.type) ? (e.originalEvent || e).changedTouches[0]['page' + c] :
                e['page' + c];
          }

          function testTouch(event) {
            if (event.type == 'touchstart') {
              touch = true;
            } else if (touch) {
              touch = false;
              return false;
            }

            return true;
          }


          function onStart(event) {
            console.log('on start');
            event.stopPropagation();
            //event.preventDefault();
            return;

            if (testTouch(event) && !action) {
              action = true;

              startX = getCoord(event, 'X');
              startY = getCoord(event, 'Y');
              diffX = 0;
              diffY = 0;

              sortTimer = setTimeout(function () {
                sort = true;
              }, 200);

              event.stopPropagation();
            }
          }

          function onMove(event) {
            console.log('on move');
            //event.stopPropagation();
            //event.stopPropagation();
            return;
            if (action) {
              endX = getCoord(event, 'X');
              endY = getCoord(event, 'Y');
              diffX = endX - startX;
              diffY = endY - startY;

              if (!sort && !swipe && !scroll) {
                if (Math.abs(diffY) > 10) {  // scroll
                  scroll = true;
                  $(this).trigger('touchend');
                } else if (Math.abs(diffX) > 7) {
                  swipe = true;
                }
              }

              if (swipe) {
                event.preventDefault();
                // todo handle swipe
              }

              if (sort) {
                event.preventDefault();
                // todo handle sort
              }

              if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
                clearTimeout(sortTimer);
              }

            }
          }

          function onEnd(event) {
            console.log('on end');
            event.stopPropagation();
            return;

            if (action) {
              action = false;

              if (swipe) {
                // handle swipe end
              } else if (sort) {
                // handle sort end
              } else if (!scroll && Math.abs(diffX) < 5 && Math.abs(diffY) < 5) {  // tap
                if (event.type === 'touchend') {
                  event.preventDefault();
                }

                // handle tap
              }

              if (!swipe && !scroll && !sort) {
                $(this).trigger('click');
                console.log('trigger click');
              } else {
                event.stopPropagation();
              }

              swipe = false;
              sort = false;
              scroll = false;
              clearTimeout(sortTimer);

              if (event.type == 'mouseup') {
                // todo mouse up
              }

            }
          }

          element
              .on('touchstart', onStart)
              .on('touchmove', onMove)
              .on('touchend', onEnd);
        }
      }
    }).
    directive('hideTabBar', function ($timeout) {
      var style = angular.element('<style>').html(
          '.has-tabs.no-tabs:not(.has-tabs-top) { bottom: 0; }\n' +
          '.no-tabs.has-tabs-top { top: 44px; }');
      document.body.appendChild(style[0]);
      return {
        restrict: 'A',
        compile: function (element, attr) {
          var tabBar = document.querySelector('.tab-nav');
          return function ($scope, $element, $attr) {
            var scroll = $element[0].querySelector('.scroll-content');
            $scope.$on('$ionicView.beforeEnter', function () {
              tabBar.classList.add('slide-away');
              scroll.classList.add('no-tabs');
            });
            $scope.$on('$ionicView.beforeLeave', function () {
              tabBar.classList.remove('slide-away');
              scroll.classList.remove('no-tabs')
            });
          }
        }
      };
    });
