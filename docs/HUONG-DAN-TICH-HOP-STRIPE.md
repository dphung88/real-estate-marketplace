# Hướng dẫn tích hợp Stripe – Từng bước (Đã có tài khoản Stripe)

Website Axiom Realty đã sẵn sàng tích hợp Stripe. Bạn chỉ cần cấu hình keys và chạy.

---

## Bước 1: Lấy Secret Key từ Stripe

1. Đăng nhập **[Stripe Dashboard](https://dashboard.stripe.com)**
2. Góc trên bên phải → bật **Test mode** (nền cam)
3. Sidebar trái → **Developers** → **API keys**
4. Tìm **Secret key** (`sk_test_...`) → **Reveal** rồi **Copy**

> Chỉ cần **Secret key** (sk_test_...). Publishable key không dùng trong cách triển khai hiện tại.

---

## Bước 2: Cài dependencies

Mở terminal trong thư mục dự án và chạy:

```bash
npm install
```

---

## Bước 3: Tạo file .env.local

1. Trong thư mục gốc dự án (cùng cấp với `package.json`), tạo file `.env.local`
2. Thêm nội dung:

```env
STRIPE_SECRET_KEY=paste_your_secret_key_from_stripe_dashboard
```

Thay `paste_your_secret_key_from_stripe_dashboard` bằng Secret key (bắt đầu bằng sk_test_) đã copy ở Bước 1.

*(Tùy chọn)* Để redirect chuẩn khi deploy:

```env
NEXT_PUBLIC_SITE_URL=https://edisonyang.xyz
```

---

## Bước 4: Chạy local và test

```bash
npm run dev
```

1. Mở trình duyệt → **http://localhost:3000/used-items**
2. Chọn 1 item → bấm **"Checkout $X"**
3. Khi được chuyển sang trang Stripe Checkout:
   - **Số thẻ:** `4242 4242 4242 4242`
   - **Ngày hết hạn:** ví dụ `12/34`
   - **CVC:** ví dụ `123`
   - **ZIP:** ví dụ `12345`
4. Thanh toán xong → quay lại trang Used Items với thông báo "Payment successful!"

---

## Bước 5: Cấu hình trên Vercel (để website live nhận thanh toán)

1. Vào **[Vercel Dashboard](https://vercel.com)** → chọn project Axiom Realty
2. **Settings** → **Environment Variables**
3. Thêm biến:

   | Name | Value |
   |------|-------|
   | `STRIPE_SECRET_KEY` | `sk_test_...` (copy từ Bước 1) |

4. Chọn **Production**, **Preview**, **Development**
5. **Save** → quay lại **Deployments** → **Redeploy** (3 chấm → Redeploy)

---

## Bước 6: Test trên production

1. Truy cập **https://edisonyang.xyz/used-items** (hoặc domain thật của bạn)
2. Bấm **Checkout** trên bất kỳ item nào
3. Thanh toán bằng thẻ test `4242 4242 4242 4242`
4. Kiểm tra trong Stripe Dashboard → **Payments** → có payment test

---

## Kiểm tra nhanh

| Bước | Làm gì | Trạng thái |
|------|--------|------------|
| 1 | Copy Secret key từ Stripe | ☐ |
| 2 | Chạy `npm install` | ☐ |
| 3 | Tạo `.env.local` với `STRIPE_SECRET_KEY` | ☐ |
| 4 | Chạy `npm run dev` và test local | ☐ |
| 5 | Thêm `STRIPE_SECRET_KEY` vào Vercel | ☐ |
| 6 | Redeploy và test trên production | ☐ |

---

## Thẻ test Stripe

| Số thẻ | Kết quả |
|--------|---------|
| `4242 4242 4242 4242` | ✅ Thanh toán thành công |
| `4000 0000 0000 0002` | ❌ Thẻ bị từ chối |

---

## Khi sẵn sàng nhận tiền thật (Live)

1. Stripe Dashboard → tắt **Test mode**
2. Hoàn tất thông tin doanh nghiệp và liên kết tài khoản ngân hàng (Busey)
3. Lấy **Live Secret key** (`sk_live_...`)
4. Cập nhật `STRIPE_SECRET_KEY` trên Vercel thành `sk_live_...`
5. Redeploy

---

## Lưu ý

- **Test mode:** Không có giao dịch thật, không cần bank account
- **Live mode:** Cần bank account để nhận tiền
- Mỗi item trên trang có giá sẵn → Stripe Checkout dùng đúng giá đó (dynamic pricing, không cần tạo Product trên Stripe trước)
