// Loading Animation
window.addEventListener('load', function(){
  const loadingOverlay = this.document.getElementById('loadingOverlay');
  setTimeout(() => {
    loadingOverlay.classList.add('hidden');
  },1000)
});


// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', function(){
  if(window.scrollY > 100){
    header.classList.add('scrolled');
  }else{
    header.classList.remove('scrolled');
  }
});


// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', function(){
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});


// Close Mobile Menu when Clicking on nav-links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  })
});

// Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all animation elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });

        // Counter animation for stats
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start);
                }
            }, 16);
        }

        // Trigger counter animation when stats section is visible
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        animateCounter(counter, target);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            statsObserver.observe(statsContainer);
        }

        // Scroll to top functionality
        const scrollTopBtn = document.getElementById('scrollTop');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Form submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Show success message (in a real application, you would send this to a server)
            showNotification('Thank you for your message! We will contact you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
        });

        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <div style="
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: ${type === 'success' ? 'var(--accent-color)' : 'var(--warning-color)'};
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 10px;
                    box-shadow: var(--shadow);
                    z-index: 10000;
                    animation: slideInRight 0.3s ease-out;
                ">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                    ${message}
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 5000);
        }

        // Add CSS for notification animations
        const notificationStyles = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Dynamic greeting based on time
        function updateGreeting() {
            const now = new Date();
            const hour = now.getHours();
            let greeting;
            
            if (hour < 12) {
                greeting = 'Good Morning! ';
            } else if (hour < 17) {
                greeting = 'Good Afternoon! ';
            } else {
                greeting = 'Good Evening! ';
            }
            
            const emergencyBanner = document.querySelector('.emergency-banner');
            const originalText = emergencyBanner.innerHTML;
            if (!originalText.includes('Good')) {
                emergencyBanner.innerHTML = greeting + originalText;
            }
        }

        // Call greeting function
        updateGreeting();

        // Add typing effect to hero title
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                const heroTitle = document.querySelector('.hero-text h1');
                if (heroTitle) {
                    const originalText = heroTitle.textContent;
                    typeWriter(heroTitle, originalText, 30);
                }
            }, 1500);
        });

        // Add mouse following effect for pest icons
        document.addEventListener('mousemove', function(e) {
            const pestIcons = document.querySelectorAll('.pest-icon');
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            pestIcons.forEach((icon, index) => {
                const rect = icon.getBoundingClientRect();
                const iconX = rect.left + rect.width / 2;
                const iconY = rect.top + rect.height / 2;
                
                const deltaX = (mouseX - iconX) * 0.1;
                const deltaY = (mouseY - iconY) * 0.1;
                
                icon.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
        });

        // Reset pest icons position when mouse leaves hero section
        document.querySelector('.hero').addEventListener('mouseleave', function() {
            const pestIcons = document.querySelectorAll('.pest-icon');
            pestIcons.forEach(icon => {
                icon.style.transform = 'translate(0, 0)';
            });
        });

        // Add click to call functionality
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', function() {
                showNotification('Calling Greenx Pest Control...', 'info');
            });
        });

        // Service card hover effect with additional details
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Emergency contact pulsing effect
        setInterval(() => {
            const emergencyBanner = document.querySelector('.emergency-banner');
            emergencyBanner.style.transform = 'scale(1.01)';
            setTimeout(() => {
                emergencyBanner.style.transform = 'scale(1)';
            }, 200);
        }, 3000);

        console.log('🐛 Greenx Pest Control Website Loaded Successfully! 🌿');
   