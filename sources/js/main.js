(function() {
    Barba.Pjax.start();

    let clicked = null;

    Barba.Dispatcher.on('linkClicked', function(element) {
        clicked = element;
    });

    const HideShowTransition = Barba.BaseTransition.extend({
        start: function() {
            Promise
                .all([this.newContainerLoading, this.increaseWidth()])
                .then(this.finish.bind(this));
        },

        increaseWidth: function() {
            return new Promise((resolve) => {
                const items = Array.from(document.querySelectorAll('.content__item'));
                items.forEach(item => {
                    if (item !== clicked) {
                        item.classList.remove('content__item_opened');
                        item.classList.add('content__item_closed');
                    }
                });
                clicked.classList.add('content__item_opened');
                clicked.addEventListener('transitionend', e => resolve());
            });
        },
        
        finish: function() {
            document.body.scrollTop = 0;
            this.done();
        }
    });

    Barba.Pjax.getTransition = function() {
        return HideShowTransition;
    };
}());