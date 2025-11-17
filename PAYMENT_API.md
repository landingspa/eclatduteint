# 💳 Payment API Documentation - PayOS Integration

Base URL: `http://localhost:3335/api`

## 📋 Tổng quan

API thanh toán sử dụng **PayOS** - cổng thanh toán trực tuyến cho Việt Nam, hỗ trợ:

- Chuyển khoản ngân hàng
- Thanh toán qua QR Code
- Các phương thức thanh toán phổ biến tại Việt Nam
- Đơn vị tiền tệ: **VND**

---

## 🔐 Xác thực

Hầu hết các endpoint yêu cầu Bearer token trong Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

**Ngoại trừ**: Endpoint `/payments/webhook` (dành cho PayOS callback)

---

## 📌 Endpoints

### 1. Tạo Payment Link

**Endpoint:** `POST /payments/create`

**Authorization:** Required (Bearer Token)

**Description:** Tạo link thanh toán PayOS cho một đơn hàng

**Request Body:**

```json
{
  "orderId": "clxxx123456",
  "amount": 192000,
  "returnUrl": "http://localhost:8888/payment-success",
  "cancelUrl": "http://localhost:8888/payment-cancel"
}
```

**Request Fields:**

| Field     | Type   | Required | Description                                |
| --------- | ------ | -------- | ------------------------------------------ |
| orderId   | string | ✅       | ID của đơn hàng cần thanh toán             |
| amount    | number | ✅       | Số tiền thanh toán (VND)                   |
| returnUrl | string | ❌       | URL redirect khi thanh toán thành công     |
| cancelUrl | string | ❌       | URL redirect khi người dùng hủy thanh toán |

**Response (201):**

```json
{
  "checkoutUrl": "https://pay.payos.vn/web/xxxxx",
  "paymentId": "payment-uuid",
  "orderCode": 123456
}
```

**Response Fields:**

| Field       | Type   | Description                                        |
| ----------- | ------ | -------------------------------------------------- |
| checkoutUrl | string | URL trang thanh toán PayOS (redirect user đến đây) |
| paymentId   | string | ID của payment record trong database               |
| orderCode   | number | Mã đơn hàng PayOS (6 chữ số)                       |

**Error Responses:**

- `404 Not Found`: Order không tồn tại
- `400 Bad Request`: Order không thuộc về user hoặc payment đã tồn tại
- `401 Unauthorized`: Token không hợp lệ

**Example:**

```javascript
const response = await fetch('http://localhost:3335/api/payments/create', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    orderId: order.id,
    amount: 192000,
    returnUrl: 'http://localhost:8888/payment-success',
    cancelUrl: 'http://localhost:8888/payment-cancel',
  }),
});

const data = await response.json();
// Redirect user to PayOS
window.location.href = data.checkoutUrl;
```

---

### 2. PayOS Webhook

**Endpoint:** `POST /payments/webhook`

**Authorization:** None (PayOS callback)

**Description:** Endpoint nhận thông báo từ PayOS khi trạng thái thanh toán thay đổi

**Request Body (from PayOS):**

```json
{
  "code": "00",
  "desc": "success",
  "data": {
    "orderCode": 123456,
    "amount": 192000,
    "description": "Thanh toán đơn hàng #12345678",
    "accountNumber": "12345678",
    "reference": "FT12345678",
    "transactionDateTime": "2025-11-17 10:30:00",
    "currency": "VND",
    "paymentLinkId": "xxx-yyy-zzz",
    "code": "00",
    "desc": "Thành công",
    "counterAccountBankId": "",
    "counterAccountBankName": "",
    "counterAccountName": "",
    "counterAccountNumber": "",
    "virtualAccountName": "",
    "virtualAccountNumber": ""
  },
  "signature": "abc123def456..."
}
```

**Webhook Response Codes:**

| Code | Description             | Action                                          |
| ---- | ----------------------- | ----------------------------------------------- |
| 00   | Thanh toán thành công   | Payment status → SUCCEEDED, Order status → PAID |
| Khác | Thanh toán thất bại/hủy | Payment status → FAILED/CANCELLED               |

**Response (200):**

```json
{
  "success": true
}
```

**Security:**

- Webhook signature được verify tự động bằng PayOS SDK
- Chỉ các webhook hợp lệ từ PayOS mới được xử lý

**Lưu ý:**

- Endpoint này được PayOS gọi tự động, không cần gọi từ frontend
- Cần cấu hình webhook URL trong PayOS dashboard

---

### 3. Lấy thông tin thanh toán

**Endpoint:** `GET /payments/info/:orderCode`

**Authorization:** Required (Bearer Token)

**Description:** Lấy thông tin chi tiết về một giao dịch thanh toán từ PayOS

**URL Parameters:**

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| orderCode | number | Mã đơn hàng PayOS (6 chữ số) |

**Response (200):**

```json
{
  "id": "xxx-yyy-zzz",
  "orderCode": 123456,
  "amount": 192000,
  "amountPaid": 192000,
  "amountRemaining": 0,
  "status": "PAID",
  "createdAt": "2025-11-17T10:00:00.000Z",
  "transactions": [
    {
      "reference": "FT12345678",
      "amount": 192000,
      "accountNumber": "12345678",
      "description": "Thanh toán đơn hàng #12345678",
      "transactionDateTime": "2025-11-17T10:30:00.000Z",
      "counterAccountBankId": "970422",
      "counterAccountBankName": "MB Bank",
      "counterAccountName": "NGUYEN VAN A",
      "counterAccountNumber": "0123456789"
    }
  ],
  "cancellationReason": null,
  "canceledAt": null
}
```

**Error Responses:**

- `404 Not Found`: Payment không tồn tại
- `401 Unauthorized`: Token không hợp lệ

**Example:**

```javascript
const orderCode = 123456;
const response = await fetch(
  `http://localhost:3335/api/payments/info/${orderCode}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);

const paymentInfo = await response.json();
console.log('Payment status:', paymentInfo.status);
```

---

### 4. Hủy thanh toán

**Endpoint:** `POST /payments/cancel/:orderCode`

**Authorization:** Required (Bearer Token)

**Description:** Hủy một giao dịch thanh toán chưa hoàn thành

**URL Parameters:**

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| orderCode | number | Mã đơn hàng PayOS cần hủy |

**Response (200):**

```json
{
  "id": "xxx-yyy-zzz",
  "orderCode": 123456,
  "amount": 192000,
  "status": "CANCELLED",
  "canceledAt": "2025-11-17T10:45:00.000Z",
  "cancellationReason": "User cancelled"
}
```

**Error Responses:**

- `400 Bad Request`: Không thể hủy payment (đã thanh toán hoặc đã hủy)
- `404 Not Found`: Payment không tồn tại
- `401 Unauthorized`: Token không hợp lệ

**Lưu ý:**

- Chỉ có thể hủy payment đang ở trạng thái PENDING
- Payment đã PAID hoặc CANCELLED không thể hủy

**Example:**

```javascript
const orderCode = 123456;
const response = await fetch(
  `http://localhost:3335/api/payments/cancel/${orderCode}`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);

const result = await response.json();
console.log('Payment cancelled:', result);
```

---

### 5. Lịch sử thanh toán của tôi

**Endpoint:** `GET /payments/my-payments`

**Authorization:** Required (Bearer Token)

**Description:** Lấy danh sách tất cả payment của user hiện tại

**Response (200):**

```json
[
  {
    "id": "payment-uuid",
    "orderId": "order-uuid",
    "userId": "user-uuid",
    "paymentIntentId": "123456",
    "amount": 192000,
    "currency": "VND",
    "status": "SUCCEEDED",
    "createdAt": "2025-11-17T10:00:00.000Z",
    "updatedAt": "2025-11-17T10:30:00.000Z",
    "order": {
      "id": "order-uuid",
      "totalAmount": 192000,
      "status": "PAID",
      "customerName": "Admin",
      "customerEmail": "admin@eclat.com",
      "customerPhone": "0986003747",
      "customerAddress": "123 Trung Kính",
      "items": [
        {
          "id": "item-uuid",
          "productName": "Nước Hoa Hồng Làm Dịu 200ml",
          "quantity": 1,
          "price": 42000,
          "totalPrice": 42000
        }
      ]
    }
  }
]
```

**Example:**

```javascript
const response = await fetch('http://localhost:3335/api/payments/my-payments', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const payments = await response.json();
console.log('Total payments:', payments.length);
```

---

### 6. Tất cả payment (Admin only)

**Endpoint:** `GET /payments`

**Authorization:** Required (Bearer Token + ADMIN role)

**Description:** Lấy danh sách tất cả payment trong hệ thống (chỉ Admin)

**Response (200):**

```json
[
  {
    "id": "payment-uuid",
    "orderId": "order-uuid",
    "userId": "user-uuid",
    "paymentIntentId": "123456",
    "amount": 192000,
    "currency": "VND",
    "status": "SUCCEEDED",
    "createdAt": "2025-11-17T10:00:00.000Z",
    "updatedAt": "2025-11-17T10:30:00.000Z",
    "order": {
      "id": "order-uuid",
      "totalAmount": 192000,
      "status": "PAID",
      "items": [...]
    },
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "name": "User Name"
    }
  }
]
```

**Error Responses:**

- `403 Forbidden`: User không có quyền ADMIN
- `401 Unauthorized`: Token không hợp lệ

---

## 🔄 Flow thanh toán hoàn chỉnh

### Bước 1: Tạo đơn hàng

```javascript
const order = await fetch('http://localhost:3335/api/orders', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customerName: 'Nguyễn Văn A',
    customerEmail: 'customer@example.com',
    customerPhone: '0986003747',
    customerAddress: '123 Trung Kính, Hà Nội',
    items: [
      {
        productName: 'Nước Hoa Hồng Làm Dịu 200ml',
        quantity: 1,
        price: 42000,
        totalPrice: 42000,
      },
    ],
    region: 'North',
  }),
}).then((r) => r.json());
```

### Bước 2: Tạo payment link

```javascript
const payment = await fetch('http://localhost:3335/api/payments/create', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    orderId: order.id,
    amount: order.totalAmount,
    returnUrl: 'http://localhost:8888/payment-success',
    cancelUrl: 'http://localhost:8888/payment-cancel',
  }),
}).then((r) => r.json());

// Lưu orderCode để check sau
localStorage.setItem('paymentOrderCode', payment.orderCode);
```

### Bước 3: Redirect đến PayOS

```javascript
// Redirect user đến trang thanh toán PayOS
window.location.href = payment.checkoutUrl;
```

### Bước 4: User thanh toán trên PayOS

- User nhập thông tin thanh toán
- PayOS xử lý giao dịch (chuyển khoản ngân hàng, QR code, etc.)
- User xác nhận thanh toán

### Bước 5: PayOS redirect về website

**Nếu thành công:** Redirect đến `returnUrl`

```
http://localhost:8888/payment-success?orderCode=123456&status=PAID
```

**Nếu hủy:** Redirect đến `cancelUrl`

```
http://localhost:8888/payment-cancel?orderCode=123456&status=CANCELLED
```

### Bước 6: Xử lý trên return URL

```javascript
// Trên trang payment-success
const urlParams = new URLSearchParams(window.location.search);
const orderCode =
  urlParams.get('orderCode') || localStorage.getItem('paymentOrderCode');

if (orderCode) {
  // Optional: Check payment status
  const paymentInfo = await fetch(
    `http://localhost:3335/api/payments/info/${orderCode}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((r) => r.json());

  if (paymentInfo.status === 'PAID') {
    // Hiển thị thông báo thành công
    showSuccessMessage('Thanh toán thành công!');

    // Clear saved data
    localStorage.removeItem('paymentOrderCode');

    // Redirect đến trang order detail
    window.location.href = `/orders/${paymentInfo.data.description.match(/#(\w+)/)[1]}`;
  }
}
```

### Bước 7: PayOS webhook (background)

PayOS sẽ gọi webhook để cập nhật trạng thái:

- Payment status: `PENDING` → `SUCCEEDED`
- Order status: `PENDING` → `PAID`

---

## 📊 Payment Status

| Status    | Description           |
| --------- | --------------------- |
| PENDING   | Đang chờ thanh toán   |
| SUCCEEDED | Thanh toán thành công |
| FAILED    | Thanh toán thất bại   |
| CANCELLED | Đã hủy                |

---

## 🔑 Environment Variables

Cần thiết lập các biến môi trường sau trong file `.env`:

```env
# PayOS Credentials
CLIENT_ID_PAYOS=your_client_id
API_KEY_PAYOS=your_api_key
CHECKSUM_KEY=your_checksum_key

# Client URL (for default return/cancel URLs)
CLIENT_URL=http://localhost:8888
```

---

## 🛡️ Bảo mật

### 1. Webhook Signature Verification

- Mọi webhook từ PayOS đều được verify signature
- Sử dụng `CHECKSUM_KEY` để xác thực
- Webhook không hợp lệ sẽ bị reject

### 2. Order Ownership Check

- User chỉ có thể tạo payment cho order của mình
- Admin có thể xem tất cả payment

### 3. JWT Authentication

- Tất cả endpoint (trừ webhook) yêu cầu JWT token
- Token được verify với `JWT_SECRET`

---

## ⚠️ Lưu ý quan trọng

### 1. Order Code

- PayOS orderCode là số 6 chữ số
- Được generate tự động từ timestamp
- Dùng để track và query payment

### 2. Amount

- Đơn vị: VND (Vietnam Dong)
- Số nguyên, không dùng decimal
- Ví dụ: 42000 (42,000đ)

### 3. Return/Cancel URL

- Nên dùng absolute URL (có protocol http:// hoặc https://)
- PayOS sẽ append query params: `?orderCode=123456&status=PAID`
- Handle cả 2 trường hợp success và cancel

### 4. Webhook URL

- Phải public và accessible từ internet
- PayOS không thể gọi localhost
- Trong development, dùng ngrok hoặc similar tools

### 5. Payment Lifecycle

```
Create Payment → PENDING
    ↓
User pays → PENDING (waiting webhook)
    ↓
Webhook received → SUCCEEDED
    ↓
Order updated → PAID
```

---

## 🧪 Testing

### Test Payment Success Flow

```bash
# 1. Create order
curl -X POST http://localhost:3335/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test User",
    "customerEmail": "test@example.com",
    "customerPhone": "0123456789",
    "customerAddress": "123 Test St",
    "items": [
      {
        "productName": "Test Product",
        "quantity": 1,
        "price": 10000,
        "totalPrice": 10000
      }
    ]
  }'

# 2. Create payment
curl -X POST http://localhost:3335/api/payments/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORDER_ID",
    "amount": 10000,
    "returnUrl": "http://localhost:8888/success",
    "cancelUrl": "http://localhost:8888/cancel"
  }'

# 3. Get payment info
curl -X GET http://localhost:3335/api/payments/info/123456 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📞 Support

Nếu có vấn đề với PayOS integration:

1. Kiểm tra credentials trong `.env`
2. Xem logs trong console
3. Check PayOS dashboard
4. Liên hệ PayOS support: https://payos.vn/

---

## 📚 Tài liệu tham khảo

- [PayOS Documentation](https://payos.vn/docs)
- [PayOS Node.js SDK](https://github.com/payos-vn/payos-node)
- [API Documentation](./API_DOCUMENTATION.md)
