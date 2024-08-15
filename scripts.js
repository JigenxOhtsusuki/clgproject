document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const infoBar = document.getElementById('info-bar');
    const sections = Array.from(document.querySelectorAll('section'));
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const nav = document.querySelector('nav');
    const backdrop = document.getElementById('backdrop');
    let currentTarget = document.querySelector('nav ul li a[data-target="home"]');

    function updateInfoBar(target) {
        const rect = target.getBoundingClientRect();
        const offset = rect.left + window.scrollX;
        const width = rect.width;

        infoBar.style.transform = `translateX(${offset}px)`;
        infoBar.style.width = `${width}px`;
    }

    function handleNavigation(event) {
        event.preventDefault();
        
        const targetId = event.target.getAttribute('data-target');
        
        if (!targetId) {
            console.error('No valid data-target attribute found.');
            return;
        }

        const targetSection = document.getElementById(targetId);
        
        if (!targetSection) {
            console.error(`No section found with ID: ${targetId}`);
            return;
        }

        sections.forEach(section => {
            section.classList.remove('active');
        });
        targetSection.classList.add('active');

        updateInfoBar(event.target);

        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Close the sidebar and backdrop after navigation
        nav.classList.remove('active');
        backdrop.style.display = 'none';
    }

    function onScroll() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const link = document.querySelector(`nav ul li a[data-target="${section.id}"]`);
                if (link) updateInfoBar(link);
            }
        });
    }

    function handleSignIn() {
        window.location.href = 'signin.html';
    }

    function toggleMenu() {
        nav.classList.toggle('active');
        backdrop.style.display = nav.classList.contains('active') ? 'block' : 'none';
    }

    function closeMenuHandler() {
        nav.classList.remove('active');
        backdrop.style.display = 'none';
    }

    function closeMenuOnClickOutside(event) {
        if (nav.classList.contains('active') && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenuHandler();
        }
    }

    links.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', closeMenuHandler);
    backdrop.addEventListener('click', closeMenuHandler);

    document.addEventListener('click', closeMenuOnClickOutside);

    document.getElementById('sign-in').addEventListener('click', handleSignIn);

    window.addEventListener('scroll', onScroll);

    if (currentTarget) {
        updateInfoBar(currentTarget);
    } else {
        console.error('No valid default target found.');
    }
});
