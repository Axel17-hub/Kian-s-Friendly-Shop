document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const notificationBox = document.getElementById('notificationBox');
    const cartItemsContainer = document.getElementById('cartItems');
    const customModal = document.getElementById('customModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalQuantityInput = document.getElementById('modalQuantityInput');
    const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');
    const modalCloseBtn = document.querySelector('.modal .close');
    const checkoutButton = document.getElementById('checkoutButton');

    let currentItemContainer, currentItemName, currentItemPrice;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            currentItemContainer = event.target.closest('.category-item');
            currentItemName = currentItemContainer.querySelector('h3').textContent;
            currentItemPrice = parseFloat(currentItemContainer.querySelector('.price').textContent.replace('₱ ', ''));

            modalMessage.textContent = `How many "${currentItemName}" do you want to add to cart?`;
            modalQuantityInput.value = 1;
            customModal.style.display = 'block';
        });
    });

    modalAddToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(modalQuantityInput.value);

        if (isNaN(quantity) || quantity <= 0) {
            return; // Exit if quantity is not valid
        }

        // Create cart item HTML with quantity
        const cartItemHTML = `
            <div class="cart-item">
                <img src="${currentItemContainer.querySelector('img').src}" alt="${currentItemName}">
                <div class="cart-item-info">
                    <h3>${currentItemName}</h3>
                    <p class="quantity">Quantity: ${quantity}</p>
                    <p class="price">₱ ${(currentItemPrice * quantity).toFixed(2)}</p>
                </div>
                <button class="remove-from-cart-btn">Remove</button>
            </div>
        `;

        // Append cart item to cartItems container
        cartItemsContainer.innerHTML += cartItemHTML;

        // Update cart summary
        updateCartSummary();

        // Disable checkout button
        checkoutButton.disable = true;

        // Show notification
        showNotification(`Successfully added "${currentItemName}" x${quantity} to the cart.`);

        // Close the modal
        customModal.style.display = 'none';
    });

    modalCloseBtn.addEventListener('click', function() {
        customModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === customModal) {
            customModal.style.display = 'none';
        }
    });

    // Function to show notification
    function showNotification(message) {
        notificationBox.textContent = message;
        notificationBox.style.display = 'block';

        // Hide the notification after a few seconds (optional)
        setTimeout(() => {
            notificationBox.style.display = 'none';
        }, 3000); // Hide after 3 seconds (adjust as needed)
    }

    // Function to update cart summary
    function updateCartSummary() {
        const cartItems = document.querySelectorAll('.cart-item');
        let totalPrice = 0;
        let totalItems = 0;

        cartItems.forEach(cartItem => {
            const price = parseFloat(cartItem.querySelector('.price').textContent.replace('₱ ', ''));
            const quantity = parseInt(cartItem.querySelector('.quantity').textContent.replace('Quantity: ', ''), 10);
            const isSelected = cartItem.classList.contains('selected');

            if (isSelected) {
                totalPrice += price;
                totalItems += quantity;
            }   
        });

        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('totalPrice').textContent = `₱ ${totalPrice.toFixed(2)}`;

        // Disable checkout button if no item is selected
        checkoutButton.disabled = totalItems === 0;
    }

    // Event listener for selecting/deselecting cart items and removing items
    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart-btn')) {
            event.target.closest('.cart-item').remove();
            updateCartSummary();
        } else if (event.target.closest('.cart-item')) {
            const cartItem = event.target.closest('.cart-item');
            cartItem.classList.toggle('selected');
            updateCartSummary();
        }
    });
    // Initial cart summary update
    updateCartSummary();

    // Event listener for checkout button
    document.getElementById('checkoutButton').addEventListener('click', function() {
        const selectedItems = document.querySelectorAll('.cart-item.selected');
        selectedItems.forEach(item => {
            // Perform checkout action for selected items
            // Example: console.log(item.querySelector('h3').textContent);
        });
    });
});

function filterProducts(category) {
    const allItems = document.querySelectorAll('.category-item');
    allItems.forEach(item => {
        item.style.display = 'none';
    });

    const categoryItems = document.querySelectorAll(`.category-item[data-category="${category}"]`);
    categoryItems.forEach(item => {
        item.style.display = 'flex';  // Change this to your preferred display style
    });
}

// Function to navigate to orderForm.html with item details
function goToOrderForm(item) {
    // Store item details in localStorage (you can use sessionStorage if you prefer)
    localStorage.setItem('orderItem', JSON.stringify(item));

    // Redirect to orderForm.html
    window.location.href = 'orderForm.html';
}

// Function to trigger when Order Now button is clicked
document.addEventListener('DOMContentLoaded', function() {
    const orderButtons = document.querySelectorAll('.order-btn');

    orderButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            // Get item details from the clicked button's parent element
            const itemContainer = event.target.closest('.category-item');
            const item = {
                image: itemContainer.querySelector('.product-image img').src,
                name: itemContainer.querySelector('h3').textContent,
                description: itemContainer.querySelector('p:nth-of-type(1)').textContent,
                price: itemContainer.querySelector('.price').textContent.trim()
            };

            // Navigate to orderForm.html with item details
            goToOrderForm(item);
        });
    });
});

// Event listener for checkout button
document.getElementById('checkoutButton').addEventListener('click', function() {
    const selectedItems = document.querySelectorAll('.cart-item.selected');
    const orderItems = [];

    selectedItems.forEach(item => {
        const image = item.querySelector('img').src;
        const name = item.querySelector('.cart-item-info h3').textContent;
        const description = item.querySelector('.cart-item-info .quantity').textContent;
        const price = item.querySelector('.cart-item-info .price').textContent;

        orderItems.push({ image, name, description, price });
    });

    // Store order items in sessionStorage to pass to checkoutForm.html
    sessionStorage.setItem('orderItems', JSON.stringify(orderItems));

    // Navigate to checkoutForm.html
    window.location.href = 'checkoutForm.html';
});

// Function to show all items
function showAllItems() {
    const allItems = document.querySelectorAll('.category-item');
    allItems.forEach(item => {
        item.style.display = 'flex';  // Change this to your preferred display style
    });
}

// Example of adding event listener to a "Show All Items" button
document.getElementById('showAllItemsButton').addEventListener('click', showAllItems);





