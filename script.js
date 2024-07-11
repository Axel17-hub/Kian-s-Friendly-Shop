// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartContainer = document.getElementById('cartItems');
    const totalItemsDisplay = document.getElementById('totalItems');
    const totalPriceDisplay = document.getElementById('totalPrice');
    const messageBox = document.getElementById('messageBox');
    const checkoutButton = document.getElementById('checkoutButton');
    let totalItems = 0;
    let totalPrice = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = button.closest('.category-item');
            const productName = productItem.querySelector('h3').innerText;
            const productImageSrc = productItem.querySelector('.product-image img').src;
            const productPrice = parseFloat(productItem.querySelector('.price').innerText.replace('₱', ''));

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.dataset.selected = 'false'; // Initialize as not selected
            cartItem.innerHTML = `
                <img src="${productImageSrc}" alt="${productName}">
                <div class="cart-item-info">
                    <h3>${productName}</h3>
                    <p class="price">₱${productPrice.toFixed(2)}</p>
                </div>
                <button class="remove-from-cart-btn">Delete</button>
            `;

            cartItem.addEventListener('click', function() {
                // Toggle selection
                if (cartItem.dataset.selected === 'false') {
                    cartItem.dataset.selected = 'true';
                    cartItem.classList.add('selected');
                    // Update totals on select
                    totalItems++;
                    totalPrice += productPrice;
                } else {
                    cartItem.dataset.selected = 'false';
                    cartItem.classList.remove('selected');
                    // Update totals on deselect
                    totalItems--;
                    totalPrice -= productPrice;
                }

                // Update total items and price display
                totalItemsDisplay.textContent = totalItems;
                totalPriceDisplay.textContent = `₱${totalPrice.toFixed(2)}`;

                // Enable/disable checkout button based on selected items
                checkoutButton.disabled = totalItems === 0;
            });

            cartContainer.appendChild(cartItem);

            // Show success message
            showMessage(`${productName} added to cart`);

            // Function to show message box
            function showMessage(message) {
                messageBox.textContent = message;
                messageBox.classList.add('show');

                setTimeout(function() {
                    messageBox.classList.remove('show');
                    messageBox.textContent = '';
                }, 3000);
            }

            // Delete button event listener
            const deleteButton = cartItem.querySelector('.remove-from-cart-btn');
            deleteButton.addEventListener('click', function() {
                // Update totals on delete if selected
                if (cartItem.dataset.selected === 'true') {
                    totalItems--;
                    totalPrice -= productPrice;

                    // Update total items and price display
                    totalItemsDisplay.textContent = totalItems;
                    totalPriceDisplay.textContent = `₱${totalPrice.toFixed(2)}`;

                    // Enable/disable checkout button based on selected items
                    checkoutButton.disabled = totalItems === 0;
                }

                cartItem.remove();
            });
        });
    });

    // Checkout button event listener
    checkoutButton.addEventListener('click', function() {
        const selectedItems = document.querySelectorAll('.cart-item[selected="true"]');
        const selectedProducts = Array.from(selectedItems).map(item => ({
            name: item.querySelector('h3').innerText,
            price: parseFloat(item.querySelector('.price').innerText.replace('₱', ''))
        }));

        console.log('Selected Products:', selectedProducts);
    });
});


