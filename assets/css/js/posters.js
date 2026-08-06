/* =====================================
   PosterVerse Gallery
===================================== */

let posters = [];

let filteredPosters = [];

let visibleItems = 8;

/* ========================= */

document.addEventListener("DOMContentLoaded", () => {

    loadPosters();

});

/* ========================= */

async function loadPosters() {

    document.getElementById("loading").classList.remove("d-none");

    const response = await fetch("data/posters.json");

    posters = await response.json();

    filteredPosters = posters;

    renderPosters();

    setupSearch();

    setupCategories();

    setupSorting();

    setupLoadMore();

    document.getElementById("loading").classList.add("d-none");

}

/* ========================= */

function renderPosters() {

    const container = document.getElementById("posterContainer");

    container.innerHTML = "";

    document.getElementById("posterCount").textContent =
        filteredPosters.length;

    filteredPosters
        .slice(0, visibleItems)
        .forEach(createPosterCard);

}

/* ========================= */

function createPosterCard(poster) {

    const container =
        document.getElementById("posterContainer");

    container.innerHTML += `

<div class="col-lg-3 col-md-4 col-sm-6">

<div class="poster-card">

<img
src="${poster.image}"
alt="${poster.title}"
loading="lazy">

<div class="poster-body">

<div class="poster-category">

${poster.category}

</div>

<h5 class="poster-title">

${poster.title}

</h5>

<div class="mb-2">

${poster.badge
? `<span class="badge bg-danger">${poster.badge}</span>`
: ""}

</div>

<div class="poster-price">

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

/* ========================= */

function setupSearch() {

    const input =
        document.getElementById("searchInput");

    input.addEventListener("input", () => {

        const value =
            input.value.toLowerCase();

        filteredPosters =
            posters.filter(p =>

                p.title.toLowerCase().includes(value) ||

                p.category.toLowerCase().includes(value) ||

                p.series.toLowerCase().includes(value)

            );

        visibleItems = 8;

        renderPosters();

    });

}

/* ========================= */

function setupCategories() {

    document
        .querySelectorAll(".category-btn")

        .forEach(button => {

            button.addEventListener("click", () => {

                document
                    .querySelectorAll(".category-btn")

                    .forEach(btn =>
                        btn.classList.remove("active"));

                button.classList.add("active");

                const category =
                    button.dataset.category;

                if (category === "All") {

                    filteredPosters = posters;

                } else {

                    filteredPosters =
                        posters.filter(p =>
                            p.category === category);

                }

                visibleItems = 8;

                renderPosters();

            });

        });

}

/* ========================= */

function setupSorting() {

    const sort =
        document.getElementById("sortSelect");

    sort.addEventListener("change", () => {

        switch (sort.value) {

            case "az":

                filteredPosters.sort((a,b)=>

                    a.title.localeCompare(b.title));

                break;

            case "za":

                filteredPosters.sort((a,b)=>

                    b.title.localeCompare(a.title));

                break;

            case "low":

                filteredPosters.sort((a,b)=>

                    a.sizes.A4-b.sizes.A4);

                break;

            case "high":

                filteredPosters.sort((a,b)=>

                    b.sizes.A4-a.sizes.A4);

                break;

            default:

                filteredPosters.sort((a,b)=>

                    a.id-b.id);

        }

        renderPosters();

    });

}

/* ========================= */

function setupLoadMore() {

    document
        .getElementById("loadMoreBtn")

        .addEventListener("click", () => {

            visibleItems += 8;

            renderPosters();

        });

}