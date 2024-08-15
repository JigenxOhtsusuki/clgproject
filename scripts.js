document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const infoBar = document.getElementById('info-bar');
    const sections = Array.from(document.querySelectorAll('section'));
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const nav = document.querySelector('nav');
    const backdrop = document.getElementById('backdrop');
    let currentTarget = document.querySelector('nav ul li a[data-target="home"]');

    // Function to update the info bar's position and width
    function updateInfoBar(target) {
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const offset = rect.left + window.scrollX;
        const width = rect.width;

        infoBar.style.transform = `translateX(${offset}px)`;
        infoBar.style.width = `${width}px`;
    }

    // Function to handle navigation clicks
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

        // Remove active class from all sections
        sections.forEach(section => section.classList.remove('active'));

        // Add active class to the target section
        targetSection.classList.add('active');

        // Update the info bar position
        updateInfoBar(event.target);

        // Smooth scroll to the target section
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Close the sidebar and backdrop after navigation
        nav.classList.remove('active');
        backdrop.style.display = 'none';
        
        // Update the current target reference
        currentTarget = event.target;
    }

    // Function to handle scrolling and update the info bar
    function onScroll() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 50; // Add margin of error
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const link = document.querySelector(`nav ul li a[data-target="${section.id}"]`);
                if (link) {
                    currentTarget = link;
                    updateInfoBar(link);
                }
            }
        });
    }

    // Function to handle window resizing
    function onResize() {
        if (currentTarget) {
            updateInfoBar(currentTarget); // Recalculate the info bar on resize
        }
        
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            backdrop.style.display = 'none';
        }
    }

    // Event listeners for navigation links
    links.forEach(link => link.addEventListener('click', handleNavigation));

    // Event listener for the menu toggle button
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        backdrop.style.display = nav.classList.contains('active') ? 'block' : 'none';
    });

    // Event listener for the close button
    closeMenu.addEventListener('click', () => {
        nav.classList.remove('active');
        backdrop.style.display = 'none';
    });

    // Event listener for the backdrop click
    backdrop.addEventListener('click', () => {
        nav.classList.remove('active');
        backdrop.style.display = 'none';
    });

    // Event listener for clicks outside the menu
    document.addEventListener('click', (event) => {
        if (nav.classList.contains('active') && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
            backdrop.style.display = 'none';
        }
    });

    // Event listener for scrolling
    window.addEventListener('scroll', onScroll);

    // Event listener for resizing to reset the info bar and menu state
    window.addEventListener('resize', onResize);

    // Initialize the info bar based on the default active target (home)
    if (currentTarget) {
        updateInfoBar(currentTarget);
    } else {
        console.warn('No valid default target found. Make sure there is a link with data-target="home".');
    }
});
