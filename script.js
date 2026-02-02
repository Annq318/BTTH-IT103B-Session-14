// 1. DỮ LIỆU SẢN PHẨM (Mảng Đối Tượng - Chương 7)
const products = [
    { id: 1, name: "Bánh Chưng Tranh Khúc", price: 150000, img: "/img/banhchung.webp" },
    { id: 2, name: "Giò Lụa Ước Lễ", price: 180000, img: "/img/giolua.jpg" },
    { id: 3, name: "Cành Đào Nhật Tân", price: 500000, img: "/img/canhdao.webp" },
    { id: 4, name: "Mứt Tết Thập Cẩm", price: 120000, img: "/img/muttet.webp" },
    { id: 5, name: "Lì Xì May Mắn", price: 20000, img: "/img/lixi.webp" },
    { id: 6, name: "Dưa Hấu Khắc Chữ", price: 60000, img: "/img/duahau.jpg" }
];

// Biến lưu tổng tiền hiện tại
let totalMoney = 0;

// Các phần tử DOM cần thao tác (Chương 8)
const productListDOM = document.getElementById("product-list");
const cartListDOM = document.getElementById("cart-list");
const totalPriceDOM = document.getElementById("total-price");

// 2. HÀM FORMAT TIỀN (Helper Function)
// Chuyển số 100000 -> "100.000 đ" cho đẹp
function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + " đ";
}

// 3. RENDER SẢN PHẨM RA MÀN HÌNH (DOM Creation)
function renderProducts() {
    // Duyệt qua mảng products
    products.forEach(product => {
        // Tạo thẻ div cha
        const card = document.createElement("div");
        card.classList.add("product-card"); // Thêm class CSS

        // Sử dụng Template String để tạo nội dung HTML bên trong
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${formatMoney(product.price)}</p>
            <button class="btn-add" id="btn-add-${product.id}">Thêm vào giỏ</button>
        `;

        // Gắn thẻ này vào danh sách
        productListDOM.appendChild(card);

        // --- GẮN SỰ KIỆN CLICK (Event Listener) ---
        // Tìm lại nút vừa tạo để gắn sự kiện
        const btn = card.querySelector(`#btn-add-${product.id}`);

        btn.addEventListener("click", function () {
            addToCart(product); // Gọi hàm thêm vào giỏ
        });
    });
}

// 4. HÀM THÊM VÀO GIỎ HÀNG (Logic + DOM Append)
function addToCart(product) {
    // Xóa dòng "Chưa có món nào" nếu là sản phẩm đầu tiên
    const emptyMsg = document.querySelector(".empty-msg");
    if (emptyMsg) {
        emptyMsg.remove();
    }

    // Tạo thẻ li cho món hàng trong giỏ
    const li = document.createElement("li");

    li.innerHTML = `
        <span class="cart-item-name">${product.name}</span>
        <div>
            <span class="cart-item-price">${formatMoney(product.price)}</span>
            <button class="btn-remove">X</button>
        </div>
    `;

    // Gắn thẻ li vào danh sách giỏ hàng
    cartListDOM.appendChild(li);
    // Cập nhật tổng tiền (Logic)
    totalMoney += product.price;
    totalPriceDOM.innerText = formatMoney(totalMoney);
}

// === CHẠY CHƯƠNG TRÌNH ===
renderProducts();