WebFontConfig = {
    google: { families: ["Arimo:400", "Inter:400,700,800,900,&display=swap"] }
};

(function(d) {
    var wf = d.createElement('script'),
        s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
})(document);

var Loader = function() {}
Loader.prototype = {
    require: function(scripts, callback) {
        this.loadCount = 0;
        this.totalRequired = scripts.length;
        this.callback = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(scripts[i]);
        }
    },
    loaded: function(evt) {
        this.loadCount++;

        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function(src) {
        var self = this;
        var s = document.createElement('script');
        s.type = "text/javascript";
        s.defer = true;
        s.src = src;
        s.addEventListener('load', function(e) { self.loaded(e); }, false);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(s);
    }
};

var l = new Loader();
l.require([
        '../js/lazy-load.js'
    ],
    function() {

        var callback_loaded = function(element) {
            element.classList.remove('lazy');
            if (element.closest('.lazy-img')) {
                element.closest('.lazy-img').classList.remove('lazy-progress');
            }
            element.classList.add('anim-fade');
        };

        Lazy = new LazyLoad({
            callback_loaded: callback_loaded,
        });
    }
);

document.addEventListener("DOMContentLoaded", function(event) {

    function setCookie(name, value) {
        var expires = "";
        expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    let alertModal = document.querySelector('.cookies-alert');
    let closeAlert = alertModal.querySelector('.hide-alert');
    if (!getCookie('alert')) {
        setTimeout(() => {
            alertModal.classList.add('show');
        }, 1000);
        closeAlert.addEventListener('click', function(e) {
            alertModal.classList.remove('show');
            setCookie('alert', 'alert-show')
        })
    }


    document.body.classList.remove('loading');

    if (document.querySelector('.typewrite')) {
        var TxtType = function(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 1000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };

        TxtType.prototype.tick = function() {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.el.innerHTML = this.txt;

            var that = this;
            var delta = 200 - Math.random() * 100;

            if (this.isDeleting) { delta /= 2; }

            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }

            setTimeout(function() {
                that.tick();
            }, delta);
        };


        var elements = document.getElementsByClassName('typewrite');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        };
    }

    function slideToggle(t, e, o) { 0 === t.clientHeight ? j(t, e, o, !0) : j(t, e, o) }

    function slideUp(t, e, o) { j(t, e, o) }

    function slideDown(t, e, o) { j(t, e, o, !0) }

    function j(t, e, o, i) {
        void 0 === e && (e = 400), void 0 === i && (i = !1), t.style.overflow = "hidden", i && (t.style.display = "block");
        var p, l = window.getComputedStyle(t),
            n = parseFloat(l.getPropertyValue("height")),
            a = parseFloat(l.getPropertyValue("padding-top")),
            s = parseFloat(l.getPropertyValue("padding-bottom")),
            r = parseFloat(l.getPropertyValue("margin-top")),
            d = parseFloat(l.getPropertyValue("margin-bottom")),
            g = n / e,
            y = a / e,
            m = s / e,
            u = r / e,
            h = d / e;
        window.requestAnimationFrame(function l(x) {
            void 0 === p && (p = x);
            var f = x - p;
            i ? (t.style.height = g * f + "px", t.style.paddingTop = y * f + "px", t.style.paddingBottom = m * f + "px", t.style.marginTop = u * f + "px", t.style.marginBottom = h * f + "px") : (t.style.height = n - g * f + "px", t.style.paddingTop = a - y * f + "px", t.style.paddingBottom = s - m * f + "px", t.style.marginTop = r - u * f + "px", t.style.marginBottom = d - h * f + "px"), f >= e ? (t.style.height = "", t.style.paddingTop = "", t.style.paddingBottom = "", t.style.marginTop = "", t.style.marginBottom = "", t.style.overflow = "", i || (t.style.display = "none"), "function" == typeof o && o()) : window.requestAnimationFrame(l)
        })
    }


    let accordeons = document.querySelectorAll('.route-block')
    if (accordeons.length > 0) {
        accordeons.forEach(function(accordeon) {
            accordeon.querySelector('summary').addEventListener('click', function(e) {
                e.preventDefault();
                let panel = accordeon.querySelector('.content');

                if (accordeon.open == false) {
                    accordeon.open = open;
                    slideToggle(panel, 225);
                    accordeon.classList.toggle('open');
                } else {
                    slideToggle(panel, 225);
                    accordeon.classList.toggle('open');

                    setTimeout(() => {
                        accordeon.removeAttribute("open");

                    }, 225);
                }
            });
        });
    }

    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(outer);
        const inner = document.createElement('div');
        outer.appendChild(inner);
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        outer.parentNode.removeChild(outer);
        return scrollbarWidth;
    }
    let header = document.querySelector('.header');
    let menuButton = document.querySelector('.open-nav');
    let menuPanel = document.querySelector('.menu-panel')
    let navContainer = document.querySelector('.header .container');

    function shiftAdd(curentEl) {
        document.body.classList.add('bodylock');
        document.body.style.paddingRight = getScrollbarWidth() + 'px';
        if (curentEl == header) {
            if (curentEl.scrollHeight > window.innerHeight) {
                curentEl.style.paddingRight = '0px';
            } else {
                header.style.paddingRight = getScrollbarWidth() + 'px';
            }
        } else {
            if (curentEl.scrollHeight < window.innerHeight) {
                curentEl.style.paddingRight = '0px';
            } else {
                header.style.paddingRight = getScrollbarWidth() + 'px';
            }
        }

    }

    function shiftRemove() {
        document.body.classList.remove('bodylock');
        document.body.style.paddingRight = '0px';
        header.style.paddingRight = '0px';
    }

    menuButton.addEventListener('click', function(e) {
        if (header.classList.contains('menu-open')) {
            header.classList.add('will-close')
            menuPanel.addEventListener('animationend', function() {
                if (header.classList.contains('will-close', 'menu-open')) {
                    header.classList.remove('will-close', 'menu-open');
                    shiftRemove()
                }
            })
        } else {
            header.classList.add('menu-open');
            shiftAdd(header);
        }
    });


    let modal = document.querySelector('.modal');
    let closeButton = document.querySelector('.hide-modal');
    let modalButtons = document.querySelectorAll('[open-contact]')
    modalButtons.forEach(function(modalButton) {
        modalButton.addEventListener('click', function(e) {
            modalOpen(modal)
        })
    })

    function modalOpen(curentModal) {
        curentModal.classList.add('modal-open')
        shiftAdd(modal);
    }

    function modalClose(curentModal) {
        document.querySelector('.modal.modal-open').classList.remove('modal-open')
    }
    closeButton.addEventListener('click', function(e) {
        modalClose();
        if (!header.classList.contains('menu-open')) {
            setTimeout(() => {
                shiftRemove()
            }, parseFloat(getComputedStyle(modal)["transitionDuration"]) * 1000);
        }
    })


    let customDrops = document.querySelectorAll('.drop-down input');
    let forms = document.querySelectorAll('.wpcf7');
    forms.forEach(function(form) {
        let curentInputs = form.querySelectorAll('.input input:not(.submit-btn),.textarea textarea');
        if (form.querySelector('.submit-btn')) {
            form.querySelector('.submit-btn').disabled = true;
        }
        form.addEventListener('wpcf7mailsent', function(event) {
            form.closest('.form-inner').classList.add('form-submited');
        });


        curentInputs.forEach(function(curentInput) {
            curentInput.addEventListener('input', function(e) {
                console.log(!curentInput.closest('.drop-down'));
                if (curentInput.value != '' && curentInput.value.length > 1 && !curentInput.closest('.drop-down') && curentInput.getAttribute('type') != 'submit') {
                    curentInput.setAttribute('part-valid', true);
                } else {
                    curentInput.setAttribute('part-valid', false);
                }
                if (form.querySelectorAll('[part-valid="true"]').length == curentInputs.length - 1) {
                    form.querySelector('.submit-btn').disabled = false;
                } else {
                    form.querySelector('.submit-btn').disabled = true;
                }
            })
        })
    })

    function selectChoose(drop, overlay) {
        let dropWrapper = drop.closest('.drop-down')
        let dropValues = dropWrapper.querySelectorAll('.value');
        dropValues.forEach(function(dropValue) {
            dropValue.addEventListener('click', function(e) {
                e.preventDefault();
                if (dropWrapper.querySelector('.value.selected')) {
                    dropWrapper.querySelector('.value.selected').classList.remove('selected')
                }
                dropValue.classList.add('selected');
                drop.value = dropValue.textContent;
                dropWrapper.classList.remove('value-show');
                overlay.classList.remove('show')
            })
        })
    }

    function dropShow(customDrop, overlay) {
        customDrop.closest('.drop-down').classList.add('value-show');
        overlay.classList.add('show');
        selectChoose(customDrop, overlay)
    }

    function dropClick(customDrop, overlay) {
        customDrop.addEventListener('click', function(e) {
            dropShow(customDrop, overlay);
        })
    }


    if (customDrops.length > 0) {
        let overlay = document.querySelector('.event-overlay');
        customDrops.forEach(function(customDrop) {
            customDrop.addEventListener('click', dropClick(customDrop, overlay));
            customDrop.addEventListener('keydown', function(e) {

                console.log(e.keyCode)
                if (e.keyCode == 32) {
                    e.preventDefault();
                    dropShow(customDrop, overlay);

                }
            })
            overlay.addEventListener('click', function(e) {
                if (customDrop.closest('.drop-down').classList.contains('value-show')) {
                    customDrop.closest('.drop-down').classList.remove('value-show');
                    overlay.classList.remove('show')
                }
            })

        })

    }






    setTimeout(() => {
        if (document.querySelector('.articles')) {
            var l = new Loader();
            l.require([
                    './siema.min.js'
                ],
                function() {

                    const blogSlider = new Siema({
                        selector: '.articles',
                        duration: 300,
                        easing: 'ease-out',
                        perPage: 2,
                        startIndex: 0,
                        draggable: true,
                        multipleDrag: true,
                        threshold: 20,
                        loop: false,
                        rtl: false,
                        perPage: {
                            300: 1,
                            721: 2,
                        },
                        onChange: checkButton,
                    });
                    let blogLength = blogSlider.innerElements.length;
                    let nextSlider = document.querySelector('.slider-next');
                    let prevSlider = document.querySelector('.slider-prev');

                    prevSlider.addEventListener('click', () => blogSlider.prev());
                    nextSlider.addEventListener('click', () => blogSlider.next());

                    function checkButton() {
                        if (this.currentSlide == 0) {
                            prevSlider.disabled = true;
                        } else {
                            prevSlider.disabled = false;
                        }
                        if (blogLength < (this.currentSlide + this.perPage + 1)) {
                            nextSlider.disabled = true;
                        } else {
                            nextSlider.disabled = false;
                        }
                    }

                });
        }
        if (document.querySelector('.slider-inner')) {
            var l = new Loader();
            l.require([
                    '/js/siema.min.js'
                ],
                function() {

                    const blogSlider = new Siema({
                        selector: '.slider-inner',
                        duration: 450,
                        easing: 'ease-out',
                        perPage: 1,
                        startIndex: 0,
                        draggable: true,
                        multipleDrag: true,
                        threshold: 20,
                        loop: false,
                        rtl: false,
                        onInit: activateSlider,
                        onChange: checkButton,
                    });
                    let blogLength = blogSlider.innerElements.length;
                    let nextSlider = document.querySelector('.slider-next');
                    let prevSlider = document.querySelector('.slider-prev');

                    prevSlider.addEventListener('click', () => blogSlider.prev());
                    nextSlider.addEventListener('click', () => blogSlider.next());

                    function activateSlider() {
                        document.querySelector(this.config.selector).classList.remove('slider-init')
                    }

                    function checkButton() {
                        if (this.currentSlide == 0) {
                            prevSlider.disabled = true;
                        } else {
                            prevSlider.disabled = false;
                        }
                        if (blogLength < (this.currentSlide + this.perPage + 1)) {
                            nextSlider.disabled = true;
                        } else {
                            nextSlider.disabled = false;
                        }
                    }

                });
        }
    }, 500);



})