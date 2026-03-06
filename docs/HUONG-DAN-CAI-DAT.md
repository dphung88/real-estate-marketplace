# Hướng dẫn cài đặt – Axiom Realty Website

Hướng dẫn từng bước để cài Node.js, dependencies và chạy website trên máy Mac.

---

## Phần 1: Cài Node.js (bắt buộc)

Node.js chứa `npm` – công cụ cài đặt package. Nếu chưa có Node, cần cài trước.

### Cách A: Tải từ website (đơn giản nhất)

1. Mở trình duyệt và truy cập: **https://nodejs.org**
2. Tải phiên bản **LTS** (nút màu xanh lá)
3. Mở file vừa tải (ví dụ: `node-v20.x.x.pkg`)
4. Bấm **Continue** → **Continue** → **Agree** → **Install** → nhập mật khẩu Mac nếu được hỏi
5. Bấm **Close** khi cài xong
6. **Đóng hết Cursor** rồi mở lại (hoặc đóng hết Terminal rồi mở Terminal mới)
7. Kiểm tra đã cài xong chưa:
   - Mở Terminal (trong Cursor: **View** → **Terminal** hoặc ``Ctrl + ` ``)
   - Gõ:
   ```bash
   node -v
   npm -v
   ```
   - Nếu thấy số phiên bản (vd: `v20.11.0`, `10.2.4`) → cài thành công

---

### Cách B: Cài bằng nvm (qua Terminal)

Dùng cách này nếu bạn muốn cài qua lệnh và không muốn tải file .pkg.

1. Mở Terminal trong Cursor: **View** → **Terminal** (hoặc ``Ctrl + ` ``)
2. Cài nvm:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```
3. Đóng Terminal, mở Terminal mới
4. Cài Node.js:
   ```bash
   nvm install --lts
   ```
5. Kiểm tra:
   ```bash
   node -v
   npm -v
   ```

---

## Phần 2: Cài dependencies cho project

1. Mở Terminal trong Cursor (nếu chưa mở)
2. Vào thư mục project:
   ```bash
   cd /Users/edisonyang/Documents/Github/Real-Estate\ Website/real-estate-marketplace
   ```
   *(Chú ý dấu `\` trước khoảng trắng)*
3. Chạy cài đặt package:
   ```bash
   npm install
   ```
4. Đợi vài giây đến 1 phút. Nếu thành công, sẽ thấy `added X packages` hoặc `up to date`

---

## Phần 3: Cấu hình Stripe (để có thanh toán)

1. Trong thư mục project, tạo file `.env.local`:
   - Cursor: **File** → **New File**
   - Gõ nội dung:
   ```env
   STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
   ```
   - Thay `sk_test_xxxxxxxxxxxxx` bằng Secret key từ [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
   - Lưu vào thư mục gốc project với tên: `.env.local`

2. Lấy Secret key:
   - Vào https://dashboard.stripe.com
   - Bật **Test mode** (góc trên bên phải)
   - **Developers** → **API keys**
   - Copy **Secret key** (`sk_test_...`)

---

## Phần 4: Chạy website

1. Trong Terminal (đã ở thư mục project):
   ```bash
   npm run dev
   ```
2. Đợi đến khi thấy:
   ```
   ✓ Ready in ...
   ○ Local: http://localhost:3000
   ```
3. Mở trình duyệt, truy cập: **http://localhost:3000**
4. Vào trang **Used Items** → bấm **Checkout** trên bất kỳ sản phẩm nào → test thanh toán với thẻ `4242 4242 4242 4242`

---

## Tóm tắt thứ tự

| Bước | Lệnh/Hành động |
|------|-----------------|
| 1 | Cài Node.js (Cách A hoặc B ở trên) |
| 2 | Đóng & mở lại Terminal/Cursor |
| 3 | `cd /Users/edisonyang/Documents/Github/Real-Estate\ Website/real-estate-marketplace` |
| 4 | `npm install` |
| 5 | Tạo `.env.local` với `STRIPE_SECRET_KEY=sk_test_...` |
| 6 | `npm run dev` |
| 7 | Mở http://localhost:3000 |

---

## Lỗi thường gặp

**`command not found: npm`**  
→ Node.js chưa cài hoặc chưa load. Thử đóng hết Cursor, mở lại, mở Terminal mới.

**`command not found: node`**  
→ Cài Node.js lại theo Phần 1.

**`EACCES` hoặc `permission denied`**  
→ Chạy Terminal với quyền bình thường, không dùng sudo cho `npm install`.

**`STRIPE_SECRET_KEY` không có / Checkout báo lỗi**  
→ Kiểm tra đã tạo `.env.local` và có `STRIPE_SECRET_KEY=sk_test_...` chưa. Sau khi sửa .env, cần dừng `npm run dev` (Ctrl+C) rồi chạy lại.
