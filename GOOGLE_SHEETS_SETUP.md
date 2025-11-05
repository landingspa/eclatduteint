# Hướng dẫn cấu hình Google Sheets cho Form "Quan Tâm"

## Bước 1: Tạo Google Spreadsheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một Spreadsheet mới
3. Đặt tên cho sheet (ví dụ: "Danh sách Quan Tâm")
4. Tạo header cho các cột (dòng đầu tiên):
   - A1: Thời gian
   - B1: Họ và tên
   - C1: Số điện thoại / Zalo
   - D1: Email
   - E1: Tên spa / phòng khám
   - F1: Địa chỉ
   - G1: Vai trò
   - H1: Mong muốn khi tham dự
   - I1: Hình thức xác nhận
   - J1: Ghi chú khác

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, chọn **Extensions** > **Apps Script**
2. Xóa code mẫu và paste code sau:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the JSON data
    var data = JSON.parse(e.postData.contents);

    // Append the data to the sheet
    sheet.appendRow(data.data);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Data added successfully",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Lưu project (đặt tên ví dụ: "Interest Form Handler")

## Bước 3: Deploy Web App

1. Click nút **Deploy** > **New deployment**
2. Click biểu tượng gear ⚙️ bên cạnh "Select type"
3. Chọn **Web app**
4. Cấu hình:
   - **Description**: Interest Form Submission
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Authorize app (cho phép quyền truy cập)
7. **Copy URL** được tạo ra (dạng: https://script.google.com/macros/s/...../exec)

## Bước 4: Cấu hình Environment Variable

1. Tạo file `.env.local` trong thư mục root của project (nếu chưa có)
2. Thêm dòng sau với URL vừa copy:

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Restart development server:

```bash
npm run dev
```

## Bước 5: Test

1. Truy cập website
2. Click nút "Quan Tâm" ở góc trái màn hình
3. Điền form và submit
4. Kiểm tra Google Sheet xem dữ liệu đã được thêm vào chưa

## Troubleshooting

### Lỗi CORS

- Đảm bảo "Who has access" được set là "Anyone" trong cấu hình Deploy
- Có thể cần re-deploy lại Web App

### Lỗi Authorization

- Kiểm tra lại quyền truy cập của Script
- Thử authorize lại trong Apps Script

### Dữ liệu không được ghi

- Kiểm tra console log trong Apps Script (View > Executions)
- Đảm bảo URL trong .env.local chính xác
- Kiểm tra tên sheet có đúng không (mặc định là sheet đầu tiên)

## Bảo mật

**Lưu ý quan trọng:**

- File `.env.local` không được commit lên git (đã có trong .gitignore)
- Nếu cần thay đổi quyền truy cập, có thể cấu hình authentication trong Apps Script
- Có thể thêm validation hoặc spam protection nếu cần

## Xem dữ liệu

Truy cập Google Sheet của bạn bất cứ lúc nào để xem danh sách người đăng ký quan tâm.
