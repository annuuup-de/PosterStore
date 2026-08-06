/* ==========================================
   PosterVerse Gallery
========================================== */

let posters = [];
let filteredPosters = [];

let visibleItems = 8;

/* ==========================================
   Start
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadPosters();

});

/* ==========================================
   Load posters.json
========================================== */

async function loadPosters() {

    try {

        document
            .getElementById("loading")
            .classList.remove("d-none");

        const response = await fetch("data/posters.json");

        posters = await response.json();

        filteredPosters = [...posters];

        renderPosters();

        setupSearch();

        setupCategories();

        setupSorting();

        setupLoadMore();

        applyCategoryFromURL();

    } catch (error) {

        console.error("Failed to load posters:", error);

    } finally {

        document
            .getElementById("loading")
            .classList.add("d-none");

    }

}

/* ==========================================
   Render Posters
========================================== */

function renderPosters() {

    const container = document.getElementById("posterContainer");

    container.innerHTML = "";

    document.getElementById("posterCount").textContent =
        filteredPosters.length;

    const postersToShow = filteredPosters.slice(
        0,
        visibleItems
    );

    postersToShow.forEach(createPosterCard);

    toggleLoadMoreButton();

}

/* ==========================================
   Create Poster Card
========================================== */

function createPosterCard(poster) {

    const container = document.getElementById(
        "posterContainer"
    );

    const typeBadge = poster.type === "single"
        ? "🖼 Single"
        : `🧩 ${poster.panels} Panel`;

    const image = poster.images[0];

    const badgeHTML = poster.badge
        ? `<span class="badge bg-danger ms-1">${poster.badge}</span>`
        : "";

    container.innerHTML += `

    <div class="col-lg-3 col-md-4 col-sm-6">

        <div class="poster-card h-100 shadow-sm">

            <img
                src="${image}"
                alt="${poster.title}"
                class="img-fluid"
                loading="lazy"
            >

            <div class="poster-body p-3">

                <div class="mb-2">

                    <span class="badge bg-dark">

                        ${typeBadge}

                    </span>

                    ${badgeHTML}

                </div>

                <div class="poster-category text-muted small">

                    ${poster.category}

                </div>

                <h5 class="poster-title mt-2">

                    ${poster.title}

                </h5>

                <div class="poster-price fw-bold fs-5">

                    ₹${poster.sizes.A4}

                </div>

                <div class="mt-3">

                    <a
                        href="poster.html?id=${poster.id}"
                        class="btn btn-primary rounded-pill w-100">

                        View Details

                    </a>

                </div>

            </div>

        </div>

    </div>

    `;

}

/* ==========================================
   Search
========================================== */

function setupSearch() {

    const input = document.getElementById(
        "searchInput"
    );

    input.addEventListener("input", () => {

        const value = input.value.toLowerCase();

        filteredPosters = posters.filter(poster => {

            return (

                poster.title.toLowerCase().includes(value) ||

                poster.category.toLowerCase().includes(value) ||

                (poster.series || "")
                    .toLowerCase()
                    .includes(value) ||

                (poster.description || "")
                    .toLowerCase()
                    .includes(value)

            );

        });

        visibleItems = 8;

        renderPosters();

    });

}

/* ==========================================
   Category Filter
========================================== */

function setupCategories() {

    const buttons = document.querySelectorAll(
        ".category-btn"
    );

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            const category =
                button.dataset.category;

            if (category === "All") {

                filteredPosters = [...posters];

            } else {

                filteredPosters = posters.filter(

                    poster =>
                        poster.category === category

                );

            }

            visibleItems = 8;

            renderPosters();

        });

    });

}

/* ==========================================
   Sorting
========================================== */

function setupSorting() {

    const sort = document.getElementById(
        "sortSelect"
    );

    sort.addEventListener("change", () => {

        switch (sort.value) {

            case "az":

                filteredPosters.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );

                break;

            case "za":

                filteredPosters.sort((a, b) =>
                    b.title.localeCompare(a.title)
                );

                break;

            case "low":

                filteredPosters.sort((a, b) =>
                    a.sizes.A4 - b.sizes.A4
                );

                break;

            case "high":

                filteredPosters.sort((a, b) =>
                    b.sizes.A4 - a.sizes.A4
                );

                break;

            default:

                filteredPosters.sort((a, b) =>
                    a.id - b.id
                );

        }

        renderPosters();

    });

}

/* ==========================================
   Load More
========================================== */

function setupLoadMore() {

    const button = document.getElementById(
        "loadMoreBtn"
    );

    button.addEventListener("click", () => {

        visibleItems += 8;

        renderPosters();

    });

}

/* ==========================================
   Hide / Show Load More Button
========================================== */

function toggleLoadMoreButton() {

    const button = document.getElementById(
        "loadMoreBtn"
    );

    if (visibleItems >= filteredPosters.length) {

        button.classList.add("d-none");

    } else {

        button.classList.remove("d-none");

    }

}

function applyCategoryFromURL() {

    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");

    if (!category) return;

    filteredPosters = posters.filter(

        poster => poster.category === category

    );

    document
        .querySelectorAll(".category-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });

    const activeButton = document.querySelector(

        `[data-category="${category}"]`

    );

    if (activeButton) {

        activeButton.classList.add("active");

    }

    renderPosters();

}