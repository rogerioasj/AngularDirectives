(function () {
  'use strict';

  angular
    .module('directives')
    .directive('magicBall', magicBallDirective);

    ///////////////////////

    magicBallDirective.$inject = ['$window', '$document'];
    function magicBallDirective($window, $document) {
      var directive = {
        restrict: "E",
        templateUrl: "app/components/magicBall/magicball.html",
        priority: 5,
        link: link
      };
      return directive;

      function link(scope, element, attrs) {
        var startY = 0,
            startX = 0,
            currentY = 0,
            currentX = 0;
        
        element.css({
          'display': 'block',
          'width': scope.vm.size + 'px',
          'height': scope.vm.size + 'px',
          'background-color': getRandomColor(),
          'border-radius': Math.floor(Math.random() * 50) + 1 + '%',
          'position': 'absolute',
          'top': Math.floor(Math.random() * ($window.innerHeight - 200)) + 1 + 'px',
          'left': Math.floor(Math.random() * ($window.innerWidth - 200)) + 1 + 'px',
          'cursor': 'pointer'
        });

        scope.$watch('vm.size', onSizeChange);
        element.on('mousedown', onElementMouseDownEvent);
        element.on('$destroy', onElementDestroy);
        scope.$on('$destroy', onScopeDestroy);

        ///////////////////////////////////////
        
        function onSizeChange(newValue, oldValue) {
          if (newValue === oldValue) return;
          element.css({
            'width': scope.vm.size + 'px',
            'height': scope.vm.size + 'px'         
          });
        }

        function onElementMouseDownEvent(event) {
          event.preventDefault();
          //var newTop = Math.floor(Math.random() * ($window.innerHeight - 200)) + 1;
          //var newLeft = Math.floor(Math.random() * ($window.innerWidth - 200)) + 1;
          element.css({
            'display': 'block',
            'background-color': getRandomColor(),
            'border-radius': Math.floor(Math.random() * 50) + 1 + '%'
            //'top': newTop + 'px',
            //'left': newLeft + 'px'
          });

          startY = (event.pageY - element[0].offsetTop);
          startX = (event.pageX - element[0].offsetLeft);

          $document.on('mousemove', onDocumentMouseMove);
          $document.on('mouseup', onElementMouseUpEvent);
        }
        
        function onElementMouseUpEvent(event) {
          event.preventDefault();
          $document.off('mousemove', onDocumentMouseMove);
          $document.off('mouseup', onElementMouseUpEvent);
        }
        
        function onDocumentMouseMove(event) {         
          event.preventDefault();
          currentY = event.pageY;
          currentX = event.pageX;
          
          //console.log('py:' + currentY + ' ey:' + element[0].offsetTop + ' px:' + currentX + ' ex:' + element[0].offsetLeft);
          
          element.css({
            'top': currentY - startY + 'px',
            'left': currentX - startX + 'px'
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
     
    angular
      .module('directives')
      .directive('magicBall', function magicBall() {
        return {
          retrict: 'E',
          priority: 4,
          link: function (scope, element, attrs) {
            element.css({
              'display': 'block',
              'width': '200px',
              'height': '200px',
              'background-color': 'black'
            });
          }
        }
      });

}());