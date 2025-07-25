// Auto-slideshow for What I Offer section (mobile only)
document.addEventListener('DOMContentLoaded', function () {
  const galleries = document.querySelector('.ipl-galleries');
  const dots = document.querySelectorAll('.ipl-galleries-dots .dot');
  if (!galleries || !dots.length) return;

  let currentIndex = 0;
  let autoSlideInterval;
  const totalSlides = galleries.querySelectorAll('li').length;

  function goToSlide(index) {
    const itemWidth = galleries.querySelector('li')?.offsetWidth || 1;
    galleries.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    currentIndex = index;
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % totalSlides;
      goToSlide(nextIndex);
    }, 3000); // 3 seconds per slide
  }

  function stopAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
  }

  // Dots click
  dots.forEach((dot, i) => {
    dot.addEventListener('click', function () {
      goToSlide(i);
      startAutoSlide();
    });
  });

  // Touch/drag interaction
  let isTouching = false;
  let startX = 0;
  let scrollStart = 0;
  galleries.addEventListener('touchstart', function (e) {
    isTouching = true;
    startX = e.touches[0].clientX;
    scrollStart = galleries.scrollLeft;
    stopAutoSlide();
  });
  galleries.addEventListener('touchmove', function (e) {
    if (!isTouching) return;
    const dx = startX - e.touches[0].clientX;
    galleries.scrollLeft = scrollStart + dx;
  });
  galleries.addEventListener('touchend', function (e) {
    isTouching = false;
    // Snap to nearest slide based on swipe direction
    const itemWidth = galleries.querySelector('li')?.offsetWidth || 1;
    const scrollLeft = galleries.scrollLeft;
    const index = Math.round(scrollLeft / itemWidth);
    // Detect swipe direction for a more natural feel
    const dx = startX - (e.changedTouches ? e.changedTouches[0].clientX : 0);
    let targetIndex = index;
    if (Math.abs(dx) > 40) { // Only if swipe is significant
      if (dx > 0 && index < totalSlides - 1) targetIndex = index + 1; // swipe left
      if (dx < 0 && index > 0) targetIndex = index - 1; // swipe right
    }
    goToSlide(targetIndex);
    startAutoSlide();
  });

  // Mouse drag for desktop (optional)
  let isDragging = false;
  let mouseStartX = 0;
  let mouseScrollStart = 0;
  galleries.addEventListener('mousedown', function (e) {
    isDragging = true;
    mouseStartX = e.clientX;
    mouseScrollStart = galleries.scrollLeft;
    stopAutoSlide();
  });
  galleries.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    const dx = mouseStartX - e.clientX;
    galleries.scrollLeft = mouseScrollStart + dx;
  });
  galleries.addEventListener('mouseup', function () {
    isDragging = false;
    const itemWidth = galleries.querySelector('li')?.offsetWidth || 1;
    const index = Math.round(galleries.scrollLeft / itemWidth);
    goToSlide(index);
    startAutoSlide();
  });
  galleries.addEventListener('mouseleave', function () {
    if (isDragging) {
      isDragging = false;
      const itemWidth = galleries.querySelector('li')?.offsetWidth || 1;
      const index = Math.round(galleries.scrollLeft / itemWidth);
      goToSlide(index);
      startAutoSlide();
    }
  });

  // Update dots on scroll (for manual swipe)
  galleries.addEventListener('scroll', function () {
    const itemWidth = galleries.querySelector('li')?.offsetWidth || 1;
    const index = Math.round(galleries.scrollLeft / itemWidth);
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    currentIndex = index;
  });

  // Start auto slideshow only on mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }
  if (isMobile()) {
    goToSlide(0);
    startAutoSlide();
  }
  window.addEventListener('resize', function () {
    if (isMobile()) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
  });
});
// Horizontal scroll dots for What I Offer section (mobile only)
document.addEventListener('DOMContentLoaded', function () {
  const galleries = document.querySelector('.ipl-galleries');
  const dots = document.querySelectorAll('.ipl-galleries-dots .dot');
  if (galleries && dots.length) {
    galleries.addEventListener('scroll', function () {
      const scrollLeft = galleries.scrollLeft;
      const itemWidth = galleries.querySelector('li')?.offsetWidth || 1;
      const index = Math.round(scrollLeft / itemWidth);
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    });
    // Optional: click on dot to scroll to item
    dots.forEach((dot, i) => {
      dot.addEventListener('click', function () {
        galleries.scrollTo({ left: i * (galleries.querySelector('li')?.offsetWidth || 1), behavior: 'smooth' });
      });
    });
  }
});
try {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.1,
        multiplier: 1
    });

    console.log('Locomotive Scroll initialized successfully');

    // Back to top functionality
    const backtopEl = document.querySelector('.backtop');
    const headerEl = document.querySelector('#header');
    if (backtopEl && headerEl) {
        backtopEl.addEventListener('click', () => {
            scroll.scrollTo(headerEl);
            console.log('Back to top clicked');
        });
    }

    // Title animation for Demo-2 and Home
    const titleEl = document.querySelector('.tiles__title');
    if (titleEl && (document.body.classList.contains('demo-2') || document.body.classList.contains('demo-home'))) {
        scroll.on('call', (value) => {
            if (value === 'titleAnim') {
                titleEl.classList.add('tiles__title--animate');
                console.log('Title animation triggered');
            }
        });
    }

    // Testimonials auto-scroll
    const testimonialsTrack1 = document.getElementById('testimonials-track-1');
    const testimonialsTrack2 = document.getElementById('testimonials-track-2');
    
    if (testimonialsTrack1 && testimonialsTrack2) {
        // Clone testimonials for seamless looping
        const testimonials1 = testimonialsTrack1.querySelectorAll('.testimonial-card');
        const testimonials2 = testimonialsTrack2.querySelectorAll('.testimonial-card');
        
        testimonials1.forEach(card => {
            const clone = card.cloneNode(true);
            testimonialsTrack1.appendChild(clone);
        });
        
        testimonials2.forEach(card => {
            const clone = card.cloneNode(true);
            testimonialsTrack2.appendChild(clone);
        });
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Animate mosaic tiles on scroll
    scroll.on('scroll', (instance) => {
        document.querySelectorAll('.mosaic-tile').forEach(tile => {
            const rect = tile.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.top <= window.innerHeight;
            if (isVisible) {
                tile.classList.add('mosaic-tile--animate');
            }
        });
    });

} catch (error) {
    console.error('Locomotive Scroll initialization failed:', error);
}

// Navbar functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('open');
    });
}

// Close mobile menu when clicking a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('open');
        }
    });
});

// Change navbar style on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(17, 17, 17, 0.7)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(17, 17, 17, 0.2)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Consolidated load and resize event listeners
window.addEventListener('load', () => {
    if (scroll) {
        scroll.update();
        console.log('Scroll updated on load');
    }
});

window.addEventListener('resize', () => {
    if (scroll) {
        scroll.update();
        console.log('Scroll updated on resize');
    }
});

// Video Categories Functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('Video Categories JS Loaded'); // Debug: Confirm script runs

    // Use existing Locomotive Scroll instance
    const scrollContainer = document.querySelector('[data-scroll-container]');
    const scroll = scrollContainer && scrollContainer.locomotiveScroll ? scrollContainer.locomotiveScroll : null;
    if (!scroll) {
        console.warn('Locomotive Scroll not found, proceeding without it');
    }

    // Select DOM elements
    const filterButtons = document.querySelectorAll('.video-filter-btn');
    const videoItems = document.querySelectorAll('.video-category-item');
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = videoPlayer.querySelector('source');
    const closeModal = document.querySelector('.video-modal-close');

    // Check if elements exist
    if (!filterButtons.length) console.error('No filter buttons found');
    if (!videoItems.length) console.error('No video items found');
    if (!videoModal) console.error('Video modal not found');
    if (!videoPlayer || !videoSource) console.error('Video player or source not found');
    if (!closeModal) console.error('Close modal button not found');

    // Function to update video display based on filter
    function updateVideoDisplay(filter) {
        console.log(`Applying filter: ${filter}`); // Debug: Track filter changes

        // Update filter buttons
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
        });

        // Update video items
        videoItems.forEach(item => {
            const category = item.getAttribute('data-category');
            const isVisible = category === filter;
            item.style.display = isVisible ? 'block' : 'none';
            item.classList.toggle('active', isVisible);
        });

        // Adjust grid layout for Corporate Videos (2x3) vs others (3x3)
        const grid = document.querySelector('.video-categories-grid');
        if (grid) {
            if (filter === 'corporate-videos') {
                grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                grid.style.gridTemplateRows = 'repeat(2, auto)';
            } else {
                grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                grid.style.gridTemplateRows = 'repeat(3, auto)';
            }
        }

        // Update Locomotive Scroll
        if (scroll) {
            console.log('Updating Locomotive Scroll'); // Debug
            scroll.update();
        }
    }

    // Initialize with Pre-Wedding Teaser
    updateVideoDisplay('Pre-Wedding-Teaser');

    // Attach filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            console.log(`Filter button clicked: ${filter}`); // Debug
            updateVideoDisplay(filter);
        });
    });

    // // Attach video item click handlers
    // videoItems.forEach(item => {
    //     const playButton = item.querySelector('.video-category-play-btn');
    //     if (playButton) {
    //         playButton.addEventListener('click', (e) => {
    //             e.stopPropagation(); // Prevent parent click
    //             const videoUrl = item.getAttribute('data-video');
    //             console.log(`Play button clicked, video URL: ${videoUrl}`); // Debug
    //             if (videoUrl) {
    //                 videoSource.setAttribute('src', videoUrl);
    //                 videoPlayer.load();
    //                 videoModal.style.display = 'flex';
    //                 videoPlayer.play().catch(err => {
    //                     console.error('Video play failed:', err);
    //                 });
    //             } else {
    //                 console.error('No video URL found for item');
    //             }
    //         });
    //     } else {
    //         console.warn('No play button found for video item', item);
    //     }
    // });

    // Close modal handler
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            console.log('Closing modal'); // Debug
            videoModal.style.display = 'none';
            videoPlayer.pause();
            videoSource.setAttribute('src', '');
        });
    }

    // Close modal when clicking outside
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                console.log('Closing modal via outside click'); // Debug
                videoModal.style.display = 'none';
                videoPlayer.pause();
                videoSource.setAttribute('src', '');
            }
        });
    }

    // Adjust modal position with Locomotive Scroll
    if (scroll) {
        scroll.on('scroll', ({ scroll }) => {
            if (videoModal.style.display === 'flex') {
                videoModal.style.top = `${scroll.y}px`;
            }
        });
    }
});


// Films & Trailers Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel for showcase section
    const carousel = document.querySelector('.cinematic-showcase__carousel');
    if (carousel) {
        let isDragging = false;
        let startX, scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            carousel.style.cursor = 'grabbing';
        });

        carousel.addEventListener('mouseleave', () => {
            isDragging = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mouseup', () => {
            isDragging = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });

        // Touch support for mobile
        carousel.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('touchend', () => {
            isDragging = false;
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }

    // Update Locomotive Scroll for new elements
    if (scroll) {
        scroll.update();
        console.log('Locomotive Scroll updated for Films & Trailers page');
    }
});

// Video Modal
        const videoModal = document.getElementById('videoModal');
        const videoIframeContainer = videoModal.querySelector('.video-modal__iframe');
        const videoClose = videoModal.querySelector('.video-modal__close');
        const videoItems = document.querySelectorAll('.video-gallery__item');

        videoItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoEmbed = item.getAttribute('data-video');
                videoIframeContainer.innerHTML = videoEmbed;
                videoModal.classList.add('active');
            });
        });

        videoClose.addEventListener('click', () => {
            videoModal.classList.remove('active');
            videoIframeContainer.innerHTML = '';
        });

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                videoIframeContainer.innerHTML = '';
            }
        });




