document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // 1. CODE DÙNG CHUNG CHO TẤT CẢ CÁC TRANG (Nếu có)
    // ==========================================
    console.log("GreenFood JS đã kích hoạt thành công!");


    // ==========================================
    // 2. CODE DÀNH RIÊNG CHO TRANG CHỦ (index.html)
    // ==========================================
    const mainSlider = document.querySelector(".main-slider");
    if (mainSlider) { // <--- Chỉ chạy nếu đang đứng ở trang có Slider
        console.log("Đang ở trang chủ: Kích hoạt Slider");
        const prevBtn = document.querySelector(".arrow.prev");
        const nextBtn = document.querySelector(".arrow.next");
        
        if(nextBtn && prevBtn) {
            nextBtn.addEventListener("click", () => {
                // Code xử lý chuyển ảnh tiếp theo ở đây
            });
            prevBtn.addEventListener("click", () => {
                // Code xử lý quay lại ảnh trước ở đây
            });
        }
    }


    // ==========================================
    // 3. CODE DÀNH RIÊNG CHO TRANG ORDER (order.html)
    // ==========================================
    const filterItems = document.querySelectorAll(".filter-item");
    const foodItems = document.querySelectorAll(".food-item");
    const categoryTitle = document.getElementById("category-title");

    // Chỉ chạy logic lọc món ăn nếu tìm thấy các phần tử này trên trang
    if (filterItems.length > 0 && foodItems.length > 0) {
        console.log("Đang ở trang Order: Kích hoạt bộ lọc món ăn");

        function showCategory(category) {
            foodItems.forEach(item => {
                if (item.classList.contains(category)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        }

        // Mặc định hiện Món Chính
        showCategory("mon-chinh");

        filterItems.forEach(item => {
            item.addEventListener("click", function () {
                const currentActive = document.querySelector(".filter-item.active");
                if (currentActive) { currentActive.classList.remove("active"); }
                this.classList.add("active");

                const targetCategory = this.getAttribute("data-target");
                if (categoryTitle) {
                    categoryTitle.textContent = this.textContent.substring(2);
                }
                showCategory(targetCategory);
            });
        });
    }

});

// 1. Thêm vào giỏ hàng
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('greenFoodCart')) || [];
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem('greenFoodCart', JSON.stringify(cart));
    alert("Đã thêm " + name + " vào giỏ!");
    updateCartCount(); // Hàm này nằm bên dưới
}

// 2. Cập nhật con số trên Header (tự động chạy khi tải trang)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('greenFoodCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.querySelector(".cart-count");
    if (countElement) {
        countElement.textContent = totalItems;
    }
}

// 3. Khởi chạy khi load trang
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});