
export function rateButtonScript() {
    let rateButtons = document.querySelectorAll(".ratingRadio");
    rateButtons.forEach(e => {
        e.querySelectorAll(".ratingRadio__label").forEach(ee => {
            ee.onclick = rateButtonClickHandler;
        });
    });

    function rateButtonClickHandler(event) {
        let curIndexNumberOfStar = event.currentTarget.dataset.indexNumber;
        let stars = event.currentTarget.parentElement;
        let test1 = Array.from(stars.querySelectorAll(".ratingRadio__label"));

        let test2 = test1.filter(e => e.dataset.indexNumber < curIndexNumberOfStar);
        test2.forEach(e => {
            let starInput = e.querySelector(".ratingRadio__input");
            starInput.className = "ratingRadio__input";//сбросили классы модификаторы
        });

        let test3 = test1.filter(e => e.dataset.indexNumber > curIndexNumberOfStar);
        test3.forEach(e => {
            let starInput = e.querySelector(".ratingRadio__input");
            starInput.className = "ratingRadio__input ratingRadio__input_unchecked";
        });
    }
}