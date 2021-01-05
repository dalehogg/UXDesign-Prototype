window.addEventListener('load', function(){

var box = null;

var mouse = {
  MouseX: 0,
  MouseY: 0,
  mouseStartX: 0,
  mouseStartY: 0
};

var count = 1;
var boxCount = 1;
var circleCount = 1;
var boxList = [];
var boxArrayGroup = [];
var boxData;
var boxPastSelect = [];

var reversedNum = [];

var boxData;
var circleData;

var drawnItemData = {};
var rect;

var boxDrawButton = document.querySelector('.boxActiveButton');
var circleDrawButton = document.querySelector('.circleActiveButton');
var arrangeTop = document.querySelector('.arrangeTopButton');
var arrangeTopOne = document.querySelector('.arrangeTopOne');
var arrangeBottom = document.querySelector('.arrangeBottomButton');
var arrangeBottomOne = document.querySelector('.arrangeBottomOne');
var outputX = document.querySelector('.outputX');
var outputY = document.querySelector('.outputY');
var outputName = document.querySelector('.outputName');
var layerOutput = document.querySelector('.layerOutput');
var drawnItem = document.querySelectorAll('.drawnItem');
var selectedItem = document.querySelectorAll('.selectedDiv');
var perfectCircleToggle = document.querySelector('.perfectCircleToggle');
var lineY = document.querySelector('.lineY');
var lineX = document.querySelector('.lineX');


boxDrawButton.addEventListener('click', function(){
    boxDrawButton.classList.toggle('shadowInsetButton');
    circleDrawButton.classList.remove('shadowInsetButton');
    return initiatorBoxDraw(document.getElementById('boxDrawLayer'));
});
circleDrawButton.addEventListener('click', function(){
    circleDrawButton.classList.toggle('shadowInsetButton');
    boxDrawButton.classList.remove('shadowInsetButton');
    return initiatorBoxDraw(document.getElementById('boxDrawLayer'));
});
perfectCircleToggle.addEventListener('click', function(){
    perfectCircleToggle.classList.toggle('shadowInsetButton');
})

    function dragNow(){
          var el = document.querySelectorAll('.drawnItem');
          for (i = 0; i < el.length; i++){
            el[i].addEventListener('mousedown', function(e) {
              var offsetX = e.clientX - parseInt(window.getComputedStyle(this).left);
              var offsetY = e.clientY - parseInt(window.getComputedStyle(this).top);
              var selectedMoveable = this;
              function mouseMoveHandler(e) {
                var resetLayer = document.querySelector('.resetLayer');
                dynamicData = resetLayer.getBoundingClientRect();

                outputX.innerHTML = dynamicData.x;
                outputY.innerHTML = dynamicData.y;
                selectedMoveable.style.top = (e.clientY - offsetY) + 'px';
                selectedMoveable.style.left = (e.clientX - offsetX) + 'px';

                var staticObjSelectedData = drawnItemData[selectedMoveable.classList[i]]

                var updatedSelectedStaticObjX = staticObjSelectedData.x = dynamicData.x
                var updatedSelectedStaticObjY = staticObjSelectedData.y = dynamicData.y

                const changed = Object.values(drawnItemData)
                const iterator = changed.values();

                var xDataPushed = [];
                var yDataPushed = [];
                var YOtherSideDataPushed = [];
                var XOtherSideDataPushed = [];

                for (const value of iterator) {

                  xDataPushed.push(value.x);
                  yDataPushed.push(value.y);

                  var alignYRight = value.right;
                  var alignYLeft = value.left;

                  var alignXTop = value.top;
                  var alignXBottom = value.bottom;
                    // GETTING THE LEFT VALUE + WIDTH VALUE
                    YOtherSideDataPushed.push(alignYRight);
                    YOtherSideDataPushed.push(alignYLeft);

                    XOtherSideDataPushed.push(alignXTop);
                    XOtherSideDataPushed.push(alignXBottom);


                  var filterCompY = YOtherSideDataPushed.filter((e, i, a) => a.indexOf(e) !== i);
                  var filterCompX = XOtherSideDataPushed.filter((e, i, a) => a.indexOf(e) !== i);

                  if (filterCompY === undefined || filterCompY.length == 0) {
                      lineY.style.display = 'none';
                  } else {
                      lineY.style.display = 'block';
                  }
                  if (filterCompX === undefined || filterCompX.length == 0) {
                      lineX.style.display = 'none';
                  } else {
                      lineX.style.display = 'block';
                  }

                  var lineYStringConv = filterCompY.toString();
                  var lineXStringConv = filterCompX.toString();

                  lineY.style.left = lineYStringConv + 'px';
                  lineX.style.top = lineXStringConv + 'px';

                }

              }

              // Release moving
              function reset() {
                window.removeEventListener('mousemove', mouseMoveHandler);
                window.removeEventListener('mouseup', reset);
                // let p = document.createElement("div");
                // document.body.appendChild(p);
              }
              // Activate click and drag and call reset when mouseup
              window.addEventListener('mousemove', mouseMoveHandler);
              window.addEventListener('mouseup', reset);
            });
          }

    };

    var original = document.querySelectorAll('.selectedDiv')[0];

    function duplicate() {
        var clone = original.cloneNode(true); // "deep" clone
        clone.id = "duplicated";
        // or clone.id = ""; if the divs don't need an ID
        original.parentNode.appendChild(clone);
    }

    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 8) {
            $('.selectedDiv').remove();
        }
        if (event.keyCode = 17 && event.keyCode === 67) {
            console.log('dddddddd');
            duplicate();
        }
    });





    function initiatorBoxDraw(canvas) {
        var boxButtonActivate = boxDrawButton.classList.contains('shadowInsetButton');
        var circleButtonActivate = circleDrawButton.classList.contains('shadowInsetButton');
        var recta = document.querySelectorAll('.drawnItem');
        var boxDrawLayer = document.querySelector('#boxDrawLayer');

        document.addEventListener('keydown', function(event) {
            var key_code = event.keyCode;
            if (key_code === 8) {

            }
        });

        if (boxDrawButton.classList.contains('shadowInsetButton') || circleDrawButton.classList.contains('shadowInsetButton')){
            $('.drawnItem').addClass('userNone');
        } else {
            $('.drawnItem').removeClass('userNone');
            $('.drawnItem').mousedown(function(){
                $('.drawnItem').removeClass('resetLayer');
                $(this).addClass('resetLayer');
                $('.drawnItem').removeClass('selectedDiv');
                $(this).addClass('selectedDiv');
                outputName.innerHTML = this.classList[2];

                var layerOutputUniqueClass = document.getElementsByClassName(this.classList[2]);
                for (i = 0; i < layerOutputUniqueClass.length; i++){
                  $('.layer').removeClass('selectedDiv');
                  layerOutputUniqueClass[i].classList.add('selectedDiv');
                }

            });
        };

        if (boxButtonActivate || circleButtonActivate){
            canvas.style.cursor = "crosshair";
        } else {
            dragNow();
            canvas.style.cursor = "default";
        }

        function setMousePosition(e) {
            if (e.pageX) { //Moz // Always going to be true
                mouse.MouseX = e.pageX + window.pageXOffset;
                mouse.MouseY = e.pageY + window.pageYOffset;
            };
        };

        $('.drawnItem').mouseover(function(){
            $('.drawnItem').css("cursor", "grab");
        });
        $('.drawnItem').mousedown(function(){
            $('.drawnItem').css("cursor", "grabbing");
        });
        $('.drawnItem').mouseup(function(){
            $('.drawnItem').css("cursor", "grab");
        });

        var boxArrayDefine = boxArrayGroup.slice(-1)[0];

        function setZIndex(){
            boxArrayDefine.forEach(function(div,index){
                div.style.zIndex = index;
            });
        };

        arrangeBottomOne.addEventListener('click', function(){
            for (i = 0; i < recta.length; i++){
                for (i = 0; i < boxArrayDefine.length; i++){
                    var selectedIndexBottomOne = $(boxArrayDefine).index($('.resetLayer'));

                    var selectedIndexBefore = selectedIndexBottomOne - 1;

                    console.log(selectedIndexBefore);

                    var selectedIndexDomItem = $(boxArrayDefine).get(selectedIndexBottomOne);

                    var selectedIndexDomItemBefore = $(boxArrayDefine).get(selectedIndexBottomOne - 1);

                    console.log(selectedIndexDomItemBefore);

                };

                if (selectedIndexBefore < 0) {
                    return 0;
                }else{
                    boxArrayDefine.splice(selectedIndexBottomOne, 1, selectedIndexDomItemBefore);
                    boxArrayDefine.splice(selectedIndexBefore, 1, selectedIndexDomItem);

                    return setZIndex();
                };
            };
        });

        arrangeTopOne.addEventListener('click', function(){
            for (i = 0; i < recta.length; i++){

                for (i = 0; i < boxArrayDefine.length; i++){
                    var selectedIndexTopOne = $(boxArrayDefine).index($('.resetLayer'));

                    var selectedIndexAfter = selectedIndexTopOne + 1;

                    var selectedIndexDomItem = $(boxArrayDefine).get(selectedIndexTopOne);

                    var selectedIndexDomItemAfter = $(boxArrayDefine).get(selectedIndexTopOne + 1);

                };

                // Logic for stopping the concatination on the array
                if (selectedIndexAfter > boxArrayDefine.length - 1) {
                    return 0;
                }else{
                    boxArrayDefine.splice(selectedIndexTopOne, 1, selectedIndexDomItemAfter);
                    boxArrayDefine.splice(selectedIndexAfter, 1, selectedIndexDomItem);

                    return setZIndex();
                };
            };
        });

        arrangeTop.addEventListener('click', function(){

            for (i = 0; i < recta.length; i++){

                var selectedIndexTop = $(boxArrayDefine).index($('.resetLayer'));

                boxArrayDefine.push(boxArrayDefine.splice(selectedIndexTop, 1)[0]);

                return setZIndex();

            };
            return 0;
        });

        arrangeBottom.addEventListener('click', function(){
            for (i = 0; i < recta.length; i++){
                if (recta[i].classList.contains('resetLayer')){
                    var selectedIndexBottom = $(boxArrayDefine).index(recta[i]);
                    boxArrayDefine.unshift(boxArrayDefine.splice(selectedIndexBottom, 1)[0]);
                    return setZIndex();
                }
            };
            return 0;
        });


        var layer;
        canvas.addEventListener('mousedown', function(e) {
          function boxFunction() {
            box.style.height == mouse.MouseX;
            box.style.width == mouse.MouseY;
          }
          function circleFunction() {
            box.style.borderRadius = '50%';
            console.log('hey');
          }
            if (!boxDrawButton.classList.contains('shadowInsetButton') && !circleDrawButton.classList.contains('shadowInsetButton')){
                return 0;
            }
            if (box != null) {
                return 0;
            } else {
                mouse.mouseStartX = mouse.MouseX;
                mouse.mouseStartY = mouse.MouseY;
                box = document.createElement('div');
                box.className = 'drawnItem';
                var all = document.querySelectorAll(box.classList[1]);
                layer = document.createElement('div');
                box.classList.add('drawnItemBorder');

                if (boxDrawButton.classList.contains('shadowInsetButton')){
                  boxFunction();
                  box.classList.add('box-' + boxCount++);
                  box.classList.add('rectangle');
                  // box.id = 'box-' + boxCount++;
                }
                if (circleDrawButton.classList.contains('shadowInsetButton')){
                  circleFunction();
                  box.classList.add('circle-' + circleCount++);
                  box.classList.add('circle');
                  // box.id = 'circle-' + circleCount++;
                }
                layer.className = box.classList[2] + ' layer';
                layer.innerHTML = box.classList[2];
                if (box.classList.contains('.resetLayer')){
                  layer.classList.add(box.classList[2] + 'resetLayer');
                }
                canvas.appendChild(box);


                // Vital logic for pushing up/down array by one and top and bottom
                // Setting the initial z-index per item drawn
                $(".drawnItem").addClass(function(i) {
                    boxList.push($('.drawnItem'));

                    var rectaToArray = $('.drawnItem').toArray();

                    boxArrayGroup.push(rectaToArray);

                    var boxArrayInitialDefine = boxArrayGroup.slice(-1)[0];

                    var boxArrayDefined = boxArrayInitialDefine.slice(-1)[0];

                    var boxLastIndex = $(boxArrayDefined).index('.drawnItem');

                    box.classList.add('index-' + boxLastIndex);

                    $(box).css('z-index', boxLastIndex);

                    return 0;
                });
            }
        });

        canvas.addEventListener('mouseup', function(e){
          // box.style.height = box.style.width;
          if (perfectCircleToggle.classList.contains('shadowInsetButton')){
            box.style.height = box.style.width;
          };

          var rectangle = document.querySelectorAll('.rectangle');
          var circle = document.querySelectorAll('.circle');

          for (i = 0; i < rectangle.length; i++){
            rectangleData = rectangle[i].getBoundingClientRect();
          }
          for (i = 0; i < circle.length; i++){
            circleData = circle[i].getBoundingClientRect();
          }
          boxData = rectangleData;
          roundData = circleData;

          var boxCountDownOne = boxCount - 1;
          var circleCountDownOne = circleCount - 1;

          if (boxDrawButton.classList.contains('shadowInsetButton')){
            drawnItemData['box-' + boxCountDownOne] = boxData;
          } else if (circleDrawButton.classList.contains('shadowInsetButton')){
            drawnItemData['circle-' + circleCountDownOne] = circleData;
          }

          box = null;
          layerOutput.appendChild(layer);
          count++;

          return 0;
        });

        canvas.addEventListener('mousemove', function(e) {
            setMousePosition(e);
            if (box !== null) {

              var h = document.querySelectorAll('.drawnItem');
              for (i = 0; i < h.length; i++){
                var rect = h[i].getBoundingClientRect();

              }
                box.style.width = Math.abs(mouse.MouseX - mouse.mouseStartX) + 'px'; // Set box width to absolute number of mouse position - mouse's starting position (Removes distance from edge of box to the mouse, would be the same distance between starting position and canvas wall)
                box.style.height = Math.abs(mouse.MouseY - mouse.mouseStartY) + 'px';
                box.style.left = (mouse.MouseX - mouse.mouseStartX < 0) ? mouse.MouseX + 'px' : mouse.mouseStartX + 'px'; // If previous statements (mouse.x - mouse.startX) is less than 0 (in other words, goes into negative axis), add mouse.x as pixels (determines what happens when it goes into the negatives of the x and y axis)
                box.style.top = (mouse.MouseY - mouse.mouseStartY < 0) ? mouse.MouseY + 'px' : mouse.mouseStartY + 'px'; // Determines how much change there should be when switching from negative and positive axis
            }
        });
    }
});
