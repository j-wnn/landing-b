// initialization


/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)


gsap.to(".reveal-up", {
    opacity: 0,
    y: "50px",
})

// gsap.to("#dashboard", {
//     boxShadow: "0px 15px 25px -5px #7e22ceaa",
//     duration: 0.3,
//     scrollTrigger: {
//         trigger: "#hero-section",
//         start: "60% 60%",
//         end: "80% 80%",
//         // markers: true
//     }

// })

// straightens the slanting image
gsap.to("#dashboard", {

    scale: 1,
    translateY: 0,
    // translateY: "0%",
    rotateX: "0deg",
    scrollTrigger: {
        trigger: "#hero-section",
        start: "top 80%",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
    }

})

const faqAccordion = document.querySelectorAll('.faq-accordion')

faqAccordion.forEach(function (btn) {
    btn.addEventListener('click', function () {
        this.classList.toggle('active')

        // Toggle 'rotate' class to rotate the arrow
        let content = this.nextElementSibling
        
        // content.classList.toggle('!tw-hidden')
        if (content.style.maxHeight === '200px') {
            content.style.maxHeight = '0px'
            content.style.padding = '0px 18px'

        } else {
            content.style.maxHeight = '200px'
            content.style.padding = '20px 18px'
        }
    })
})



// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section")

sections.forEach((sec) => {

    const revealUptimeline = gsap.timeline({paused: true, 
                                            scrollTrigger: {
                                                            trigger: sec,
                                                            start: "top 70%", // top of trigger hits the top of viewport
                                                            end: "20% 90%",
                                                            // markers: true,
                                                            // scrub: 1,
                                                        }})

    revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: 0.2,
    })


})


// ------------- Smooth Scroll for CTA buttons ---------------

document.addEventListener('DOMContentLoaded', function() {
    // Get all smooth scroll links
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll[href^="#"]')
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault()
            
            // Google Analytics Event Tracking
            const buttonText = this.querySelector('span') ? this.querySelector('span').textContent.trim() : this.textContent.trim()
            const buttonLocation = this.closest('header') ? 'header' : 'hero_section'
            
            // Send gtag event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'event_category': 'engagement',
                    'event_label': buttonText,
                    'button_location': buttonLocation,
                    'custom_parameter': `${buttonLocation}_${buttonText}`
                })
                
                console.log(`GA Event sent: CTA click - ${buttonText} (${buttonLocation})`)
            }
            
            const targetId = this.getAttribute('href').substring(1)
            const targetElement = document.getElementById(targetId)
            
            if (targetElement) {
                // Smooth scroll to target with offset for header
                const headerHeight = 80 // Adjust this value based on your header height
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                })
            }
        })
    })
})
