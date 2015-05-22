(function () {
  'use strict';

  angular
    .module('directives')
    .directive('magicBall', magicBallDirective);

    ///////////////////////

    magicBallDirective.$inject = ['$timeout', '$window'];
    function magicBallDirective($timeout, $window) {
      var directive = {
        restrict: "E",
        templateUrl: "app/components/magicBall/magicball.html",
        link: link
      };
      return directive;

      function link(scope, element, attrs) {
        console.log(element);
        console.log(element[0].scrollHeight);
        element.css({
          'display': 'block',
          'width': '200px',
          'height': '200px',
          'background-color': '#3b4ba3',
          'border-radius': '50%',
          'position': 'absolute',
          'top': '10',
          'left': '10'
        });

        element.on('click', onClickEvent);
        element.on('$destroy', onElementDestroy);
        scope.$on('$destroy', onScopeDestroy);

        ///////////////////////////////////////

        function onClickEvent(event) {
          event.preventDefault();
          var newTop = Math.floor(Math.random() * ($window.innerHeight - 200)) + 1;
          var newLeft = Math.floor(Math.random() * ($window.innerWidth - 200)) + 1;
          element.css({
            'display': 'block',
            'background-color': getRandomColor(),
            'border-radius': Math.floor(Math.random() * 50) + 1 + '%',
            'top': newTop + 'px',
            'left': newLeft + 'px'
          });
        }

        function onElementDestroy() {
          console.log('magicball element destroy');
        }

        function onScopeDestroy() {
          console.log('magicball scrope destroy');
        }

        function getRandomColor() {
          var letters = '0123456789ABCDEF'.split('');
          var color = '#';
          for (var i = 0; i < 6; i++ ) {
              color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }

      }

    }

}());