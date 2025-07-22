// Enhanced JavaScript for ArchiVista Studio

document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 2000);
    });

    // Scroll Progress Bar
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Initialize slider
    showSlide(0);
    startSlideshow();

    // Navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopSlideshow();
            currentSlide = index;
            showSlide(currentSlide);
            startSlideshow();
        });
    });

    // Pause slider on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', stopSlideshow);
    heroSlider.addEventListener('mouseleave', startSlideshow);

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu
            const navToggle = document.getElementById('nav-toggle');
            navToggle.checked = false;
        });
    });

    // Active Navigation Link
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Animated Counter for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation classes
                if (element.classList.contains('fade-in')) {
                    element.classList.add('visible');
                } else if (element.classList.contains('fade-in-left')) {
                    element.classList.add('visible');
                } else if (element.classList.contains('fade-in-right')) {
                    element.classList.add('visible');
                } else if (element.classList.contains('scale-in')) {
                    element.classList.add('visible');
                }
                
                // Animate stats counters
                if (element.classList.contains('stat-number')) {
                    animateCounter(element);
                }
                
                // Animate service cards with stagger effect
                if (element.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        if (card === element) {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 200);
                        }
                    });
                }
                
                // Animate project cards
                if (element.classList.contains('project-card')) {
                    const cards = document.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        if (card === element) {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 150);
                        }
                    });
                }
                
                // Animate service images
                if (element.classList.contains('service-img')) {
                    element.classList.add('visible');
                }
                
                // Animate service description
                if (element.classList.contains('description-title') || element.classList.contains('description-text')) {
                    element.classList.add('visible');
                }
                
                // Animate team section
                if (element.classList.contains('team-img') || element.classList.contains('team-description')) {
                    element.classList.add('visible');
                }
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animatedElements = document.querySelectorAll(
        '.section-title, .service-card, .project-card, .timeline-item, .stat-item, .service-img, .description-title, .description-text, .team-img, .team-description'
    );
    
    animatedElements.forEach((element, index) => {
        if (element.classList.contains('section-title')) {
            element.classList.add('fade-in');
        } else if (element.classList.contains('service-card')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
        } else if (element.classList.contains('project-card')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
        } else if (element.classList.contains('timeline-item')) {
            element.classList.add(index % 2 === 0 ? 'fade-in-left' : 'fade-in-right');
        } else if (element.classList.contains('stat-item')) {
            element.classList.add('scale-in');
        } else if (element.classList.contains('service-img')) {
            // Already has animation classes in CSS
        } else if (element.classList.contains('description-title')) {
            element.classList.add('fade-in');
        } else if (element.classList.contains('description-text')) {
            element.style.transitionDelay = `${index * 0.2}s`;
        } else if (element.classList.contains('team-img')) {
            // Already has animation classes in CSS
        } else if (element.classList.contains('team-description')) {
            // Already has animation classes in CSS
        }
        
        observer.observe(element);
    });

    // Observe stat numbers separately
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });

    // Projects Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.innerHTML = `
                <div style="
                    background: linear-gradient(45deg, #4CAF50, #45a049);
                    color: white;
                    padding: 1rem;
                    border-radius: 10px;
                    margin-top: 1rem;
                    text-align: center;
                    animation: slideInUp 0.5s ease;
                ">
                    <i class="fas fa-check-circle"></i> Message sent successfully!
                </div>
            `;
            
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            submitBtn.disabled = false;
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }, 2000);
    });

    // Form Input Animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const shapes = document.querySelectorAll('.shape');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Cursor Trail Effect (Optional)
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: difference;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            const navToggle = document.getElementById('nav-toggle');
            navToggle.checked = false;
        }
    });
});