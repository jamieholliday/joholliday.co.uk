window.addEventListener('load', function() {
    'use strict';
    var events,
        evtArr,
        checkVisibility,
        scrollCb,
        isElementInViewport,
        showElement;

    checkVisibility = function(arr) {
        var visitibility;

        arr.forEach(function(item) {
            if(isElementInViewport(item.el)) {
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

    isElementInViewport = function(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
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
