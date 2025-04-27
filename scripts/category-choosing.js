let chosenCategory = 'All';
let elements = null;

const change = (name) => {
    chosenCategory = name;
    elements.forEach(element => {
        const name = element.getAttribute('travelCategory');
        if (name === chosenCategory)
            element.classList.add('active');
        else
            element.classList.remove('active');
    })
}

document.addEventListener('DOMContentLoaded', () => {
    elements = document.querySelectorAll('div[travelCategory]');
    elements.forEach(element => {
        element.addEventListener('click', () => change(element.getAttribute('travelCategory')))
    })
});