'use strict';
// class ScrollBox {
//     static #SCROLLER_HEIGHT_MIN = 25;
//     constructor(container, heightBar) {
//         this.viewport = container.querySelector('.blog__viewport');
//         this.contentBox = container.querySelector('.blog__content-box');
//         this.scroller = document.querySelector('.scroller');
//         this.scrollbar = document.querySelector('.scrollbar');
//         this.pressed = false;
//         let coor = this.scrollbar.getBoundingClientRect();
//         this.heightBar = coor.height;
//         console.log(coor);
//         this.init();
//     }
//     init() {
//         this.viewportHeight = this.viewport.offsetHeight;
//         // this.viewportHeight = 400;

//         this.contentHeight = this.contentBox.scrollHeight;
//         if (this.viewportHeight >= this.contentHeight) return;
//         // if (350 >= this.contentHeight) return;//

//         // this.max = this.viewport.clientHeight - this.contentHeight;
//         // console.log(this.max);
//         // this.max = 350 - this.contentHeight;//

//         // this.ratio = this.viewportHeight / this.contentHeight;
//         this.ratio = this.heightBar/ (this.contentHeight);
//         this.createScrollbar();
//         this.registerEventsHandler();
//     }
//     createScrollbar() {
//         // const scrollbar = document.querySelector('.scrollbar');
//         // this.scroller = document.querySelector('.scroller');
//         // scrollbar.className = 'scrollbar';
//         // scroller.className = 'scroller';
//         // scrollbar.appendChild(scroller);
//         // this.viewport.appendChild(scrollbar);
//         // this.scroller = this.viewport.querySelector('.scroller');
//         this.scrollerHeight = parseInt(this.ratio * this.viewportHeight);
//         // this.scrollerHeight = parseInt(this.ratio * this.heightBar);//

//         this.scrollerHeight = (this.scrollerHeight <= ScrollBox.#SCROLLER_HEIGHT_MIN) ? ScrollBox.#SCROLLER_HEIGHT_MIN : this.scrollerHeight;
//         this.scroller.style.height = this.scrollerHeight + 'px';

//     }
//     registerEventsHandler(e) {
//         this.contentBox.addEventListener('scroll', () => {
//             this.scroller.style.top = (this.contentBox.scrollTop * this.ratio) + 'px';
//         });
//         this.scroller.addEventListener('mousedown', e => {
//             this.start = e.clientY;
//             this.pressed = true;
//         });
//         document.addEventListener('mousemove', this.drop.bind(this));
//         document.addEventListener('mouseup', () => this.pressed = false);
//     }
//     drop(e) {
//         e.preventDefault();
//         if (this.pressed === false) return;
//         // console.log(this.scroller.offsetTop);
//         let shiftScroller = this.start - e.clientY;
//         this.scroller.style.top = (this.scroller.offsetTop - shiftScroller) + 'px';
//         let shiftContent = this.scroller.offsetTop / this.ratio;
//         const totalheightScroller = this.scroller.offsetHeight + this.scroller.offsetTop;
//         // const maxOffsetScroller = this.viewportHeight - this.scroller.offsetHeight;
//         const maxOffsetScroller = this.heightBar - this.scroller.offsetHeight;

//         if (this.scroller.offsetTop < 0) this.scroller.style.top = '0px';
//         // if (totalheightScroller >= this.viewportHeight ) this.scroller.style.top = maxOffsetScroller + 'px';
//         if (totalheightScroller >= this.heightBar ) this.scroller.style.top = maxOffsetScroller + 'px';

//         this.contentBox.scrollTo(0, shiftContent);
//         this.start = e.clientY;
//     }
// };
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
        console.log(coor);
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
                console.log(1);
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
        // requestAnimationFrame(()=>{

        e.preventDefault();
        if (this.pressed === false) return;
        let shiftScroller = this.start - e.clientY;
        let scrollTop = this.scroller.offsetTop - shiftScroller;
        this.scroller.style.top = scrollTop + 'px';
        let barTop = scrollTop * this.k;
        const totalheightScroller = this.scroller.offsetHeight + this.scroller.offsetTop;        const maxOffsetScroller = this.heightBar - this.scroller.offsetHeight;
        if (this.scroller.offsetTop < 0) 
        this.scroller.style.top = '0px';
        if (totalheightScroller >= this.heightBar ) 
        this.scroller.style.top = maxOffsetScroller + 'px';
        this.contentBox.scrollTo(0, barTop);
        this.start = e.clientY;
                // });
    }
};
const containers = document.querySelector('.blog__container');
const scrollbox = new ScrollBox(containers);

