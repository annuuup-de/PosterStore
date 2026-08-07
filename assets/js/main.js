/* =====================================================
   PosterVerse - Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    navbarScrollEffect();
    scrollTopButton();
    smoothScrolling();
    loadFeaturedPosters();
    heroParallax();

});

/* =====================================================
   Navbar Background on Scroll
===================================================== */

function navbarScrollEffect() {

    const navbar = document.querySelector(".custom-navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.background = "rgba(15,23,42,.95)";
            navbar.style.padding = "12px 0";
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.18)";

        } else {

            navbar.style.background = "rgba(15,23,42,.75)";
            navbar.style.padding = "18px 0";
            navbar.style.boxShadow = "none";

        }

    });

}

/* =====================================================
   Scroll To Top Button
===================================================== */

function scrollTopButton() {

    const button = document.getElementById("scrollTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            button.style.display = "block";

        } else {

            button.style.display = "none";

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

/* =====================================================
   Smooth Anchor Scrolling
===================================================== */

function smoothScrolling() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

}

/* =====================================================
   Featured Posters
===================================================== */

async function loadFeaturedPosters() {

    const container = document.getElementById("featuredPosters");

    if (!container) return;

    try {

        const response = await fetch("data/posters.json");

        const posters = await response.json();

        const featured = posters.filter(

            poster => poster.featured === true

        );

        container.innerHTML = "";

        featured.forEach(poster => {

            container.innerHTML += `

            <div class="col-lg-3 col-md-6">

                <div class="poster-card h-100">

                    <img
                        src="${poster.images[0]}"
                        alt="${poster.title}"
                        loading="lazy">

                    <div class="poster-body">

                        <div class="poster-category">

                            ${poster.category}

                        </div>

                        <h5 class="poster-title">

                            ${poster.title}

                        </h5>

                        <div class="d-flex justify-content-between align-items-center mt-3">

                            <span class="poster-price">

                                ₹${poster.sizes.A4}

                            </span>

                            <a
                                href="poster.html?id=${poster.id}"
                                class="btn btn-sm btn-primary rounded-pill">

                                View

                            </a>

                        </div>

                    </div>

                </div>

            </div>

            `;

        });

    } catch (error) {

        console.error("Failed to load featured posters:", error);

    }

}
/* =====================================================
   Hero Mouse Parallax
===================================================== */

function heroParallax() {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    hero.addEventListener("mousemove", e => {

        const x = (window.innerWidth / 2 - e.pageX) / 35;
        const y = (window.innerHeight / 2 - e.pageY) / 35;

        const image = document.querySelector(".hero-image");

        if (image) {

            image.style.transform =
                `translate(${x}px, ${y}px)`;

        }

    });

    hero.addEventListener("mouseleave", () => {

        const image = document.querySelector(".hero-image");

        if (image) {

            image.style.transform = "translate(0,0)";

        }

    });

}

/* =====================================================
   Ripple Effect on Buttons
===================================================== */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(
            this.clientWidth,
            this.clientHeight
        );

        circle.style.width = circle.style.height = diameter + "px";

        circle.style.left =
            e.clientX - this.offsetLeft - diameter / 2 + "px";

        circle.style.top =
            e.clientY - this.offsetTop - diameter / 2 + "px";

        circle.classList.add("ripple");

        const ripple = this.getElementsByClassName("ripple")[0];

        if (ripple) {

            ripple.remove();

        }

        this.appendChild(circle);

    });

});

/* =====================================================
   Current Year (Future Footer)
===================================================== */

const year = document.querySelector("#year");

if (year) {

    year.textContent = new Date().getFullYear();

}