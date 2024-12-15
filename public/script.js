document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    
    function toggleMenu(e) {
        e.preventDefault();
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        console.log('Menu toggled');
    }

    hamburger.addEventListener('click', toggleMenu);
}); 