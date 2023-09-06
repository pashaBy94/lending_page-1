'use strict';
class ScrollBox {
    static #SCROLLER_HEIGHT_MIN = 25;
    constructor(container) {
        this.viewport = container.querySelector('.blog__viewport');
        this.contentBox = container.querySelector('.blog__content-box');
        this.scroller = document.querySelector('.scroller');
        this.scrollbar = document.querySelector('.scrollbar');
        this.pressed = false;
        let coor = this.scrollbar.getBoundingClientRect();
        this.heightBar = coor.height;
        this.init();
    }
    init() {
        this.viewportHeight = this.viewport.offsetHeight;
        this.contentHeight = this.contentBox.scrollHeight;
        if (this.viewportHeight >= this.contentHeight) return;
        this.createScrollbar();
        this.registerEventsHandler();
    }
    createScrollbar() {
        this.scrollerHeight = this.heightBar/(this.contentHeight/this.viewportHeight);
        this.scrollerHeight = this.scrollerHeight > ScrollBox.#SCROLLER_HEIGHT_MIN? this.scrollerHeight:ScrollBox.#SCROLLER_HEIGHT_MIN; 
        this.scroller.style.height = this.scrollerHeight + 'px';
        this.k = (this.contentHeight-this.viewportHeight)/(this.heightBar-this.scrollerHeight);

    }
    registerEventsHandler(e) {
        this.contentBox.addEventListener('scroll', (ev) => {
            requestAnimationFrame(()=>{
                this.scroller.style.top = (this.contentBox.scrollTop / this.k) + 'px';
            });
        });
        this.scroller.addEventListener('mousedown', e => {
            this.start = e.clientY;
            this.pressed = true;
        });
        document.addEventListener('mousemove', this.drop.bind(this));
        document.addEventListener('mouseup', () => this.pressed = false);
    }
    drop(e) {
        e.preventDefault();
        if (this.pressed === false) return;
        let shiftScroller = this.start - e.clientY;
        let scrollTop = this.scroller.offsetTop - shiftScroller;
        this.scroller.style.top = scrollTop + 'px';
        let barTop = scrollTop * this.k;
        const totalheightScroller = this.scroller.offsetHeight + this.scroller.offsetTop;    
        const maxOffsetScroller = this.heightBar - this.scroller.offsetHeight;
        if (this.scroller.offsetTop < 0) 
        this.scroller.style.top = '0px';
        if (totalheightScroller >= this.heightBar ) 
        this.scroller.style.top = maxOffsetScroller + 'px';
        this.contentBox.scrollTo(0, barTop);
        this.start = e.clientY;
    }
};
const containers = document.querySelector('.blog__container');
const scrollbox = new ScrollBox(containers);

