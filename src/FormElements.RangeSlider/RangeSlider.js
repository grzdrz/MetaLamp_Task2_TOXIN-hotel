//функции расчета пропорциональных друг другу значений инпутов и X координат ползунков.
//x1_input = (d_MaxMin_input * x_slider) / d_MaxMin_slider + xMin_input;
//x1_slider = ((x_input - xMin_input) * d_MaxMin_slider) / d_MaxMin_input;
//x2_input = (d_MaxMin_input * x_slider) / d_MaxMin_slider + xMin_input;
//x2_slider = ((x_input - xMin_input) * d_MaxMin_slider) / d_MaxMin_input + slider_width;
//где: 
//  x_input - текущее значение инпута,
//  x_slider - текущая X координата ползунка относительно левой границы контейнера(левый марджин),
//  xMin_input/xMax_input - минимальные/максимальные значения инпутов,
//  xMin_slider/xMax_slider - минимальные/максимальные X координаты ползунков,
//  d_... - приращения соответствующих величин

//Вышеописанные формулы расчета устроены так что бы соответствовать следующим условиям:
// 1)Значение инпута соответсвующего 2му ползунку расчитывается относительно визуального положения левой границы 2го ползунка.
// 2)Значение инпута соответсвующего 1му ползунку расчитывается относительно визуального положения правой границы 1го ползунка.
//Это нужно чтобы при смыкании ближайших друг к другу границ ползунков их соответствующие значения инпутов были равны
//(т.е. при смыкании ползунков дельта инпут === 0). При этом если развести ползунки по крайним границам, то значения их
//соответствующих инпутов будут равны крайним значениям инпутов. 

//На деле чтобы достичь такого эффекта расчет пропорций ведется от левой границы 1го ползунка и 
//левой границы 2го ползунка минус ширина ползунка.


export function rangeSliderScript() {
    let rangeSliders = document.querySelectorAll(".range-slider");
    let targetMaxValue;
    let targetMinValue;
    rangeSliders.forEach(e => {
        let targetFirstSlider = e.querySelector(".range-slider__first-slider");
        let targetLastSlider = e.querySelector(".range-slider__last-slider");
        let targetFirstSliderBorder = e.querySelector(".range-slider__first-slider-outside");
        let targetLastSliderBorder = e.querySelector(".range-slider__last-slider-outside");

        targetFirstSlider.ondragstart = function () {
            return false;
        };
        targetLastSlider.ondragstart = function () {
            return false;
        };

        targetFirstSlider.addEventListener("mousedown", sliderMouseDown);
        targetLastSlider.addEventListener("mousedown", sliderMouseDown);

        targetFirstSlider.addEventListener("touchstart", sliderMouseDown);
        targetLastSlider.addEventListener("touchstart", sliderMouseDown);



        let firstInput = e.querySelector(".range-slider__first-input");
        let lastInput = e.querySelector(".range-slider__last-input");
        let inputMaxValue = Number.parseInt(e.dataset.maxValue);
        let inputMinValue = Number.parseInt(e.dataset.minValue);

        let slidersContainer = e.querySelector(".range-slider__slider-container");
        let slidersFilledStrip = e.querySelector(".range-slider__slider-body-filled");
        let firstSlider = e.querySelector(".range-slider__first-slider");
        let lastSlider = e.querySelector(".range-slider__last-slider");
        let slidersContainerBoundingCoords = slidersContainer.getBoundingClientRect();
        let firstSliderBoundingCoords = firstSlider.getBoundingClientRect();
        let sliderWidth = firstSliderBoundingCoords.width;

        let dSliderInputFullValue = Number.parseInt(inputMaxValue) - Number.parseInt(inputMinValue);
        let dSliderStripFullValue = slidersContainerBoundingCoords.width - sliderWidth * 2;

        let x1_slider = ((firstInput.value - inputMinValue) * dSliderStripFullValue) / dSliderInputFullValue;
        let x2_slider = (((lastInput.value - inputMinValue) * dSliderStripFullValue) / dSliderInputFullValue) + sliderWidth;

        firstSlider.style.marginLeft = x1_slider + "px";
        lastSlider.style.marginLeft = x2_slider + "px";
        targetFirstSliderBorder.style.marginLeft = x1_slider - 2 + "px";
        targetLastSliderBorder.style.marginLeft = x2_slider - 2 + "px";
        slidersFilledStrip.style.width = x2_slider - x1_slider + "px";
        slidersFilledStrip.style.marginLeft = x1_slider + sliderWidth / 2 + "px";
    });


    //let widthTest =
    function sliderMouseDown(event) {
        let cursorXPos;
        if (event.changedTouches) cursorXPos = event.changedTouches[0].pageX;
        else cursorXPos = event.clientX;

        let targetSlider;
        let otherSlider;
        let targetSliderBorder;
        let otherSliderBorder;
        let targetSliderContainer;
        let targetSliderIndex;
        let targetInput;
        let otherInput;
        let inputMaxValue;
        let inputMinValue;
        let inputsValueRangeInTitle;

        if (event.currentTarget.className) {//чтобы не вылететь при кликах по document
            let classArray = event.currentTarget.className.split(/\s/i);
            if (classArray.includes("range-slider__first-slider")) {
                targetSlider = event.currentTarget;
                targetSliderIndex = 0;

                otherSlider = targetSlider.parentElement.querySelector(".range-slider__last-slider");

                targetInput = targetSlider.parentElement.querySelector(".range-slider__first-input");
                otherInput = targetSlider.parentElement.querySelector(".range-slider__last-input");

                targetSliderBorder = targetSlider.parentElement.querySelector(".range-slider__first-slider-outside");
                otherSliderBorder = targetSlider.parentElement.querySelector(".range-slider__last-slider-outside");
            }
            else if (classArray.includes("range-slider__last-slider")) {
                targetSlider = event.currentTarget;
                targetSliderIndex = 1;

                otherSlider = targetSlider.parentElement.querySelector(".range-slider__first-slider");

                otherInput = targetSlider.parentElement.querySelector(".range-slider__first-input");
                targetInput = targetSlider.parentElement.querySelector(".range-slider__last-input");

                otherSliderBorder = targetSlider.parentElement.querySelector(".range-slider__first-slider-outside");
                targetSliderBorder = targetSlider.parentElement.querySelector(".range-slider__last-slider-outside");
            }
            else return;
        }
        else return;

        targetSliderContainer = targetSlider.parentElement.parentElement;
        inputMaxValue = Number.parseInt(targetSliderContainer.dataset.maxValue);
        inputMinValue = Number.parseInt(targetSliderContainer.dataset.minValue);
        inputsValueRangeInTitle = targetSlider.parentElement.parentElement.querySelector(".range-slider__inputs-value-range");

        let slidersFilledStrip = targetSlider.parentElement.querySelector(".range-slider__slider-body-filled");

        let slidersContainerBoundingCoords = targetSlider.parentElement.getBoundingClientRect();
        let slidersContainerWidth = slidersContainerBoundingCoords.width;

        let targetSliderBoundingCoords = targetSlider.getBoundingClientRect();
        let otherSliderCoordinates = otherSlider.getBoundingClientRect();
        let sliderWidth = targetSliderBoundingCoords.width;

        //расстояние между местом нажатия кнопки мыши внутри бегунка и левым краем бегунка
        let mouseXPosInsideTargetSlider = cursorXPos - targetSliderBoundingCoords.x;


        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
        document.addEventListener("touchmove", mouseMove);
        document.addEventListener("touchend", mouseUp);

        function mouseMove(event) {
            if (event.changedTouches) cursorXPos = event.changedTouches[0].pageX;
            else cursorXPos = event.clientX;

            if (!event.isLastUpdate) {
                //дистанция между левой границей контейнера и левой границей целевого ползунка зависящая от позиции курсора
                let newDeltaXForTargetSlider = Math.round(cursorXPos - slidersContainerBoundingCoords.x - mouseXPosInsideTargetSlider);
                targetSlider.style.marginLeft = newDeltaXForTargetSlider + "px";
                //проверка на выход за граничные значения
                if (newDeltaXForTargetSlider < 0)
                    targetSlider.style.marginLeft = "0px";
                else if (newDeltaXForTargetSlider + sliderWidth > slidersContainerWidth)
                    targetSlider.style.marginLeft = slidersContainerWidth - sliderWidth + "px";
            }

            //обновленные координаты целевого ползунка после изменения позиции курсора
            let newTargetSliderBoundingCoords = targetSlider.getBoundingClientRect();
            if (targetSliderIndex === 0) {//для первого ползунка
                if (newTargetSliderBoundingCoords.x + sliderWidth > otherSliderCoordinates.x)
                    targetSlider.style.marginLeft = otherSliderCoordinates.x - slidersContainerBoundingCoords.x - sliderWidth + "px";
                else {
                    //изменение отступа и размера закрашенной полосы
                    slidersFilledStrip.style.marginLeft = newTargetSliderBoundingCoords.x - slidersContainerBoundingCoords.x + sliderWidth / 2 + "px";
                    slidersFilledStrip.style.width = otherSliderCoordinates.x - newTargetSliderBoundingCoords.x + "px";

                    //запись значения в первый инпут
                    let targetSliderMarginLeft = newTargetSliderBoundingCoords.x - slidersContainerBoundingCoords.x;
                    let maxDistanceBetweenSliders = slidersContainerBoundingCoords.width - newTargetSliderBoundingCoords.width * 2;

                    let maxInputDeltaValue = inputMaxValue - inputMinValue;
                    let newTargetInputValue = Math.round((maxInputDeltaValue * targetSliderMarginLeft) / maxDistanceBetweenSliders + inputMinValue);

                    let temp1 = newTargetInputValue / Number.parseInt(targetSliderContainer.dataset.valueRound);
                    let temp2 = Math.round(temp1);
                    let temp3 = temp2 * Number.parseInt(targetSliderContainer.dataset.valueRound);
                    newTargetInputValue = temp3;

                    targetInput.value = newTargetInputValue;

                    let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
                    let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
                    splitedInputsValueRangeTextInTitle[0] = newTargetInputValue.toString() + targetSliderContainer.dataset.valueType;
                    inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
                    inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
                }
            }
            else if (targetSliderIndex === 1) {//для второго ползунка
                if (newTargetSliderBoundingCoords.x < otherSliderCoordinates.x + sliderWidth)
                    targetSlider.style.marginLeft = otherSliderCoordinates.x - slidersContainerBoundingCoords.x + sliderWidth + "px";
                else {
                    //изменение отступа и размера закрашенной полосы
                    slidersFilledStrip.style.marginLeft = otherSliderCoordinates.x - slidersContainerBoundingCoords.x + sliderWidth / 2 + "px";
                    slidersFilledStrip.style.width = newTargetSliderBoundingCoords.x - otherSliderCoordinates.x + "px";

                    //запись значения во второй инпут
                    let targetSliderMarginLeft = newTargetSliderBoundingCoords.x - slidersContainerBoundingCoords.x - newTargetSliderBoundingCoords.width;
                    let maxDistanceBetweenSliders = slidersContainerBoundingCoords.width - newTargetSliderBoundingCoords.width * 2;

                    let maxInputDeltaValue = inputMaxValue - inputMinValue;
                    let newTargetInputValue = Math.round((maxInputDeltaValue * targetSliderMarginLeft) / maxDistanceBetweenSliders + inputMinValue);

                    let temp1 = newTargetInputValue / Number.parseInt(targetSliderContainer.dataset.valueRound);
                    let temp2 = Math.round(temp1);
                    let temp3 = temp2 * Number.parseInt(targetSliderContainer.dataset.valueRound);
                    newTargetInputValue = temp3;

                    targetInput.value = newTargetInputValue;

                    let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
                    let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
                    splitedInputsValueRangeTextInTitle[2] = newTargetInputValue.toString() + targetSliderContainer.dataset.valueType;
                    inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
                    inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
                }
            }
            targetSliderBorder.style.marginLeft = Number.parseInt(targetSlider.style.marginLeft) - 2 + "px";
            otherSliderBorder.style.marginLeft = Number.parseInt(otherSlider.style.marginLeft) - 2 + "px";
        }

        function mouseUp(event) {
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);
            document.removeEventListener("touchmove", mouseMove);
            document.removeEventListener("touchend", mouseUp);

            mouseMove({ isLastUpdate: true });
        }
    }
}