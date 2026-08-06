/* ==========================================
   Poster Details Page
========================================== */

let posters = [];
let currentPoster = null;

document.addEventListener("DOMContentLoaded", () => {

    loadPoster();

});

/* ==========================================
   Load poster from URL
========================================== */

async function loadPoster() {

    try {

        const params = new URLSearchParams(
            window.location.search
        );

        const posterId = Number(
            params.get("id")
        );

        const response = await fetch(
            "data/posters.json"
        );

        posters = await response.json();

        currentPoster = posters.find(

            poster => poster.id === posterId

        );

        if (!currentPoster) {

            showNotFound();

            return;

        }

        renderPoster(currentPoster);

        renderRelatedPosters(currentPoster);

    }

    catch (error) {

        console.error(error);

    }

}

/* ==========================================
   Render poster
========================================== */

function renderPoster(poster) {

    const container = document.getElementById(
        "posterDetails"
    );

    let imagesHTML = "";

    if (poster.type === "single") {

        imagesHTML = `

            <img
                src="${poster.images[0]}"
                class="img-fluid rounded shadow"
                alt="${poster.title}"
            >

        `;

    }

    else {

        imagesHTML = `

            <div class="row g-2">

                ${poster.images.map(image => `

                    <div class="col">

                        <img
                            src="${image}"
                            class="img-fluid rounded shadow"
                            alt="${poster.title}"
                        >

                    </div>

                `).join("")}

            </div>

        `;

    }

    const sizesHTML = Object.entries(

        poster.sizes

    ).map(

        ([size, price]) => `

            <button
                class="btn btn-outline-primary size-btn me-2 mb-2"
                data-size="${size}"
                data-price="${price}">

                ${size} · ₹${price}

            </button>

        `

    ).join("");

    container.innerHTML = `

        <div class="col-lg-6">

            ${imagesHTML}

        </div>

        <div class="col-lg-6">

            <span class="badge bg-danger">

                ${poster.badge || ""}

            </span>

            <h1 class="mt-3">

                ${poster.title}

            </h1>

            <p class="text-muted">

                ${poster.category}

            </p>

            <p>

                ${poster.description || ""}

            </p>

            <h5 class="mt-4">

                Available Sizes

            </h5>

            <div>

                ${sizesHTML}

            </div>

            <button
                id="whatsappBtn"
                class="btn btn-success btn-lg rounded-pill mt-4">

                Order on WhatsApp

            </button>

        </div>

    `;

    setupWhatsApp(poster);

}

/* ==========================================
   WhatsApp
========================================== */

function setupWhatsApp(poster) {

    const button = document.getElementById(
        "whatsappBtn"
    );

    button.addEventListener("click", () => {

        const selected = document.querySelector(
            ".size-btn.active"
        );

        let size = "A4";
        let price = poster.sizes.A4;

        if (selected) {

            size = selected.dataset.size;
            price = selected.dataset.price;

        }

        const message = `Hi!

I'm interested in:

Poster: ${poster.title}

Type: ${poster.panels} Panel

Size: ${size}

Price: ₹${price}

Can I place an order?`;

        const phone = "919876543210";

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

    });

    const sizeButtons = document.querySelectorAll(
        ".size-btn"
    );

    sizeButtons.forEach(button => {

        button.addEventListener("click", () => {

            sizeButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

        });

    });

}

/* ==========================================
   Related posters
========================================== */

function renderRelatedPosters(current) {

    const container = document.getElementById(
        "relatedPosters"
    );

    if (!container) {

        return;

    }

    const related = posters.filter(

        poster =>

            poster.category === current.category &&
            poster.id !== current.id

    ).slice(0, 4);

    container.innerHTML = "";

    related.forEach(poster => {

        container.innerHTML += `

            <div class="col-lg-3 col-md-6">

                <div class="poster-card">

                    <img
                        src="${poster.images[0]}"
                        class="img-fluid"
                        alt="${poster.title}"
                    >

                    <div class="poster-body p-3">

                        <h5>

                            ${poster.title}

                        </h5>

                        <a
                            href="poster.html?id=${poster.id}"
                            class="btn btn-primary w-100">

                            View Details

                        </a>

                    </div>

                </div>

            </div>

        `;

    });

}

/* ==========================================
   Poster not found
========================================== */

function showNotFound() {

    document.getElementById(
        "posterDetails"
    ).innerHTML = `

        <div class="col-12 text-center">

            <h2>Poster not found</h2>

            <a
                href="posters.html"
                class="btn btn-primary mt-3">

                Back to Posters

            </a>

        </div>

    `;

}