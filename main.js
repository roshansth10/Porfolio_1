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
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
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
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Activate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    function activateSkillBars() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = '0';
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    bar.style.width = level + '%';
                    observer.unobserve(bar);
                }
            }, { threshold: 0.5 });
            
            observer.observe(bar);
        });
    }

    // Initialize skill bars
    activateSkillBars();

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;

// Contact Form Handler with Debugging
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("✅ Form submit event triggered");

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    
    // Debug: Check if elements exist
    console.log("Name element:", document.getElementById("name"));
    console.log("Email element:", document.getElementById("email"));
    console.log("Message element:", document.getElementById("message"));
    
    // Get status element with better error handling
    let status = document.getElementById("form-status");
    console.log("Status element:", status);
    
    if (!status) {
        console.error("❌ form-status element not found! Creating one...");
        // Create status element dynamically
        status = document.createElement("div");
        status.id = "form-status";
        status.style.marginTop = "15px";
        status.style.padding = "10px";
        status.style.borderRadius = "5px";
        this.appendChild(status);
        console.log("✅ Created form-status element:", status);
    }

    // Validation
    if (!name || !email || !message) {
        console.log("❌ Validation failed - empty fields");
        status.textContent = "Please fill all fields.";
        status.style.color = "orange";
        return;
    }

    console.log("✅ Validation passed");
    console.log("Form data:", { name, email, message });

    // Show sending state
    status.textContent = "⏳ Sending message...";
    status.style.color = "blue";

    // EmailJS configuration - REPLACE WITH YOUR ACTUAL CREDENTIALS
     const serviceID = "service_9mb4ye9";
        const templateID = "template_cjzsp5a";
        const publicKey = "nMtSbrp_D1y25PI_J";

    console.log("EmailJS config:", { serviceID, templateID, publicKey });

    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.error("❌ EmailJS not loaded!");
        status.textContent = "❌ Email service not loaded. Please refresh the page.";
        status.style.color = "red";
        return;
    }

    console.log("✅ EmailJS loaded, initializing...");

    try {
        // Initialize EmailJS
        emailjs.init(publicKey);
        
        const params = { 
            from_name: name,
            reply_to: email,
            message: message
        };

        console.log("📧 Sending email with params:", params);

        emailjs.send(serviceID, templateID, params)
            .then((response) => {
                console.log("✅ Email sent successfully!", response);
                status.textContent = "✅ Message sent successfully!";
                status.style.color = "#0aff9d";
                document.getElementById("contact-form").reset();
            })
            .catch((error) => {
                console.error("❌ EmailJS error:", error);
                status.textContent = "❌ Failed to send message. Please try again.";
                status.style.color = "red";
            });
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        status.textContent = "❌ An unexpected error occurred.";
        status.style.color = "red";
    }
});
    
// Animate skill bars when scrolled to
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
};
