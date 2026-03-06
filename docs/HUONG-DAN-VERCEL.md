# Hướng dẫn deploy lên Vercel (tự động cập nhật web khi push GitHub)

Khi bạn **push code lên GitHub**, Vercel sẽ tự động build và cập nhật website. Chỉnh sửa trên máy → push → vài phút sau web đã mới.

---

## Deploy nhanh những gì đã chỉnh (đã có project trên Vercel)

Nếu **đã kết nối repo** với Vercel rồi:

1. **Commit** thay đổi: `git add .` rồi `git commit -m "Mô tả thay đổi"`
2. **Push** lên branch chính (thường là `main`): `git push origin main`
3. Vào **Vercel Dashboard** → **Deployments** → đợi deploy xong.

**Lần đầu chưa có project?** Làm từ Bước 1 bên dưới.

---

## Bước 1: Đăng ký / đăng nhập Vercel bằng GitHub

1. Mở trình duyệt, vào **https://vercel.com**
2. Bấm **Sign Up** (hoặc **Log In** nếu đã có tài khoản)
3. Chọn **Continue with GitHub**
4. Đăng nhập GitHub nếu được hỏi → bấm **Authorize Vercel** để cho Vercel truy cập repo

---

## Bước 2: Import project từ GitHub

1. Trên Vercel Dashboard, bấm **Add New…** → **Project**
2. Trong danh sách repo, tìm **real-estate-marketplace** (hoặc tên repo của bạn)
   - Nếu không thấy: bấm **Adjust GitHub App Permissions** → chọn đúng account/organization → bật quyền cho repo
3. Bấm **Import** bên cạnh repo **real-estate-marketplace**

---

## Bước 3: Cấu hình build (thường giữ mặc định)

| Mục | Giá trị (Next.js thường tự nhận) |
|-----|----------------------------------|
| **Framework Preset** | Next.js |
| **Root Directory** | `./` (để trống) |
| **Build Command** | `next build` (mặc định) |
| **Output Directory** | `.next` (mặc định) |
| **Install Command** | `npm install` (mặc định) |

Nếu dùng **worktree** hoặc repo con, chỉnh **Root Directory** cho đúng thư mục chứa `package.json`.

---

## Bước 4: Thêm biến môi trường (Environment Variables)

Project dùng Supabase, Stripe, Resend — cần khai báo trên Vercel:

1. Trong bước Import, kéo xuống **Environment Variables**
2. Thêm lần lượt (copy từ file `.env.local` trên máy, **không commit** file này lên GitHub):

| Name | Ghi chú |
|------|--------|
| `STRIPE_SECRET_KEY` | Từ Stripe Dashboard (key bí mật) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key của Supabase |
| `RESEND_API_KEY` | API key từ Resend (form liên hệ) |
| `NEXT_PUBLIC_SITE_URL` | (Tùy chọn) URL site production, ví dụ: `https://xxx.vercel.app` |

3. Chọn môi trường: **Production** (và nếu muốn preview: **Preview**)
4. Bấm **Deploy**

---

## Bước 5: Chờ deploy xong

- Vercel sẽ chạy `npm install` → `next build` → deploy
- Lần đầu có thể mất 1–2 phút
- Khi xong, bạn sẽ có link dạng: **https://real-estate-marketplace-xxx.vercel.app** (hoặc tên bạn đặt)

---

## Tự động cập nhật web khi chỉnh sửa

Sau khi đã kết nối repo:

1. **Chỉnh sửa code** trong Cursor (trên máy)
2. **Commit và push** lên GitHub:

   ```bash
   git add .
   git commit -m "Mô tả thay đổi"
   git push origin main
   ```

3. Vào **Vercel Dashboard** → **Deployments**: sẽ thấy deployment mới tự chạy
4. Vài phút sau, **website live** đã dùng code mới

Mặc định Vercel deploy khi bạn push lên **branch chính** (thường là `main`). Push lên branch khác sẽ tạo **Preview URL** riêng.

---

## Một số mục trong Vercel (sau khi đã có project)

| Việc | Cách làm |
|------|----------|
| Xem link production | Vercel Dashboard → chọn project → **Domains** hoặc **Deployments** (link trên cùng) |
| Đổi tên project / subdomain | **Settings** → **General** → **Project Name** |
| Thêm domain riêng (vd: edisonyang.xyz) | **Settings** → **Domains** → **Add** |
| Sửa biến môi trường | **Settings** → **Environment Variables** |
| Redeploy thủ công | **Deployments** → bấm ⋮ bên deployment → **Redeploy** |

---

## Tóm tắt

1. Đăng nhập Vercel bằng **GitHub**
2. **Import** repo **real-estate-marketplace**
3. Thêm **Environment Variables** (Stripe, Supabase, Resend)
4. **Deploy** → lấy link production
5. Mỗi lần **git push origin main** → web tự cập nhật

Nếu bạn gửi thêm (ví dụ: link repo, branch đang dùng), có thể viết lại bước 2–3 cho đúng từng trường hợp (worktree, monorepo, v.v.).
