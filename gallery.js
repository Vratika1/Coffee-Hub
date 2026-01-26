

document.addEventListener("DOMContentLoaded", () => {

    /* ================= IMAGE ENLARGE ================= */
    const images = document.querySelectorAll(".sec1 .img img");
    const enlargeContainer = document.querySelector(".enlargeImg_cont");

    const enlargedImg = document.createElement("img");
    enlargedImg.className = "enlarged-image";

    const downloadBtn = document.createElement("a");
    downloadBtn.className = "download-btn";
    downloadBtn.innerHTML = `<i class="fa fa-download"></i>`;
    downloadBtn.setAttribute("download", "image.jpg");

    const closeBt = document.createElement("button");
    closeBt.className = "close-bt";
    closeBt.innerHTML = `<i class="fas fa-times"></i>`;

    if (enlargeContainer) {
        enlargeContainer.append(enlargedImg, downloadBtn, closeBt);
    }

    images.forEach(img => {
        img.addEventListener("click", () => {
            enlargedImg.src = img.src;
            downloadBtn.href = img.src;
            enlargeContainer.classList.add("visible");
        });
    });

    closeBt.onclick = () => enlargeContainer.classList.remove("visible");
    enlargeContainer.onclick = (e) => {
        if (e.target === enlargeContainer) enlargeContainer.classList.remove("visible");
    };

    /* ================= CART & WISHLIST ================= */
    const cartItemsContainer = document.querySelector(".cart-items-container");
    const wishlistContainer = document.querySelector(".wishlist-container");

    const updateCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = cart.length
            ? cart.map((item, i) => `
                <div class="cart-item">
                    <img src="${item.image}">
                    <span>${item.name} - $${item.price}</span>
                    <button class="remove-button" data-i="${i}">×</button>
                </div>
            `).join("")
            : "<p>Your cart is empty</p>";

        cartItemsContainer.querySelectorAll(".remove-button").forEach(btn => {
            btn.onclick = () => {
                cart.splice(btn.dataset.i, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            };
        });
    };

    const updateWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlistContainer.innerHTML = wishlist.length
            ? wishlist.map((item, i) => `
                <div class="wish-item">
                    <img src="${item.image}">
                    <span>${item.name} - $${item.price}</span>
                    <button class="remove-button" data-i="${i}">×</button>
                </div>
            `).join("")
            : "<p>Your wishlist is empty</p>";

        wishlistContainer.querySelectorAll(".remove-button").forEach(btn => {
            btn.onclick = () => {
                wishlist.splice(btn.dataset.i, 1);
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                updateWishlist();
            };
        });
    };

    updateCart();
    updateWishlist();

    /* ================= SEARCH ================= */
    const searchBar = document.getElementById("search-box");
    const searchContainer = document.querySelector(".search-container");
    const resultsBox = searchContainer.querySelector(".search-results-box");

    searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase().trim();

        if (!query) {
            searchContainer.style.display = "none";
            return;
        }

        searchContainer.style.display = "block";
        resultsBox.innerHTML = "";
        let found = false;

        // Search gallery images
        document.querySelectorAll(".sec1 .img img").forEach(img => {
            if (img.alt.toLowerCase().includes(query)) {
                const div = document.createElement("div");
                div.className = "search-result-item";
                div.innerHTML = `<img src="${img.src}"><p>${img.alt}</p>`;
                div.onclick = () => {
                    enlargedImg.src = img.src;
                    downloadBtn.href = img.src;
                    enlargeContainer.classList.add("visible");
                    searchContainer.style.display = "none";
                };
                resultsBox.appendChild(div);
                found = true;
            }
        });

        // Search products
        document.querySelectorAll(".menu-box, .section").forEach(item => {
            const name = item.querySelector(".name")?.textContent.toLowerCase();
            if (name && name.includes(query)) {
                resultsBox.appendChild(item.cloneNode(true));
                found = true;
            }
        });

        if (!found) {
            resultsBox.innerHTML = "<p style='color:white;text-align:center'>No results found</p>";
        }
    });

    document.querySelector(".search-container .remove").onclick = () => {
        searchContainer.style.display = "none";
        searchBar.value = "";
    };

});
