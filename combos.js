

// ================= CART STORAGE =================
let orders = JSON.parse(localStorage.getItem('orders')) || [];

const saveOrdersToLocalStorage = () => {
    localStorage.setItem('orders', JSON.stringify(orders));
};

const addToOrders = (name, price, image, quantity) => {
    if (quantity <= 0) {
        alert("Please select quantity first");
        return;
    }

    const numericPrice = Number(price.toString().replace(/[^0-9.]/g, '')) || 0;

    const existingItem = orders.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        orders.push({ name, price: numericPrice, image, quantity });
    }

    saveOrdersToLocalStorage();

    // ✅ Show alert
    alert(`${quantity} × ${name} added to your cart.`);
};


// ================= UNIVERSAL (DYNAMIC ITEMS) =================
const universal = (items) => {
    const comboContainer = document.querySelector('.exploremore');
    comboContainer.style.display = "block";

    comboContainer.innerHTML = `
        <h4 class="h">Special Finds</h4>
        <button class="remove fas fa-times"></button>
        <p class="p">Indulge in our expertly crafted coffees.</p>
        <hr class="hr">
        <div class="main_container"></div>
    `;

    comboContainer.querySelector(".remove").onclick = () => {
        comboContainer.style.display = "none";
    };

    const mainContainer = comboContainer.querySelector('.main_container');

    items.forEach(item => {
        mainContainer.innerHTML += `
            <div class="special-item">
                <div class="section"
                    data-name="${item.name}"
                    data-price="${item.price}"
                    data-image="${item.image1}">
                    <div class="secmain">
                        <img src="${item.image1}">
                        <h5>${item.name}</h5>
                        <p>${item.price}</p>
                        <div class="quantity">
                            <button class="increment">+</button>
                            <span class="quant">0</span>
                            <button class="decrement">-</button>
                        </div>
                        <a href="#" class="btn b1">Place Order</a>
                    </div>
                </div>
            </div>
        `;
    });
};

// ================= DOM READY =================
document.addEventListener('DOMContentLoaded', () => {

    const placeOrderContainer = document.querySelector(".placeorder_container");
    const viewOrderButton = document.getElementById('plorder3');
    const searchBar = document.getElementById('search-box');
    const searchContainer = document.querySelector('.search-container');
    const searchIcon = document.getElementById('search-icon');
    const wishIcon = document.getElementById('wish-icon');
    const cartIcon = document.getElementById('cart-icon');
    const searchForm = document.querySelector('.search-form');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const wishlistContainer = document.querySelector('.wishlist-container');

    // Initialize - hide place order container by default
    if (placeOrderContainer) {
        placeOrderContainer.style.display = 'none';
    }

    // Initialize - hide search container by default
    if (searchContainer) {
        searchContainer.style.display = 'none';
    }

    // Initialize cart container with empty message
    if (cartItemsContainer) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p>Your cart is empty.</p><div class="img"></div>`;
        }
        cartItemsContainer.style.display = 'none';
    }

    // Initialize wishlist container with empty message
    if (wishlistContainer) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = `<p>Your wishlist is empty.</p><div class="img"></div>`;
        }
        wishlistContainer.style.display = 'none';
    }

    // ================= SEARCH ICON CLICK =================
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            if (searchForm) {
                searchForm.classList.toggle('show');
            }
            if (placeOrderContainer) {
                placeOrderContainer.style.display = 'none';
            }
            if (cartItemsContainer) {
                cartItemsContainer.style.display = 'none';
            }
            if (wishlistContainer) {
                wishlistContainer.style.display = 'none';
            }
        });
    }

    // ================= WISH ICON CLICK =================
    if (wishIcon) {
        wishIcon.addEventListener('click', () => {
            if (wishlistContainer) {
                if (wishlistContainer.style.display === 'block') {
                    wishlistContainer.style.display = 'none';
                } else {
                    // Load wishlist from localStorage
                    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                    wishlistContainer.innerHTML = '';
                    
                    if (wishlist.length === 0) {
                        wishlistContainer.innerHTML = `<p>Your wishlist is empty.</p><div class="img"></div>`;
                    } else {
                        wishlist.forEach((item, index) => {
                            wishlistContainer.innerHTML += `
                                <div class="wish-item">
                                    <img src="${item.image}" alt="${item.name}">
                                    <span>${item.name} - $${item.price}</span>
                                    <button class="remove-button fas fa-times" data-index="${index}"></button>
                                </div>
                            `;
                        });
                        
                        // Add remove event listeners
                        wishlistContainer.querySelectorAll('.remove-button').forEach(btn => {
                            btn.addEventListener('click', () => {
                                const index = btn.getAttribute('data-index');
                                wishlist.splice(index, 1);
                                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                                wishIcon.click(); // Refresh the view
                            });
                        });
                    }
                    
                    wishlistContainer.style.display = 'block';
                    wishlistContainer.style.position = 'fixed';
                }
            }
            if (placeOrderContainer) {
                placeOrderContainer.style.display = 'none';
            }
            if (cartItemsContainer) {
                cartItemsContainer.style.display = 'none';
            }
            if (searchForm) {
                searchForm.classList.remove('show');
            }
        });
    }

    // ================= CART ICON CLICK =================
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            if (cartItemsContainer) {
                if (cartItemsContainer.style.display === 'block') {
                    cartItemsContainer.style.display = 'none';
                } else {
                    // Load cart from localStorage
                    const cart = JSON.parse(localStorage.getItem('cart')) || [];
                    cartItemsContainer.innerHTML = '';
                    
                    if (cart.length === 0) {
                        cartItemsContainer.innerHTML = `<p>Your cart is empty.</p><div class="img"></div>`;
                    } else {
                        cart.forEach((item, index) => {
                            cartItemsContainer.innerHTML += `
                                <div class="cart-item">
                                    <img src="${item.image}" alt="${item.name}">
                                    <span>${item.name} - $${item.price}</span>
                                    <button class="remove-button fas fa-times" data-index="${index}"></button>
                                </div>
                            `;
                        });
                        
                        // Add remove event listeners
                        cartItemsContainer.querySelectorAll('.remove-button').forEach(btn => {
                            btn.addEventListener('click', () => {
                                const index = btn.getAttribute('data-index');
                                cart.splice(index, 1);
                                localStorage.setItem('cart', JSON.stringify(cart));
                                cartIcon.click(); // Refresh the view
                            });
                        });
                    }
                    
                    cartItemsContainer.style.display = 'block';
                    cartItemsContainer.style.position = 'fixed';
                }
            }
            if (placeOrderContainer) {
                placeOrderContainer.style.display = 'none';
            }
            if (wishlistContainer) {
                wishlistContainer.style.display = 'none';
            }
            if (searchForm) {
                searchForm.classList.remove('show');
            }
        });
    }

    // ================= EVENT DELEGATION =================
document.addEventListener('click', function (e) {

    // ================= INCREMENT =================
    const incBtn = e.target.closest('.increment');
    if (incBtn) {
        e.preventDefault();
        e.stopPropagation();

        const quantitySpan = incBtn.closest('.quantity').querySelector('.quant');
        quantitySpan.textContent = Number(quantitySpan.textContent) + 1;
        return;
    }

    // ================= DECREMENT =================
    const decBtn = e.target.closest('.decrement');
    if (decBtn) {
        e.preventDefault();
        e.stopPropagation();

        const quantitySpan = decBtn.closest('.quantity').querySelector('.quant');
        quantitySpan.textContent = Math.max(0, Number(quantitySpan.textContent) - 1);
        return;
    }

    // ================= ADD TO CART =================
    const addBtn = e.target.closest('.b1');
    if (addBtn) {
        e.preventDefault();

        const section = addBtn.closest('.section, .menu-box');
        if (!section) return;

        const quantitySpan = section.querySelector('.quant');
        const quantity = Number(quantitySpan.textContent);

        if (quantity <= 0) {
            alert("Please select quantity first");
            return;
        }

        addToOrders(
            section.dataset.name,
            section.dataset.price,
            section.dataset.image,
            quantity
        );

        quantitySpan.textContent = '0';
    }

    // ================= REMOVE FROM ORDER =================
    const removeBtn = e.target.closest('.remove-button');
    if (removeBtn) {
        e.preventDefault();
        const index = removeBtn.getAttribute('data-index');
        orders.splice(index, 1);
        saveOrdersToLocalStorage();
        renderOrders();  // Re-render the order list
    }

});




    // ================= VIEW ORDER TOGGLE =================

    let isOrderOpen = false;
        viewOrderButton.addEventListener('click', () => {

            if (!isOrderOpen) {
                renderOrders();                 // render ONLY when opening
                placeOrderContainer.classList.add('open');
                placeOrderContainer.style.display = 'block';
                isOrderOpen = true;
            } else {
                placeOrderContainer.classList.remove('open');
                placeOrderContainer.style.display = 'none';
                isOrderOpen = false;
            }

        });



        // ================= UPDATE TOTALS =================
       const updateTotals = () => {
    const totalQtyEl = document.querySelector('.total .qty');
    const totalPriceEl = document.querySelector('.total .t-price');
    const gstEl = document.querySelector('.total .tgst');
    const finalPriceEl = document.querySelector('.total .f-price');

    if (!totalQtyEl || !totalPriceEl || !gstEl || !finalPriceEl) return;

    let totalQty = 0;
    let totalPrice = 0;

    orders.forEach(item => {
        totalQty += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    const gst = +(totalPrice * 0.18).toFixed(2);
    const finalPrice = +(totalPrice + gst).toFixed(2);

    totalQtyEl.textContent = totalQty;
    totalPriceEl.textContent = `₹${totalPrice.toFixed(2)}`;
    gstEl.textContent = `₹${gst.toFixed(2)}`;
    finalPriceEl.textContent = `₹${finalPrice.toFixed(2)}`;
};

const renderOrders = () => {
    const itemsContainer = document.querySelector('.plordercont');
    itemsContainer.innerHTML = '';


     if (orders.length === 0) {
        itemsContainer.innerHTML = `
            <p>Your order list is empty.</p>
            <div class="img"></div>`;
            updateTotals(); // Ensure totals are updated
        return;
    }

    orders.forEach((item, index) => {
        itemsContainer.innerHTML += `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="order-info">
                    <span class="order-name">${item.name}</span>
                    <span class="order-qty">${item.quantity} × ₹${item.price}</span>
                </div>
                <button class="remove-button" data-index="${index}">✕</button>
            </div>
        `;
    });

    updateTotals();
};


    // ================= SEARCH =================
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase().trim();

        searchContainer.innerHTML = `
            <button class="remove fas fa-times"></button>
            <div class="search-results-box"></div>
        `;

        const resultsBox = searchContainer.querySelector('.search-results-box');

        if (!query) {
            searchContainer.style.display = 'none';
            return;
        }

        searchContainer.style.display = 'block';

        let found = false;

        // Search in both .menu-box (index.html) and .section (specialcombos.html)
        document.querySelectorAll('.menu-box, .section').forEach(item => {
            const name = item.querySelector('.name')?.textContent.toLowerCase();
            if (name && name.includes(query)) {
                const clonedItem = item.cloneNode(true);
                resultsBox.appendChild(clonedItem);
                found = true;
            }
        });

        if (!found) {
            resultsBox.innerHTML = `<p>No results found</p>`;
        }

        searchContainer.querySelector('.remove').onclick = () => {
            searchContainer.style.display = 'none';
            searchBar.value = '';
        };
    });


    // ================= CLOSE CONTAINERS ON SCROLL =================
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;

        // Close containers only when scrolling down
        if (currentScroll > lastScrollTop) {
            // Close place order container
            if (placeOrderContainer && placeOrderContainer.style.display === 'block') {
                placeOrderContainer.style.display = 'none';
                isOrderOpen = false;
            }

            // Close search container
            if (searchContainer && searchContainer.style.display === 'block') {
                searchContainer.style.display = 'none';
                searchBar.value = '';
            }
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

});

































// for seasonspecial

const seasonspbtn = document.getElementById('seasonsp');

const seasonspecial = [
    {
        name: "Soothing Decaf Brew",
        image1: "images/combosp13.webp",
        price: "$150",
        price1:"$200",
    },
    {
        name: "Iced Mocha",
        image1: "images/combosp12.jpg",
        price: "$100",
        price1: "$150",
    },
    {
        name: "Frozen Frappe",
        image1: "images/combosp14.jpg",
        price: "$99",
        price1: "$200",
    },
    {
        name: "Chilled Coffee Elixir",
        image1: "images/combosp6.jpeg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Vanilla Bean Coffee",
        image1: "images/combosp1.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Cold Brew Frost",
        image1: "images/combosp10.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Milk cold Coffee",
        image1: "images/combosp3.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Almond Latte",
        image1: "images/combosp11.jpg",
        price: "$150",
        price1: "$200",
    },

]


seasonspbtn.addEventListener("click",()=>{
   universal(seasonspecial);

});



// forbuy1get1

const by1get1 = [
    {
        name: "strawberry and vanila shake",
        image1: "images/comboby1get1.5.jpg",
        price: "$150",
        price1:"$200",
    },
    {
        name: "Iced Mocha",
        image1: "images/comboby1get1.6.jpeg",
        price: "$100",
        price1: "$150",
    },
    {
        name: "Frozen Frappe",
        image1: "images/comboby1get1.jpg",
        price: "$99",
        price1: "$200",
    },
    {
        name: "Chilled Coffee Elixir",
        image1: "images/comboby1get1.9.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Vanilla Bean Coffee",
        image1: "images/comboby1get1.10.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Cold Brew Frost",
        image1: "images/comboby1get1.11.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Milk Hot Coffee",
        image1: "images/comboby1get1.12.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Almond Latte",
        image1: "images/comboby1get1.13.jpg",
        price: "$150",
        price1: "$200",
    },

]


const by1get1btn = document.getElementById('by1get1');

by1get1btn.addEventListener("click",()=>{
    universal(by1get1);
});


// loyalty card 

const loyalcard = [
    {
        name: "Iced Latte",
        image1: "images/combo5.jpeg",
        price: "$150",
        price1:"$200",
    },
    {
        name: "Iced Mocha",
        image1: "images/combo6.jpeg",
        price: "$100",
        price1: "$150",
    },
    {
        name: "Frozen Frappe",
        image1: "images/combo7.jpeg",
        price: "$99",
        price1: "$200",
    },
    {
        name: "Chilled Coffee Elixir",
        image1: "images/combo8.jpeg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "coffee Bean Cake",
        image1: "images/combo22.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Cold Brew Frost",
        image1: "images/combo10.jpeg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Cold Coffee with pizza",
        image1: "images/combo13.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "special combo lunch",
        image1: "images/combo14.jpg",
        price: "$150",
        price1: "$200",
    },

]

const loyalcardbtn = document.getElementById('loyaltycard');

loyalcardbtn.addEventListener("click",()=>{
    universal(loyalcard);
 });


 
// morning food

const Morningfood = [
    {
        name: "Iced Latte",
        image1: "images/combom5.jpg",
        price: "$150",
        price1:"$200",
    },
    {
        name: "Iced Mocha",
        image1: "images/combom6.jpg",
        price: "$100",
        price1: "$150",
    },
    {
        name: "Frozen Frappe",
        image1: "images/combom13.jpg",
        price: "$99",
        price1: "$200",
    },
    {
        name: "Chilled Coffee Elixir",
        image1: "images/combom8.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Vanilla Bean Coffee",
        image1: "images/combom9.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Cold Brew Frost",
        image1: "images/combom10.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Milk Hot Coffee",
        image1: "images/combom11.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Almond Latte",
        image1: "images/combom12.jpg",
        price: "$150",
        price1: "$200",
    },

]

const morningbtn = document.getElementById('Morningfood');
morningbtn.addEventListener("click",()=>{
    universal(Morningfood);
 });


// afternoon food

const lunchfood = [
    {
        name: "Iced Latte",
        image1: "images/combol5.jpg",
        price: "$150",
        price1:"$200",
    },
    {
        name: "Iced Mocha",
        image1: "images/combol6.jpg",
        price: "$100",
        price1: "$150",
    },
    {
        name: "Frozen Frappe",
        image1: "images/combol7.jpg",
        price: "$99",
        price1: "$200",
    },
    {
        name: "Chilled Coffee Elixir",
        image1: "images/combol8.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Vanilla Bean Coffee",
        image1: "images/combol9.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Cold Brew Frost",
        image1: "images/combol10.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Milk Hot Coffee",
        image1: "images/combol11.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Almond Latte",
        image1: "images/combo14.jpg",
        price: "$150",
        price1: "$200",
    },

]

const lunchbtn = document.getElementById('lunchfood');
lunchbtn.addEventListener("click",()=>{
    universal(lunchfood);
 });



 // evening food


 const eveningfood = [
    {
        name: "Iced Latte",
        image1: "images/comboed5.jpg",
        price: "$150",
        price1:"$200",
    },
    {
        name: "Iced Mocha",
        image1: "images/comboed6.jpg",
        price: "$100",
        price1: "$150",
    },
    {
        name: "Frozen Frappe",
        image1: "images/comboed7.jpg",
        price: "$99",
        price1: "$200",
    },
    {
        name: "Chilled Coffee Elixir",
        image1: "images/comboed8.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Vanilla Bean Coffee",
        image1: "images/comboed1.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Cold Brew Frost",
        image1: "images/comboed2.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Milk Hot Coffee",
        image1: "images/comboed11.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Almond Latte",
        image1: "images/comboed12.jpg",
        price: "$150",
        price1: "$200",
    },

]

const eveningbtn = document.getElementById('eveningfood');
eveningbtn.addEventListener("click",()=>{
    universal(eveningfood);
 });


 // dessert food

 const dessertfood = [
    {
        name: "Iced Latte",
        image1: "images/combobakery5.jpg",
        price: "$150",
        price1:"$200",
    },
    {
        name: "Iced Mocha",
        image1: "images/combobakery6.jpg",
        price: "$100",
        price1: "$150",
    },
    {
        name: "Frozen Frappe",
        image1: "images/combobakery7.jpg",
        price: "$99",
        price1: "$200",
    },
    {
        name: "Chilled Coffee Elixir",
        image1: "images/combobakery8.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Vanilla Bean Coffee",
        image1: "images/combobakery9.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Cold Brew Frost",
        image1: "images/combobakery10.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Milk Hot Coffee",
        image1: "images/combobakery11.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Almond Latte",
        image1: "images/combobakery12.jpg",
        price: "$150",
        price1: "$200",
    },

]

const dessertbtn = document.getElementById('dessertfood');
dessertbtn.addEventListener("click",()=>{
    universal(dessertfood);
 });


 // ice cream

 const icecreamfood = [
    {
        name: "Iced Latte",
        image1: "images/comboicecream5.jpg",
        price: "$150",
        price1:"$200",
    },
    {
        name: "Iced Mocha",
        image1: "images/comboicecream6.jpg",
        price: "$100",
        price1: "$150",
    },
    {
        name: "Frozen Frappe",
        image1: "images/comboicecream7.jpg",
        price: "$99",
        price1: "$200",
    },
    {
        name: "Chilled Coffee Elixir",
        image1: "images/comboicecream8.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Vanilla Bean Coffee",
        image1: "images/comboicecream9.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Cold Brew Frost",
        image1: "images/comboicecream10.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Milk Hot Coffee",
        image1: "images/comboicecream11.jpg",
        price: "$150",
        price1: "$200",
    },
    {
        name: "Iced Almond Latte",
        image1: "images/comboicecream12.jpg",
        price: "$150",
        price1: "$200",
    },

]

const icecreambtn = document.getElementById('icecreamfood');
icecreambtn.addEventListener("click",()=>{
    universal(icecreamfood);
 });




 /*
const universal = (a) =>{

    const combo_container = document.querySelector('.exploremore');
    combo_container.style.display = "block";
    combo_container.innerHTML = " ";
    combo_container.innerHTML = `
        <h4 class="h">Special Finds</h4>
        <button class="remove fas fa-times"></button>
        <p class="p">Indulge in our expertly crafted coffees,refreshing drinks, and delicious, freshly prepared foods.Welcome to a taste of comfort and quality.</p>
        <hr class="hr">
    `;
    const btn = document.querySelector(".remove");
    btn.addEventListener("click",()=>{
        combo_container.style.display = "none";
    });

    const main_container = document.createElement('div');
    main_container.className = 'main_container';

    main_container.innerHTML = "";

    a.forEach(item => {
    const special_container = document.createElement('div');
    special_container.className = 'special-item';

    special_container.innerHTML = `
        <div class="sec1">
        <div class="section" data-name="${item.name}" data-price="${item.price}" data-image="${item.image1}">
        <h4>Signature Sips</h4>
        <div class="secmain">
        <div class="img">
        <img src="${item.image1}" alt="${item.name}"/>
        </div>
        <h5>${item.name}</h5>
        <p>${item.price} <span> ${item.price1}</span></p>
        <div class="quantity">
            <button class="increment">+</button>
            <span class="quant">0</span>
            <button class="decrement">-</button>
            </div>
        <a href="#" class="btn b1 b5">place order</a>
        </div>
        </div>
       </div>
    `;
      main_container.appendChild(special_container);
    });

    combo_container.appendChild(main_container); 

    // Attach event listeners to dynamically added 'Place Order' buttons
    main_container.querySelectorAll('.b1').forEach(button => {
        button.addEventListener('click', function (event) {
          event.preventDefault();
          const foodItem = this.closest('.section');
          const itemName = foodItem.getAttribute('data-name');
          const itemPrice = foodItem.getAttribute('data-price');
          const itemImage = foodItem.getAttribute('data-image');
          const quantity = parseInt(foodItem.querySelector('.quant').textContent, 10);
          addToOrder(itemName, itemPrice, itemImage,quantity);
        });
      });

}

const orders = [];
const addToOrder = (name, price, image,quantity) => {
    orders.push({name, price, image, quantity});
};

 // for place your order

document.addEventListener('DOMContentLoaded', () => {
    const placeorder_container = document.querySelector(".placeorder_container");
    const placeorder = document.querySelectorAll('.b1');
    const vieworder = document.getElementById('plorder3')

    placeorder.forEach(button => {
        button.addEventListener('click', () => {
            const item1 = button.closest('.section');
            const name = item1.getAttribute('data-name');
            const price = item1.getAttribute('data-price');
            const image = item1.getAttribute('data-image');
            const quantity = parseInt(item1.querySelector('.quant').textContent, 10);

            if (quantity > 0) {
                const existingItem = orders.find(item => item.name === name);

                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    addToOrder(name, price, image, quantity);
                }

                alert(`${quantity}x ${name} added to your order.`);
                item1.querySelector('.quant').textContent = '0'; // Reset quantity after order
            } else {
                alert("Please select a quantity before placing the order.");
            }
            // addToOrder(item1Name, item1Price, item1Image);
        });
    });

       vieworder.addEventListener('click', () => {
           placeorder_container.innerHTML = '';
           if (orders.length === 0) {
               placeorder_container.innerHTML = `<p>Your order list is empty.</p>
               <div class="img"> </div>`;
           } 
           else {
               orders.forEach((item, index) => {
                   const orderItem = document.createElement('div');
                   orderItem.className = 'order-item';
                   orderItem.innerHTML = `
                       <img src="${item.image}" alt="${item.name}">
                       <span>${item.quantity}x ${item.name} - $${item.price}</span>
                       <button class="remove-button" data-index="${index}">cancel order</button>  
                   `;
               placeorder_container.appendChild(orderItem);
               });
               const removeButtons = document.querySelectorAll('.remove-button');
               removeButtons.forEach(button => {
                   button.addEventListener('click', () => {
                       const index = button.getAttribute('data-index');
                       orders.splice(index, 1);
                       vieworder.click();
                   });
               });
           }
           placeorder_container.style.display = 'block';
       })
   })


   */