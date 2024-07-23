document.addEventListener('DOMContentLoaded', function() {
    // Retrieve item details from localStorage
    const item = JSON.parse(localStorage.getItem('orderItem'));

    // Display item details in the order form
    if (item) {
        document.getElementById('product-image').src = item.image;
        document.getElementById('product-name').textContent = item.name;
        document.getElementById('product-description').textContent = item.description;
        document.getElementById('product-price').textContent = `${item.price}`;

        // Calculate total price based on quantity
        const quantityInput = document.getElementById('quantity');
        const totalPriceDisplay = document.getElementById('total-price');

        quantityInput.addEventListener('input', function() {
            const quantity = parseInt(quantityInput.value);
            const price = parseFloat(item.price.replace('₱ ', ''));
            const totalPrice = quantity * price;

            totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
        });
    }

    const orderForm = document.querySelector('.order-form');
    const receiptContainer = document.getElementById('receipt');
    const goBackLink = document.querySelector('.go-back-link');

    // Handle form submission
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Retrieve form values
        const productName = document.getElementById('product-name').textContent;
        const productDescription = document.getElementById('product-description').textContent;
        const productPrice = document.getElementById('product-price').textContent;
        const quantity = document.getElementById('quantity').value;
        const totalPrice = document.getElementById('total-price').textContent;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        // Display receipt details
        document.getElementById('receipt-product-name').textContent = productName;
        document.getElementById('receipt-product-description').textContent = productDescription;
        document.getElementById('receipt-product-price').textContent = productPrice;
        document.getElementById('receipt-quantity').textContent = quantity;
        document.getElementById('receipt-total-price').textContent = totalPrice;
        document.getElementById('receipt-name').textContent = name;
        document.getElementById('receipt-email').textContent = email;
        document.getElementById('receipt-phone').textContent = phone;
        document.getElementById('receipt-address').textContent = address;

        // Show receipt
        receiptContainer.style.display = 'block';

        // Optionally, clear form fields after submission
        orderForm.reset();
    });
});
