document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 80,
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: ["#6e48aa", "#9d50bb", "#0aff9d"] 
                },
                shape: { 
                    type: "circle",
                    stroke: { 
                        width: 0, 
                        color: "#000000" 
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { 
                        enable: true, 
                        speed: 1, 
                        opacity_min: 0.1, 
                        sync: false 
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { 
                        enable: true, 
                        speed: 2, 
                        size_min: 0.3, 
                        sync: false 
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6e48aa",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "bounce",
                    bounce: true,
                    attract: { 
                        enable: true, 
                        rotateX: 600, 
                        rotateY: 1200 
                    }
                }
            },
            interactivity: {
                detect_on: "window",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: { 
                        enable: true, 
                        mode: "push" 
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: { 
                        particles_nb: 4 
                    }
                }
            },
            retina_detect: true
        });
    }

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            link.classList.add('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Initialize skill bars
    activateSkillBars();

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }

    // EmailJS Contact Form Submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            const status = document.getElementById("form-status");

            if (!name || !email || !message) {
                if (status) {
                    status.textContent = "Please fill all fields.";
                    status.style.color = "orange";
                }
                return;
            }

            // EmailJS configuration - REPLACE WITH YOUR ACTUAL CREDENTIALS
            const serviceID = "your_service_id";
            const templateID = "your_template_id";
            const publicKey = "your_public_key";

            emailjs.init(publicKey);

            const params = { name, email, message };

            emailjs.send(serviceID, templateID, params)
                .then(() => {
                    if (status) {
                        status.textContent = "✅ Message sent successfully!";
                        status.style.color = "#0aff9d";
                    }
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("EmailJS error:", error);
                    if (status) {
                        status.textContent = "❌ Failed to send message. Please try again.";
                        status.style.color = "red";
                    }
                });
        });
    }
});

// Skill bars functions
function activateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0';
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    bar.style.width = level + '%';
                }, 300);
                observer.unobserve(bar);
            }
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
}

// Run animation when skills section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, {threshold: 0.5});

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    observer.observe(skillsSection);
}
