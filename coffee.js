const navbar = document.querySelector(".navbar");
const anchor_list_container = document.querySelector(".anchor-list-container");
const cart_item_container = document.querySelector(".cart-items-container");
const search_form =document.querySelector(".search-form");
const wishlist_container = document.querySelector(".wishlist-container");
const order_container = document.querySelector(".order_container");
const account_container = document.querySelector(".account_container");
const placeorder_container = document.querySelector(".placeorder_container");
const search_container = document.querySelector(".search-container");

document.querySelector("#more1").onclick = () =>{
    order_container.classList.toggle('o2');
    account_container.classList.remove('ac');
    anchor_list_container.classList.remove('anchor-active');
    cart_item_container.classList.remove('active');
    search_form.classList.remove('show');
    wishlist_container.classList.remove('wish-active');
    cart_item_container.style.display = 'none';
    wishlist_container.style.display = 'none';
    placeorder_container.classList.remove('plo3');
    placeorder_container.style.display = 'none';
}

document.querySelector("#m1").onclick = () =>{
    account_container.classList.toggle('ac');
    order_container.classList.remove('o2');
    anchor_list_container.classList.remove('anchor-active');
    cart_item_container.classList.remove('active');
    search_form.classList.remove('show');
    wishlist_container.classList.remove('wish-active');
    cart_item_container.style.display = 'none';
    wishlist_container.style.display = 'none';
    placeorder_container.classList.remove('plo3');
    placeorder_container.style.display = 'none';
}


document.querySelector("#menu-icon").onclick = () =>{

    anchor_list_container.classList.toggle("anchor-active");
    cart_item_container.classList.remove("active");
    account_container.classList.remove("ac");
    order_container.classList.remove("o2");
    search_form.classList.remove("show");
    wishlist_container.classList.remove("wish-active");
    placeorder_container.classList.remove("plo3");
    cart_item_container.style.display = 'none';
    placeorder_container.style.display = 'none';
    wishlist_container.style.display = 'none';

}

document.getElementById("search-icon").onclick = () =>{
    search_form.classList.toggle('show');
    order_container.classList.remove('o2');
    account_container.classList.remove('ac');
    anchor_list_container.classList.remove('anchor-active');
    cart_item_container.classList.remove('active');
    cart_item_container.style.display = 'none';
    wishlist_container.classList.remove('wish-active');
    wishlist_container.style.display = 'none';
    placeorder_container.classList.remove('plo3');
    placeorder_container.style.display = 'none';
}


window.onscroll = () =>{
    anchor_list_container.classList.remove('anchor-active');
    cart_item_container.classList.remove('active');
    account_container.classList.remove('ac');
    search_form.classList.remove('show');
    order_container.classList.remove('o2');
    cart_item_container.style.display = 'none';
    wishlist_container.classList.remove('wish-active');
    wishlist_container.style.display = 'none';
    placeorder_container.classList.remove('plo3');
    placeorder_container.style.display = 'none';
}





// adding wishlist items

document.addEventListener('DOMContentLoaded', () => {

    
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistButtons = document.querySelectorAll('.fas.fa-heart');
    const viewwishlistButton = document.getElementById('wish-icon');
   
     // Function to save wishlist to localStorage
    const saveWishlist = () => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    };

    // Function to add item to wishlist
    const addToWishlist = (name, price, image) => {
        const existingItem = wishlist.find(item => item.name === name);
        if (!existingItem) {
            wishlist.push({ name, price, image });
            saveWishlist();
            alert(`${name} has been added to your wishlist.`);
        } else {
            alert(`${name} is already in your wishlist.`);
        }
    };

    wishlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const items = button.closest('.product-1-box');
            const itemsName = items.getAttribute('data-name');
            const itemsPrice = items.getAttribute('data-price');
            const itemsImage = items.getAttribute('data-image');
            addToWishlist(itemsName, itemsPrice, itemsImage);
        });
    });

    const toggleEle = viewwishlistButton.addEventListener('click', () => {
        wishlist_container.innerHTML = '';
        if (wishlist.length === 0) {
            wishlist_container.innerHTML = `<p>Your wishlist is empty.</p>
            <div class="img"> </div>`;
        } 
        else {
            wishlist.forEach((item, index) => {
                const wishlistItem = document.createElement('div');
                wishlistItem.className = 'wish-item';
                wishlistItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <span>${item.name} - $${item.price}</span>
                    <button class="remove-button fas fa-times" data-index="${index}"></button>
                `;
               wishlist_container.appendChild(wishlistItem);

            });


            const removeButtons = document.querySelectorAll('.remove-button');
            removeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const index = button.getAttribute('data-index');
                    wishlist.splice(index, 1);
                    saveWishlist();
                    viewwishlistButton.click();
                });
            });
        }
        wishlist_container.style.display = 'block';
        wishlist_container.style.position = 'fixed';
        account_container.classList.remove('ac');
        order_container.classList.remove('o2');
        anchor_list_container.classList.remove('anchor-active');
        search_form.classList.remove('show');
        cart_item_container.style.display = 'none';
        placeorder_container.style.display = 'none';


        viewwishlistButton.removeEventListener("click", toggleEle);
        viewwishlistButton.addEventListener("click", resetEle);
    });

    
    function resetEle() {
    
        // Reset the clicked element
        wishlist_container.style.display = 'none';
        
        // Swap the event listener back to toggle
        viewwishlistButton.removeEventListener("click", resetEle);
        viewwishlistButton.addEventListener("click", toggleEle);
    }

});


// for cart container add to cart 
document.addEventListener('DOMContentLoaded', () => {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const addToCartButtons = document.querySelectorAll('.fas.fa-cart-shopping');
    const viewCartButton = document.getElementById('cart-icon');
   

    // Function to save cart to localStorage
    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.product-1-box');
            const itemName = item.getAttribute('data-name');
            const itemPrice = item.getAttribute('data-price');
            const itemImage = item.getAttribute('data-image');
            
            const existingItem = cart.find(cartItem => cartItem.name === itemName);
            if (existingItem) {
                alert(`${itemName} is already in your cart.`);
            } else {
                cart.push({ name: itemName, price: itemPrice, image: itemImage });
                saveCart();
                alert(`${itemName} has been added to your cart.`);
            }
        });
    });

    const toggleEle = viewCartButton.addEventListener('click', () => {
        cart_item_container.innerHTML = '';
        if (cart.length === 0) {
            cart_item_container.innerHTML = `<p>Your cart is empty.</p>
            <div class="img"> </div>`;
        } 
        else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <span>${item.name} - $${item.price}</span>
                    <button class="remove-button fas fa-times" data-index="${index}"></button>
                `;
                cart_item_container.appendChild(cartItem);

            });

            const removeButtons = document.querySelectorAll('.remove-button');
            removeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const index = button.getAttribute('data-index');
                    cart.splice(index, 1);
                    saveCart();
                    viewCartButton.click();
                });
            });
        }
        cart_item_container.style.display = 'block';
        cart_item_container.style.position= 'fixed';
        account_container.classList.remove('ac');
        order_container.classList.remove('o2');
        anchor_list_container.classList.remove('anchor-active');
        search_form.classList.remove('show');
        wishlist_container.style.display = 'none';
        placeorder_container.style.display = 'none';


        viewCartButton.removeEventListener("click", toggleEle);
        viewCartButton.addEventListener("click", resetEle);
        

    });

    function resetEle() {
    
        // Reset the clicked element
        cart_item_container.style.display = 'none';
        
        // Swap the event listener back to toggle
        viewCartButton.removeEventListener("click", resetEle);
        viewCartButton.addEventListener("click", toggleEle);
    }

});


// place order 
// Global order array
const order = JSON.parse(localStorage.getItem('order')) || [];

// Function to save order to localStorage
const saveOrder = () => {
    localStorage.setItem('order', JSON.stringify(order));
};

// Function to add an item to the order
const addToOrder = (name, price, image, quantity) => {
    const existingItem = order.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        order.push({ name, price, image, quantity });
    }

    saveOrder(); // Save to localStorage
    alert(`${quantity}x ${name} added to your order.`);
};

// Document Loaded Event
document.addEventListener('DOMContentLoaded', () => {
    const placeOrderButtons = document.querySelectorAll('.b1');
    const viewOrderButton = document.getElementById('plorder3');
    const orderContainer = document.querySelector('.plordercont');
    const placeOrderContainer = document.querySelector('.placeorder_container');

    // Quantity Management
    document.querySelectorAll('.quantity').forEach(item => {
        const decrement = item.querySelector(".decrement");
        const increment = item.querySelector(".increment");
        const quant = item.querySelector(".quant");

        increment.addEventListener('click', () => {
            let currquant = parseInt(quant.textContent, 10);
            quant.textContent = currquant + 1;
        });

        decrement.addEventListener('click', () => {
            let currquant = parseInt(quant.textContent, 10);
            if (currquant > 0) {
                quant.textContent = currquant - 1;
            }
        });
    });

    // Place Order Logic
    placeOrderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const menuBox = button.closest('.menu-box');
            const name = menuBox.getAttribute('data-name');
            const price = menuBox.getAttribute('data-price');
            const image = menuBox.getAttribute('data-image');
            const quantity = parseInt(menuBox.querySelector('.quant').textContent, 10);

            if (quantity > 0) {
                addToOrder(name, price, image, quantity);
                menuBox.querySelector('.quant').textContent = '0'; // Reset quantity
            } else {
                alert("Please select a quantity before placing the order.");
            }
        });
    });

    // View Order Logic with Toggle Functionality
    viewOrderButton.addEventListener('click', () => {
        // Toggle visibility
        if (placeOrderContainer.style.display === 'block') {
            placeOrderContainer.style.display = 'none'; // Hide if already visible
        } else {
            // Show the container and populate the order list
            orderContainer.innerHTML = '';

            if (order.length === 0) {
                orderContainer.innerHTML = `
                    <p>Your order list is empty.</p>
                    <div class="img"></div>`;
            } else {
                order.forEach((item, index) => {
                    const orderItem = document.createElement('div');
                    orderItem.className = 'order-item';
                    orderItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <span>${item.quantity}x ${item.name} - $${item.price}</span>
                        <button class="remove-button remove fas fa-times" data-index="${index}"></button>
                    `;
                    orderContainer.appendChild(orderItem);
                });

                // Add event listeners for remove buttons
                const removeButtons = orderContainer.querySelectorAll('.remove-button');
                removeButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const index = button.getAttribute('data-index');
                        order.splice(index, 1);
                        saveOrder(); // Save updated order to localStorage after removal
                        viewOrderButton.click(); // Refresh order view
                    });
                });
            }

            placeOrderContainer.style.display = 'block'; // Show the container
        }
    });

    // SEARCH BAR
    const searchBar = document.getElementById('search-box');
    const searchContainer = document.querySelector('.search-container');

    const searchItems = () => {
        const query = searchBar.value.toLowerCase().trim();

        searchContainer.innerHTML = `
            <button class="remove fas fa-times"></button>
        `;

        const btnClose = searchContainer.querySelector(".remove");
        btnClose.addEventListener("click", () => {
            searchContainer.style.display = "none";
            searchBar.value = '';
        });

        const searchResultsBox = document.createElement('div');
        searchResultsBox.className = 'search-results-box';
        searchContainer.appendChild(searchResultsBox);

        const menuBoxes = document.querySelectorAll('.menu-box');

        if (!query) {
            searchContainer.style.display = 'none';
            return;
        }

        searchContainer.style.display = 'block';
        let resultsFound = false;

        menuBoxes.forEach(menuBox => {
            const name = menuBox.querySelector('.name')?.textContent.toLowerCase();
            if (name && name.includes(query)) {
                const clonedItem = menuBox.cloneNode(true);
                addDynamicEventListeners(clonedItem);
                searchResultsBox.appendChild(clonedItem);
                resultsFound = true;
            }
        });

        if (resultsFound) {
            const heading = document.createElement('h4');
            heading.className = 'h';
            heading.textContent = 'Your Search Results';
            searchContainer.insertBefore(heading, searchResultsBox);
        } else {
            const noResultsMessage = document.createElement('h2');
            noResultsMessage.textContent = 'No results found.';
            searchResultsBox.appendChild(noResultsMessage);
        }
    };

    const addDynamicEventListeners = (item) => {
        const placeOrderButton = item.querySelector('.b1');
        if (placeOrderButton) {
            placeOrderButton.addEventListener('click', function (event) {
                event.preventDefault();
                const menuBox = this.closest('.menu-box');
                const name = menuBox.getAttribute('data-name');
                const price = menuBox.getAttribute('data-price');
                const image = menuBox.getAttribute('data-image');
                const quantity = parseInt(menuBox.querySelector('.quant').textContent, 10);

                if (quantity > 0) {
                    addToOrder(name, price, image, quantity);
                    menuBox.querySelector('.quant').textContent = '0';
                } else {
                    alert("Please select a quantity before placing the order.");
                }
            });
        }

        const incrementButton = item.querySelector('.increment');
        const decrementButton = item.querySelector('.decrement');

        if (incrementButton) {
            incrementButton.addEventListener('click', () => {
                const quantitySpan = incrementButton.nextElementSibling;
                quantitySpan.textContent = parseInt(quantitySpan.textContent, 10) + 1;
            });
        }

        if (decrementButton) {
            decrementButton.addEventListener('click', () => {
                const quantitySpan = decrementButton.previousElementSibling;
                const currentQuantity = parseInt(quantitySpan.textContent, 10);
                if (currentQuantity > 0) {
                    quantitySpan.textContent = currentQuantity - 1;
                }
            });
        }
    };

    searchBar.addEventListener('input', searchItems);
});


// for feedback and rating

const elements = document.querySelectorAll(".teribble, .bad, .okay, .great, .excellent");

elements.forEach(element => {
    element.addEventListener("click", toggleElement);
});

function toggleElement(event) {
    const target = event.currentTarget;
    
    // Reset all elements
    elements.forEach(el => {
        el.classList.replace("fa-solid", "fa-regular");
        el.style.color = "white";
    });
    
    // Set the clicked element
    target.classList.replace("fa-regular", "fa-solid");
    target.style.color = getColor(target);
    
    // Swap the event listener to reset on the next click
    target.removeEventListener("click", toggleElement);
    target.addEventListener("click", resetElement);
}

function resetElement(event) {
    const target = event.currentTarget;
    
    // Reset the clicked element
    target.classList.replace("fa-solid", "fa-regular");
    target.style.color = "white";
    
    // Swap the event listener back to toggle
    target.removeEventListener("click", resetElement);
    target.addEventListener("click", toggleElement);
}

function getColor(element) {
    if (element.classList.contains("teribble")) {
        return "rgb(252, 245, 95)";
    } else if (element.classList.contains("bad")) {
        return "rgb(225, 193, 110)";
    } else if (element.classList.contains("okay")) {
        return "rgb(255, 215, 0)";
    } else if (element.classList.contains("great")) {
        return "rgb(255, 192, 0)";
    } else if (element.classList.contains("excellent")) {
        return "rgb(228, 155, 15)";
    }
    return "white";
}

















/*


// for place your order

// document.addEventListener('DOMContentLoaded', () => {
    
//     const order = [];
//     const placeorder = document.querySelectorAll('.b1');
//     const vieworder = document.getElementById('plorder3');
   
//     placeorder.forEach(button => {
//         button.addEventListener('click', () => {
//             const item1 = button.closest('.menu-box');
//             const item1Name = item1.getAttribute('data-name');
//             const item1Price = item1.getAttribute('data-price');
//             const item1Image = item1.getAttribute('data-image');
//             order.push({ name: item1Name, price: item1Price, image: item1Image });
//             alert(`${item1Name} your order has been placed.`);
//         });
//     });

//     vieworder.addEventListener('click', () => {
//         const orderContainer = document.querySelector('.plordercont');
//         orderContainer.innerHTML = '';
//         if (order.length === 0) {
//             orderContainer.innerHTML = `<p>Your order list is empty.</p>
//             <div class="img"> </div>`;
//         } 
//         else {
//             order.forEach((item, index) => {
//                 const orderItem = document.createElement('div');
//                 orderItem.className = 'order-item';
//                 orderItem.innerHTML = `
//                     <img src="${item.image}" alt="${item.name}">
//                     <span>${item.name} - $${item.price}</span>
//                     <button class="remove-button" data-index="${index}">cancel order</button>  
//                 `;
//                orderContainer.appendChild(orderItem);

//             });

//             const removeButtons = document.querySelectorAll('.remove-button');
//             removeButtons.forEach(button => {
//                 button.addEventListener('click', () => {
//                     const index = button.getAttribute('data-index');
//                     order.splice(index, 1);
//                     vieworder.click();
//                 });
//             });
//         }
//         placeorder_container.style.display = 'block';
//     });
// });



// document.querySelector(".plorder").onclick = () =>{
//     placeorder_container.classList.toggle('plo3');
//     order_container.classList.remove('o2');
//     account_container.classList.remove('ac');
//     anchor_list_container.classList.remove('anchor-active');
//     cart_item_container.classList.remove('active');
//     search_form.classList.remove('show');
//     wishlist_container.classList.remove('wish-active');
//     cart_item_container.style.display = 'none';
//     wishlist_container.style.display = 'none';
// }

// document.querySelector("#wish-icon").onclick = () =>{
//     wishlist_container.classList.toggle('wish-active');
//     account_container.classList.remove('ac');
//     order_container.classList.remove('o2');
//     cart_item_container.classList.remove('active');
//     anchor_list_container.classList.remove('anchor-active');
//     search_form.classList.remove('show');
//     cart_item_container.style.display = 'none';
//     placeorder_container.classList.remove('plo3');
//     placeorder_container.style.display = 'none';
// }

// document.querySelector("#cart-icon").onclick = () =>{

//     cart_item_container.classList.toggle('active');
//     account_container.classList.remove('ac');
//     order_container.classList.remove('o2');
//     anchor_list_container.classList.remove('anchor-active');
//     search_form.classList.remove('show');
//     wishlist_container.classList.remove('wish-active');
//     wishlist_container.style.display = 'none';
//     placeorder_container.classList.remove('plo3');
//     placeorder_container.style.display = 'none';
// }






const teribble = document.querySelector(".teribble");
const bad = document.querySelector(".bad");
const okay = document.querySelector(".okay");
const great = document.querySelector(".great");
const excellent = document.querySelector(".excellent");


teribble.addEventListener("click", toggleTerrible);
function toggleTerrible() {
    teribble.classList.replace("fa-regular", "fa-solid");
    bad.classList.replace("fa-solid", "fa-regular");
    okay.classList.replace("fa-solid", "fa-regular");
    great.classList.replace("fa-solid", "fa-regular");
    excellent.classList.replace("fa-solid", "fa-regular");
    teribble.style.color = "rgb(252, 245, 95)";
    bad.style.color = "white";
    okay.style.color = "white";
    great.style.color = "white";
    excellent.style.color = "white";
    // Remove the event listener to avoid adding multiple listeners
    teribble.removeEventListener("click", toggleTerrible);
    teribble.addEventListener("click", resetTerrible);
}
function resetTerrible() {
    teribble.style.color = "white";
    teribble.classList.replace("fa-solid", "fa-regular");
    // Remove the event listener to avoid adding multiple listeners
    teribble.removeEventListener("click", resetTerrible);
    // Add the original listener back
    teribble.addEventListener("click", toggleTerrible);
}


bad.addEventListener("click", toggleBad);
function toggleBad() {
    bad.classList.replace("fa-regular","fa-solid");
    teribble.classList.replace("fa-solid","fa-regular");  
    okay.classList.replace("fa-solid","fa-regular");
    great.classList.replace("fa-solid","fa-regular");  
    excellent.classList.replace("fa-solid","fa-regular"); 
    bad.style.color = "	rgb(225, 193, 110)";
    teribble.style.color = "white";
    okay.style.color = "white";
    great.style.color = "white";
    excellent.style.color = "white";
    // Remove the event listener to avoid adding multiple listeners
    bad.removeEventListener("click", toggleBad);
    bad.addEventListener("click", resetBad);
}
function resetBad() {
    bad.style.color = "white";
    bad.classList.replace("fa-solid", "fa-regular");
    // Remove the event listener to avoid adding multiple listeners
    bad.removeEventListener("click", resetBad);
    // Add the original listener back
    bad.addEventListener("click", toggleBad);
}




okay.addEventListener("click", toggleOkay);
function toggleOkay() {
    okay.classList.replace("fa-regular","fa-solid"); 
    bad.classList.replace("fa-solid","fa-regular");
    great.classList.replace("fa-solid","fa-regular");  
    excellent.classList.replace("fa-solid","fa-regular"); 
    teribble.classList.replace("fa-solid","fa-regular"); 
    okay.style.color = "rgb(255, 215, 0)";
    great.style.color = "white";
    teribble.style.color = "white";
    excellent.style.color = "white";
    bad.style.color = "white";
    // Remove the event listener to avoid adding multiple listeners
   okay.removeEventListener("click", toggleOkay);
   okay.addEventListener("click", resetOkay);
}
function resetOkay() {
    okay.style.color = "white";
    okay.classList.replace("fa-solid", "fa-regular");
    // Remove the event listener to avoid adding multiple listeners
    okay.removeEventListener("click", resetOkay);
    // Add the original listener back
    okay.addEventListener("click", toggleOkay);
}


great.addEventListener("click", toggleGreat);
function toggleGreat() {
    great.classList.replace("fa-regular","fa-solid");
    excellent.classList.replace("fa-solid","fa-regular"); 
    teribble.classList.replace("fa-solid","fa-regular"); 
    bad.classList.replace("fa-solid","fa-regular");
    okay.classList.replace("fa-solid","fa-regular"); 
    great.style.color = "rgb(255, 192, 0)"; 
    teribble.style.color = "white";
    okay.style.color = "white";
    excellent.style.color = "white";
    bad.style.color = "white";
    // Remove the event listener to avoid adding multiple listeners
    great.removeEventListener("click", toggleGreat);
    great.addEventListener("click", resetGreat);
}
function resetGreat() {
    great.style.color = "white";
    great.classList.replace("fa-solid", "fa-regular");
    // Remove the event listener to avoid adding multiple listeners
    great.removeEventListener("click", resetGreat);
    // Add the original listener back
   great.addEventListener("click", toggleGreat);
}



excellent.addEventListener("click", toggleExcellent);
function toggleExcellent() {
    excellent.classList.replace("fa-regular","fa-solid"); 
    teribble.classList.replace("fa-solid","fa-regular"); 
    bad.classList.replace("fa-solid","fa-regular");
    okay.classList.replace("fa-solid","fa-regular"); 
    great.classList.replace("fa-solid","fa-regular");
    excellent.style.color = "rgb(228, 155, 15)";  
    teribble.style.color = "white";
    okay.style.color = "white";
    great.style.color = "white";
   bad.style.color = "white";
    // Remove the event listener to avoid adding multiple listeners
    excellent.removeEventListener("click", toggleExcellent);
    excellent.addEventListener("click", resetExcellent);
}
function resetExcellent() {
    excellent.style.color = "white";
    excellent.classList.replace("fa-solid", "fa-regular");
    // Remove the event listener to avoid adding multiple listeners
    excellent.removeEventListener("click", resetExcellent);
    // Add the original listener back
    excellent.addEventListener("click", toggleExcellent);
}
*/