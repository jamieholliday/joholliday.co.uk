window.addEventListener('load', function() {
    'use strict';
    var events,
        evtArr,
        checkVisibility,
        scrollCb,
        shouldElementByShown,
        showElement;


    checkVisibility = function(arr) {
        var visitibility;

        arr.forEach(function(item) {
            if(shouldElementByShown(item.el)) {
                showElement(item.el);
                item.visible = true;
            }
        });

        visitibility = arr.filter(function(item) {
            return item.visible === false;
        });

        if(visitibility.length === 0) {
            window.removeEventListener('scroll',scrollCb);
        }
    };

    showElement = function(el) {
        el.classList.remove('ishidden');
    };

    shouldElementByShown = function(el) {
        var rect = el.getBoundingClientRect();

        return rect.top <= window.innerHeight / 1.5;
    };

    scrollCb = function() {
        checkVisibility(evtArr);
    };

    events = document.querySelectorAll('.event-container');
    evtArr = [].slice.call(events).map(function(el) {
        return {
            el: el,
            visible: false
        };
    });

    window.addEventListener('scroll', scrollCb);

    //fade in elements that should be visible right away
    checkVisibility(evtArr);
});
