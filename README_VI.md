# Éclat du teint - Website Clone

Website clone của eclatduteint.com được xây dựng với Next.js 15, hỗ trợ đa ngôn ngữ (Tiếng Việt và Tiếng Anh).

## 🌟 Tính năng

- ✅ Hỗ trợ 2 ngôn ngữ: Tiếng Việt và Tiếng Anh
- ✅ Giao diện hiện đại với Tailwind CSS v4
- ✅ Responsive design - tương thích với mọi thiết bị
- ✅ Cấu hình đa ngôn ngữ chuyên nghiệp với next-intl
- ✅ Màu sắc và bố cục tương tự website gốc (purple theme)
- ✅ SEO friendly với metadata động
- ✅ Navigation mượt mà giữa các ngôn ngữ

## 🎨 Màu sắc chủ đạo

- **Purple Primary**: #7c3aed
- **Purple Secondary**: #a855f7
- **Pink Accent**: #ec4899
- **Gray Light**: #f8fafc

## 📦 Packages đã cài đặt

### Core Dependencies

- **next**: ^15.5.6 - Framework React
- **react**: ^19.1.0 - Thư viện UI
- **next-intl**: Quản lý đa ngôn ngữ chuyên nghiệp

### UI Components & Styling

- **@headlessui/react**: UI components không style sẵn, linh hoạt
- **@heroicons/react**: Icon library từ Heroicons
- **tailwindcss**: ^4 - CSS framework
- **framer-motion**: Animation library
- **clsx**: Utility để kết hợp class names

## 🗂️ Cấu trúc thư mục

```
eclatduteint/
├── messages/                    # File ngôn ngữ JSON
│   ├── vi.json                 # Tiếng Việt
│   └── en.json                 # English
├── src/
│   ├── app/
│   │   ├── [locale]/           # Dynamic route theo ngôn ngữ
│   │   │   ├── layout.tsx      # Layout với provider đa ngôn ngữ
│   │   │   └── page.tsx        # Trang chủ
│   │   ├── globals.css         # Global styles với theme màu
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Redirect đến locale mặc định
│   ├── components/             # React components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Hero.tsx            # Hero section
│   │   ├── PurpleLineSection.tsx
│   │   ├── FreeGiftSection.tsx
│   │   ├── AllProductsSection.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx # Chuyển đổi ngôn ngữ
│   └── i18n/                   # Cấu hình đa ngôn ngữ
│       ├── request.ts          # next-intl config
│       └── routing.ts          # Routing config
├── middleware.ts               # Middleware cho i18n routing
└── next.config.ts              # Next.js config với next-intl plugin
```

## 🚀 Cách chạy

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

### 3. Build production

```bash
npm run build
npm start
```

## 🌐 Quản lý đa ngôn ngữ

### Thêm text mới

Chỉnh sửa file trong thư mục `messages/`:

**messages/vi.json**

```json
{
  "navigation": {
    "brand": "Thương hiệu",
    "products": "Sản phẩm"
  }
}
```

**messages/en.json**

```json
{
  "navigation": {
    "brand": "Brand",
    "products": "Products"
  }
}
```

### Sử dụng trong component

```tsx
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("navigation");

  return <h1>{t("brand")}</h1>;
}
```

### Thêm ngôn ngữ mới

1. Tạo file `messages/[locale].json`
2. Thêm locale vào `src/i18n/routing.ts`:

```tsx
export const routing = defineRouting({
  locales: ["en", "vi", "ko"], // Thêm 'ko' cho tiếng Hàn
  defaultLocale: "vi",
});
```

3. Cập nhật middleware pattern trong `middleware.ts`

## 🎯 URLs

- Trang chủ tiếng Việt: `http://localhost:3000/vi`
- Trang chủ tiếng Anh: `http://localhost:3000/en`
- Root (`/`) tự động redirect sang `/vi`

## 🔧 Cấu hình

### Đổi ngôn ngữ mặc định

Trong `src/i18n/routing.ts`:

```tsx
export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en", // Đổi từ 'vi' sang 'en'
});
```

### Tùy chỉnh màu sắc

Chỉnh sửa `src/app/globals.css`:

```css
:root {
  --purple-primary: #7c3aed;
  --purple-secondary: #a855f7;
  --pink-accent: #ec4899;
}
```

## 📱 Sections chính

1. **Header** - Navigation với language switcher
2. **Hero Section** - Banner chính với call-to-action
3. **Purple Line Section** - Giới thiệu dòng sản phẩm cao cấp
4. **Free Gift Section** - Event quà tặng miễn phí
5. **All Products Section** - Danh sách sản phẩm
6. **Footer** - Thông tin công ty và links

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **i18n**: next-intl
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **Animations**: Framer Motion (đã cài đặt, chưa sử dụng)

## 📝 Lưu ý

- Project sử dụng Next.js App Router (không phải Pages Router)
- Tailwind CSS v4 có syntax khác với v3 (ví dụ: `bg-linear-to-br` thay vì `bg-gradient-to-br`)
- Middleware tự động redirect user đến ngôn ngữ phù hợp dựa trên browser locale
- Tất cả các translations được load tại server-side để tối ưu performance

## 🎨 Customization

Để tùy chỉnh thêm:

1. **Thêm trang mới**: Tạo file trong `src/app/[locale]/[page]/page.tsx`
2. **Thêm component**: Tạo trong `src/components/`
3. **Thêm translations**: Cập nhật các file JSON trong `messages/`
4. **Tùy chỉnh styles**: Chỉnh sửa `globals.css` hoặc thêm Tailwind classes

## 🐛 Troubleshooting

### Lỗi "Cannot find module"

- Chạy `npm install` để cài đặt lại dependencies
- Restart TypeScript server trong VS Code

### Translations không hiển thị

- Kiểm tra đường dẫn key trong file JSON
- Xác nhận file JSON có cú pháp đúng

### CSS không áp dụng

- Xóa folder `.next` và chạy lại `npm run dev`
- Kiểm tra Tailwind config trong `postcss.config.mjs`

---

Developed with ❤️ using Next.js and Tailwind CSS
