document.addEventListener('DOMContentLoaded', function () {
    // Retrieve order items from sessionStorage
    const orderItems = JSON.parse(sessionStorage.getItem('orderItems')) || [];
    const orderItemsContainer = document.getElementById('orderItems');
    const totalPriceElement = document.getElementById('total-price');

    let totalPrice = 0;

    orderItems.forEach(item => {
        const itemHTML = `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="order-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="price">${item.price}</p>
                </div>
            </div>
        `;

        orderItemsContainer.innerHTML += itemHTML;

        const itemPrice = parseFloat(item.price.replace('₱', '').trim());
        totalPrice += itemPrice;
    });

    totalPriceElement.textContent = `Total Price: ₱ ${totalPrice.toFixed(2)}`;

    // Handle form submission
    const checkoutForm = document.querySelector('.checkout-form');
    checkoutForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        // Populate receipt details
        document.getElementById('receiptName').textContent = name;
        document.getElementById('receiptEmail').textContent = email;
        document.getElementById('receiptPhone').textContent = phone;
        document.getElementById('receiptAddress').textContent = address;
        document.getElementById('receiptTotalPrice').textContent = `₱ ${totalPrice.toFixed(2)}`;

        const receiptItemsContainer = document.getElementById('receiptItems');
        receiptItemsContainer.innerHTML = '';

        orderItems.forEach(item => {
            const receiptItemHTML = `
                <div class="receipt-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="receipt-item-info">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p class="price">${item.price}</p>
                    </div>
                </div>
            `;
            receiptItemsContainer.innerHTML += receiptItemHTML;
        });

        // Hide the form and show the receipt
        checkoutForm.style.display = 'none';
        document.getElementById('receipt').style.display = 'block';
    });
});
