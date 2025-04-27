let asideMenuState = false;

function showAsideMenu() {
    const header = document.querySelector('header');
    const header_icon = document.querySelector('.menu-icon');
    const header_icon_text = document.querySelector('.menu-icon-text');
    const aside = document.querySelector('aside');

    aside.style.display = 'flex';

    setTimeout(() => {
        header_icon_text.innerHTML = 'close';
        header_icon.classList.add('active');
        header.classList.add('active-menu');

        const children = aside.children;
        for (let i = 0; i < children.length; i++) {
            children.item(i).classList.add('show');
        }

        setTimeout(() => {
            aside.querySelectorAll('a').forEach((item) => {
                item.style.transform = 'translateX(0)';
            });
        }, 300);
    }, 100);
}

function hideAsideMenu() {
    const header = document.querySelector('header');
    const header_icon = document.querySelector('.menu-icon');
    const header_icon_text = document.querySelector('.menu-icon-text');
    const aside = document.querySelector('aside');

    aside.querySelectorAll('a').forEach((item) => {
        item.style.transform = 'translateX(-100%)';
    });

    setTimeout(() => {
        header_icon_text.innerHTML = 'menu';
        header_icon.classList.remove('active');
        header.classList.remove('active-menu');

        const children = aside.children;
        for (let i = 0; i < children.length; i++) {
            children.item(i).classList.remove('show');
        }

        setTimeout(() => {
            aside.style.display = 'none';
        }, 600);
    }, 900);
}

function interactAsideMenu() {
    if (asideMenuState)
        hideAsideMenu();
    else
        showAsideMenu();
    asideMenuState = !asideMenuState;
}

document.addEventListener('DOMContentLoaded', () => {
    const header_icon = document.querySelector('.menu-icon');
    header_icon.addEventListener('click', (event) => {
        event.preventDefault();
        interactAsideMenu();
    });
})

export {asideMenuState, interactAsideMenu};