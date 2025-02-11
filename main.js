let cart = [];
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function toggleHeart(heart) {
    heart.classList.toggle('fas');
    heart.classList.toggle('far');
}
function addToCart(button) {
    const product = {
        image: button.getAttribute('data-image') || 'images/default.png',
        title: button.parentElement.querySelector('.title').innerText,
        price: parseFloat(button.parentElement.querySelector('.new-price').innerText.replace(/[^0-9.]/g, '')),
        quantity: 1
    };
    const existingItem = cart.find(item => item.title === product.title);
    if (existingItem) {
        existingItem.quantity++; 
    } else {
        cart.push(product); 
    }

    saveCart();
    updateCart();

}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';
    let totalPrice = 0;
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
        <div class="item-content">
            <img src="${item.image}" width="50" class="item-image">
            <span>${item.title}</span>
            <span class="product-price">${item.price}  L.E</span>
            <div class="zz">
                <div class="quantity-control">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
        `;
        cartItems.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });
    updateCartCount();
    saveCart();
    if (totalPriceElement) {
        totalPriceElement.innerText = ` Total Price: ${totalPrice.toFixed(2)} L.E`;
    }
}
function changeQuantity(index, change) {
    let newQuantity = cart[index].quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
        cart[index].quantity = newQuantity;
        updateCart();
    }
}
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.innerText = totalItems;
    }
}
function removeFromCart(index) {
    const removedItem = cart[index]; 
    cart.splice(index, 1); 
    saveCart(); 
    updateCart(); 
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        if (button.getAttribute('data-image') === removedItem.image) {
            button.disabled = false;
            button.innerText = 'إضافة إلى العربة';
            button.style.backgroundColor = '#28a745'; 
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.getElementById('checkout');
    const emptyCartBtn = document.getElementById('empty-cart');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('العربة فارغة! أضف منتجات أولاً.');
            } else {
                alert('شكراً لشرائك! سيتم إرسال الفاتورة قريباً.');
                cart = []; 
                saveCart(); 
                updateCart(); 
            }
        });
    }

    if (emptyCartBtn) {
        emptyCartBtn.addEventListener('click', () => {
            const confirmEmpty = confirm('هل أنت متأكد أنك تريد تفريغ العربة؟');
            if (confirmEmpty) {
                cart = [];
                saveCart();
                updateCart(); 
            }
        });
    }

    loadCart(); 
});
  

  document.querySelector('.toggle_btn').addEventListener('click', function() {
    document.querySelector('.dropdown-btn').classList.toggle('open');
    const toggleBtnIcon = document.querySelector('.toggle_btn i');
    const isOpen = document.querySelector('.dropdown-btn').classList.contains('open');
    toggleBtnIcon.classList = isOpen
      ? 'fa-solid fa-xmark'  
      : 'fa-solid fa-bars';   
  });
  document.querySelectorAll('.card_prodact').forEach(card => {
      const oldPriceElement = card.querySelector('.oldPrice');
      const newPriceElement = card.querySelector('.newPrice');
      const discount = parseFloat(card.querySelector('.discount').textContent.replace('Discount ', '').replace('%', ''));
  
      const oldPrice = parseFloat(oldPriceElement.textContent);
      const newPrice = oldPrice - (oldPrice * (discount / 100));
      newPriceElement.textContent = newPrice.toFixed(2);
  });
  
  function toggleHeart(heart) {
      heart.classList.toggle('active');
  }
