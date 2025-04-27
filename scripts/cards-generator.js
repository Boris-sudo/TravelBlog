document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#travelCardsGrid');
    const generateButton = document.querySelector('#travelGenButton');

    let currentPage = 1;
    const postsPerPage = 3;
    const maxPages = 3;

    const additionalPosts = [
        {
            image: "https://readdy.ai/api/search-image?query=stunning%20view%20of%20Amalfi%20Coast%20with%20colorful%20buildings%2C%20Mediterranean%20Sea%2C%20Italian%20coastal%20landscape%2C%20travel%20photography%2C%20vibrant%20colors%2C%20high-quality%20travel%20photography%20with%20clean%20composition&width=600&height=400&seq=20&orientation=landscape",
            location: "Amalfi Coast, Italy",
            date: "April 18, 2025",
            readTime: "6 min read",
            title: "The Colorful Charm of Amalfi Coast",
            description: "Exploring the dramatic coastline, hidden beaches, and charming villages of Italy's most picturesque coastal region.",
        },
        {
            image: "https://readdy.ai/api/search-image?query=beautiful%20view%20of%20Prague%20Castle%20at%20sunset%2C%20Gothic%20architecture%2C%20Charles%20Bridge%2C%20Czech%20Republic%2C%20travel%20photography%2C%20vibrant%20colors%2C%20high-quality%20travel%20photography%20with%20clean%20composition&width=600&height=400&seq=21&orientation=landscape",
            location: "Prague, Czech Republic",
            date: "April 12, 2025",
            readTime: "7 min read",
            title: "Gothic Splendor in Prague",
            description: "Discovering the magical atmosphere of Prague's historic center, from the Castle District to the Old Town Square.",
        },
        {
            image: "https://readdy.ai/api/search-image?query=scenic%20view%20of%20Scottish%20Highlands%20with%20misty%20mountains%2C%20ancient%20castle%2C%20heather%20fields%2C%20moody%20landscape%2C%20travel%20photography%2C%20dramatic%20scenery%2C%20high-quality%20travel%20photography%20with%20clean%20composition&width=600&height=400&seq=22&orientation=landscape",
            location: "Scottish Highlands",
            date: "April 8, 2025",
            readTime: "8 min read",
            title: "Mystical Scottish Highlands",
            description: "Journey through the rugged landscapes, ancient castles, and mythical lochs of Scotland's stunning highlands.",
        },
        {
            image: "https://readdy.ai/api/search-image?query=beautiful%20view%20of%20Croatian%20coast%20with%20ancient%20walls%2C%20crystal%20clear%20water%2C%20medieval%20architecture%2C%20Dubrovnik%2C%20travel%20photography%2C%20vibrant%20colors%2C%20high-quality%20travel%20photography%20with%20clean%20composition&width=600&height=400&seq=23&orientation=landscape",
            location: "Dubrovnik, Croatia",
            date: "April 5, 2025",
            readTime: "5 min read",
            title: "Walking the Walls of Dubrovnik",
            description: "Exploring the Pearl of the Adriatic, from its iconic city walls to hidden beaches and local cuisine.",
        },
    ];

    function createPostElement(post) {
        return `
            <div class="card">
                <div class="header-image">
                    <img src="${post.image}" alt="Santorini Sunset">
                    <div>
                        ${post.location}
                    </div>
                </div>
                <div class="content">
                    <div>
                        <span>
                            <i class="ri-calendar-line mr-1"></i>
                            ${post.date}
                        </span>
                        <span>•</span>
                        <span>
                            <i class="ri-time-line mr-1"></i>
                            ${post.readTime}
                        </span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                    <div>
                        <a href="#">
                            Read More
                            <i class="ri-arrow-right-line ml-1"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    function showLoading() {
        generateButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        `;
    }

    function hideLoading() {
        generateButton.innerHTML = `
          <i class="ri-refresh-line mr-2"></i>
          Load More Stories
        `;
    }

    function updateLoadMoreButton() {
        if (currentPage >= maxPages) {
            generateButton.disabled = true;
            generateButton.innerHTML = "No More Stories";
        }
    }

    generateButton.addEventListener("click", async function () {
        showLoading();

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const newPosts = additionalPosts.slice(startIndex, endIndex);

        const postsHTML = newPosts.map(createPostElement).join("");
        grid.insertAdjacentHTML("beforeend", postsHTML);

        currentPage++;
        hideLoading();
        updateLoadMoreButton();
    });

})