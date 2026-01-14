// --- DANH SÁCH NGÔN NGỮ HỖ TRỢ ---
const supportedLanguages = [
    { code: "vi", name: "Tiếng Việt" },
    { code: "en", name: "English (Tiếng Anh)" },
    { code: "ja", name: "Japanese (Tiếng Nhật)" },
    { code: "ko", name: "Korean (Tiếng Hàn)" },
    { code: "zh-CN", name: "Chinese (Tiếng Trung)" },
    { code: "fr", name: "French (Tiếng Pháp)" },
    { code: "de", name: "German (Tiếng Đức)" },
    { code: "ru", name: "Russian (Tiếng Nga)" }
];

// --- 1. TẠO GIAO DIỆN THANH BÊN ---
const sidebarHTML = `
  <div class="sidebar-header">
    <span class="sidebar-title">Dịch Đa Ngôn Ngữ</span>
    <button id="close-sidebar-btn">×</button>
  </div>
  
  <div class="sidebar-controls">
    <div class="label" style="margin-top:10px;">Dịch sang:</div>
    <select id="target-lang-select" class="lang-select">
        </select>
  </div>

  <div class="sidebar-content">
    <div class="label">Văn bản gốc (Auto Detect)</div>
    <div id="original-text" class="text-box"></div>

    <div class="label">Kết quả dịch</div>
    <div id="translated-text" class="text-box translated"></div>
  </div>
`;

// Tạo Sidebar
const sidebar = document.createElement("div");
sidebar.id = "translate-sidebar";
sidebar.style.display = "none";
sidebar.innerHTML = sidebarHTML;
document.body.appendChild(sidebar);

// Lấy tham chiếu các phần tử
const originalBox = sidebar.querySelector("#original-text");
const translatedBox = sidebar.querySelector("#translated-text");
const closeBtn = sidebar.querySelector("#close-sidebar-btn");
const langSelect = sidebar.querySelector("#target-lang-select");

// --- 2. KHỞI TẠO MENU NGÔN NGỮ ---
// Đổ dữ liệu vào menu thả xuống
supportedLanguages.forEach(lang => {
    const option = document.createElement("option");
    option.value = lang.code;
    option.textContent = lang.name;
    langSelect.appendChild(option);
});

// Mặc định chọn Tiếng Việt
langSelect.value = "vi"; 

// Xử lý đóng sidebar
closeBtn.addEventListener("click", () => {
    sidebar.style.display = "none";
});

// --- 3. HÀM GỌI API DỊCH ---
// Bây giờ hàm này nhận thêm tham số targetLang
async function translateText(text, targetLang) {
    // sl=auto (Tự nhận diện nguồn), tl=targetLang (Đích do người dùng chọn)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data[0].map(x => x[0]).join("");
    } catch (e) {
        return "Lỗi kết nối hoặc đoạn văn quá dài.";
    }
}

// --- 4. XỬ LÝ SỰ KIỆN ---

let debounceTimer = null;
let currentText = ""; // Lưu lại text hiện tại để nếu đổi ngôn ngữ thì dịch lại luôn

// Khi người dùng thay đổi ngôn ngữ trong Menu
langSelect.addEventListener("change", async () => {
    if (currentText.length > 0) {
        // Hiện trạng thái đang dịch lại
        translatedBox.innerHTML = '<div class="loader"></div> Đang dịch lại...';
        
        // Gọi dịch ngay lập tức với ngôn ngữ mới
        const newLang = langSelect.value;
        const result = await translateText(currentText, newLang);
        translatedBox.textContent = result;
    }
});

// Khi bôi đen văn bản
document.addEventListener("mouseup", async (e) => {
    if (sidebar.contains(e.target)) return;

    const selection = window.getSelection();
    const text = selection.toString().trim();

    // Reset timer cũ
    if (debounceTimer) clearTimeout(debounceTimer);

    if (text.length > 0) {
        currentText = text; // Lưu text lại
        
        // Hiện giao diện
        sidebar.style.display = "flex";
        originalBox.textContent = text;
        translatedBox.innerHTML = '<span style="color:#888; font-style:italic;">Đang đợi bạn chọn xong...</span>';

        // Debounce 0.8s
        debounceTimer = setTimeout(async () => {
            translatedBox.innerHTML = '<div class="loader"></div> Đang dịch...';
            
            // Lấy ngôn ngữ đang chọn trong menu
            const targetLang = langSelect.value;
            
            const result = await translateText(text, targetLang);
            translatedBox.textContent = result;
        }, 800);
    }
});