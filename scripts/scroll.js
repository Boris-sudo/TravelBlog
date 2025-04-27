import { asideMenuState, interactAsideMenu } from "./aside.js";


document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const aside = document.querySelector('aside');
    const header_title = header.querySelector('.title');
    const parallaxImages = document.querySelectorAll('img[parallaxImage="true"]');

    const MAX_SCROLL_DELTA_VELOCITY = 10;
    const SCROLL_ACCELERATION = 1.1;
    let currentScrollVelocity = 0;
    let scrollInterval = null;
    let lastScrollTime = Date.now();
    let wasScrolled = false;

    const stopVelocity = () => {
        const deltaTime = Date.now() - lastScrollTime;
        if (deltaTime < 50) return;
        if (currentScrollVelocity < 0)
            currentScrollVelocity = Math.ceil(currentScrollVelocity / SCROLL_ACCELERATION);
        else
            currentScrollVelocity = Math.floor(currentScrollVelocity / SCROLL_ACCELERATION);
        moveBody(5);
        if (currentScrollVelocity === 0) {
            clearInterval(scrollInterval);
            scrollInterval = null;
        }
    }

    const moveBody = (time = 0) => {
        const deltaTime = Date.now() - lastScrollTime;
        const delta = currentScrollVelocity * (time === 0 ? deltaTime : time);
        const height = document.body.getBoundingClientRect().height;
        const scrolled = document.body.getBoundingClientRect().top;
        const scrollY = Math.max(window.innerHeight - height, Math.min(0, scrolled - delta));

        /* animating movement */
        const duration = 300;
        document.body.animate({
            transform: `translate(0, ${scrollY}px)`,
        }, {duration: duration, fill: 'forwards'});
        header.animate({
            transform: `translate(-50%, ${-scrollY}px)`,
        }, {duration: duration, fill: 'forwards'});
        aside.animate({
            transform: `translate(0, ${-scrollY}px)`,
        }, {duration: duration, fill: 'forwards'});

        /* we close or show content of header */
        interactHeader(scrollY);
        /* working with parallax images */
        moveParallaxImages();
        /* changing time to last moment */
        lastScrollTime = Date.now();
    }

    const interactHeader = (scrollY) => {
        if (scrollY < -400) {
            header_title.style.fontSize = '1.75em';
            aside.style.top = '80px';
            aside.style.height = 'calc(100vh - 80px)';
            header.style.height = '80px';
        } else {
            header_title.style.fontSize = '2.25em';
            aside.style.top = '100px';
            aside.style.height = 'calc(100vh - 100px)';
            header.style.height = '100px';
        }
    }

    const moveParallaxImages = () => {
        parallaxImages.forEach((img, index) => {
            const container = img.parentElement;
            const height = container.getBoundingClientRect().height + window.innerHeight;
            const current = container.getBoundingClientRect().top;
            const percent = -current / height;
            const delta = img.getBoundingClientRect().height - container.getBoundingClientRect().height;
            const translate = percent * delta;

            img.animate({
                transform: `translate3d(0, ${translate}px, 0)`,
            }, {duration: 300, fill: 'forwards'})
        });
    }

    const scrollTo = (top) => {
        if (!wasScrolled) {
            window.scrollTo({
                top: top,
                behavior: 'smooth',
            })
            return;
        }

        const current = Math.abs(document.querySelector('#home').getBoundingClientRect().top);
        const scrollY = Math.abs(current - top);
        let maxVelocity = 1
        let current_sum = 0;
        while (current_sum < scrollY) {
            current_sum += maxVelocity;
            maxVelocity *= SCROLL_ACCELERATION;
            current_sum += maxVelocity;
        }
        maxVelocity /= SCROLL_ACCELERATION;

        currentScrollVelocity = top < current ? -1 : 1;
        const interval = setInterval(() => {
            if (Math.abs(currentScrollVelocity) >= maxVelocity) {
                clearInterval(interval);
                scrollInterval = setInterval(stopVelocity, 10)
            }
            currentScrollVelocity *= SCROLL_ACCELERATION;
            moveBody(5);
        }, 10);
    }

    const scrollTop = () => {
        scrollTo(0);
    }

    /* smooth navigation to top */
    document.getElementById('backToTop').addEventListener('click', scrollTop);
    /* smooth scroll for links */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            let timeout = 0;
            if (asideMenuState) {
                interactAsideMenu();
                timeout = 1500;
            }
            setTimeout(() => {
                if (!target) return;
                scrollTo(wasScrolled ? target.offsetTop : target.getBoundingClientRect().top);
            }, timeout)
        });
    });
    /* smooth scroll on wheel events */
    window.addEventListener('wheel', (event) => {
        event.preventDefault();
        if (asideMenuState) return;
        wasScrolled = true;
        const delta = Math.max(-1e9, Math.min(1e9, event.deltaY));
        const deltaTime = Date.now() - lastScrollTime;
        const velocity = delta / deltaTime;
        currentScrollVelocity = Math.max(currentScrollVelocity - MAX_SCROLL_DELTA_VELOCITY, Math.min(currentScrollVelocity + MAX_SCROLL_DELTA_VELOCITY, velocity));
        moveBody();

        if (scrollInterval === null) {
            scrollInterval = setInterval(stopVelocity, 10);
        }
    }, {passive: !1});
    /* scroll parallax images on scroll event */
    window.addEventListener('scroll', () => {
        parallaxImages.forEach((img, index) => {
            const container = img.parentElement;
            const height = container.getBoundingClientRect().height + window.innerHeight;
            const current = container.getBoundingClientRect().top;
            const percent = -current / height;
            const delta = img.getBoundingClientRect().height - container.getBoundingClientRect().height;
            const translate = percent * delta;

            img.animate({
                transform: `translate3d(0, ${translate}px, 0)`,
            }, {duration: 0, fill: 'forwards'})
        });
    })
});