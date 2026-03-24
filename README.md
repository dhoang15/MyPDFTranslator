# PDF Split Translator (Dịch Song Ngữ)

Extension Chrome giúp dịch file PDF sang Tiếng Việt (và nhiều ngôn ngữ khác) với giao diện chia đôi màn hình (Split View). Hỗ trợ tốt cho sinh viên đọc tài liệu học tập.

## Tính năng
- **Split View:** Chia đôi màn hình, một bên tiếng Anh, một bên bản dịch.
- **Offline Mode:** Hỗ trợ dịch file PDF trong máy tính (Kéo thả).
- **Auto Debounce:** Tối ưu hóa API để không bị Google chặn request.
- **Multi-language:** Hỗ trợ dịch sang nhiều ngôn ngữ khác nhau.

## 🛠 Cách cài đặt (Install)
Do đây là bản Developer, bạn cần cài đặt thủ công:

1. Tải toàn bộ Code về máy (Download ZIP và giải nén).
2. Mở trình duyệt Chrome hoặc Edge.
3. Truy cập: `chrome://extensions` (hoặc `edge://extensions`).
4. Bật chế độ **Developer mode** (Góc trên bên phải).
5. Bấm nút **Load unpacked** -> Chọn thư mục chứa code.
6. **QUAN TRỌNG:** Tại trang quản lý Extension, tìm **PDF Split Translator**, bấm **Details** -> Bật dòng **"Allow access to file URLs"** (Cho phép truy cập vào các URL tệp).

## Cách sử dụng
1. Tải file PDF cần đọc về máy tính.
2. Mở một Tab trình duyệt trống.
3. Kéo file PDF thả vào Tab đó.
4. Bấm vào icon Extension trên thanh công cụ.
5. Bôi đen đoạn văn bản cần dịch -> Kết quả sẽ hiện bên tay phải.

## Lưu ý
Dự án sử dụng Google Translate API miễn phí (Unofficial) cho mục đích học tập. Vui lòng không spam request quá nhanh.

## Credits
- Built with [PDF.js](https://mozilla.github.io/pdf.js/) by Mozilla.
