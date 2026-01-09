# DANH SÁCH DEPENDENCIES CHI TIẾT

> **Lưu ý:** File này liệt kê **TẤT CẢ** dependencies đã cài và sẽ cài, với giải thích chi tiết từng package.

---

## 📦 DEPENDENCIES (Chạy trên Browser)

> **Lưu ý:** Dependencies được bundle vào file `.js` cuối cùng, user sẽ download khi truy cập website.

### 1. ✅ react (^19.2.0)
- **Mục đích:** Core React library - UI framework
- **Trạng thái:** ✅ Đã có (từ Vite template)
- **Cài đặt:** `npm install react`
- **Giải thích:**
  - React là thư viện core để xây dựng UI
  - Cung cấp: Components, Hooks (useState, useEffect, useCallback, v.v.)
  - Version 19.2.0: Phiên bản mới nhất
- **Cách dùng:**
  ```tsx
  import { useState } from 'react'
  
  function Component() {
    const [count, setCount] = useState(0)
    return <div>{count}</div>
  }
  ```
- **Kiến thức cần:**
  - Components, Props, State
  - Hooks: useState, useEffect, useCallback, useMemo
  - JSX syntax
  - Virtual DOM

---

### 2. ✅ react-dom (^19.2.0)
- **Mục đích:** Render React components vào DOM thật
- **Trạng thái:** ✅ Đã có (từ Vite template)
- **Cài đặt:** `npm install react-dom`
- **Giải thích:**
  - `react-dom` là "cầu nối" giữa React và DOM thật của browser
  - Cung cấp: `createRoot()`, `render()`
- **Cách dùng:**
  ```tsx
  import { createRoot } from 'react-dom/client'
  
  createRoot(document.getElementById('root')!).render(<App />)
  ```
- **Kiến thức cần:**
  - `createRoot()`: Tạo React root
  - `render()`: Render component vào DOM
  - `document.getElementById('root')`: Lấy element từ DOM

---

### 3. ✅ react-router-dom (^7.11.0)
- **Mục đích:** Routing, điều hướng trang trong SPA
- **Trạng thái:** ✅ Đã cài
- **Cài đặt:** `npm install react-router-dom`
- **Giải thích:**
  - Cho phép tạo nhiều "trang" mà không reload lại trang
  - Ví dụ: `/login` → LoginPage, `/movies` → MovieListPage
- **Cách dùng:**
  ```tsx
  import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
  ```
- **Kiến thức cần:**
  - `BrowserRouter`: Provider cho routing
  - `Routes`: Container chứa các route
  - `Route`: Định nghĩa 1 route (path + component)
  - `Link`: Thẻ `<a>` không reload trang
  - `useNavigate()`: Hook để điều hướng programmatically
  - `useParams()`: Lấy params từ URL (`/movies/:id`)
  - Protected routes: Route chỉ user đăng nhập mới vào được

---

### 4. ✅ @tanstack/react-query (^5.90.16)
- **Mục đích:** Data fetching, caching, server state management
- **Trạng thái:** ✅ Đã cài
- **Cài đặt:** `npm install @tanstack/react-query`
- **Giải thích:**
  - Thay thế `useEffect + fetch` bằng hooks mạnh mẽ hơn
  - Tự động cache, refetch, loading states, error handling
  - Giảm code, tăng performance
- **Cách dùng:**
  ```tsx
  import { useQuery } from '@tanstack/react-query'
  import axios from 'axios'
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: () => axios.get('/api/movies').then(res => res.data)
  })
  ```
- **Kiến thức cần:**
  - `QueryClient`: Quản lý cache và config
  - `QueryClientProvider`: Bọc app để dùng React Query
  - `useQuery`: Hook để fetch data (GET requests)
  - `useMutation`: Hook để mutate data (POST, PUT, DELETE)
  - `queryKey`: Key để cache data (ví dụ: `['movies']`, `['movies', id]`)
  - `queryFn`: Function fetch data
  - `staleTime`: Thời gian data được coi là "fresh" (mặc định: 0)
  - `gcTime`: Thời gian cache data (trước đây là `cacheTime`, mặc định: 5 phút)
  - `refetchOnWindowFocus`: Tự động refetch khi focus window (mặc định: true)
  - `retry`: Số lần retry khi lỗi (mặc định: 3)

---

### 5. ✅ axios (^1.13.2)
- **Mục đích:** HTTP client, gọi API Backend
- **Trạng thái:** ✅ Đã cài
- **Cài đặt:** `npm install axios`
- **Giải thích:**
  - Thay thế `fetch` với nhiều tính năng hơn
  - Dễ config: baseURL, interceptors, headers
  - Tự động parse JSON, error handling tốt hơn
- **Cách dùng:**
  ```tsx
  import axios from 'axios'
  
  // GET request
  const response = await axios.get('/api/movies')
  
  // POST request
  await axios.post('/api/movies', { name: 'Avengers' })
  
  // Tạo instance với config
  const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  ```
- **Kiến thức cần:**
  - `axios.get(url)`: GET request
  - `axios.post(url, data)`: POST request
  - `axios.put(url, data)`: PUT request
  - `axios.delete(url)`: DELETE request
  - `axios.create()`: Tạo instance với config
  - Interceptors: Tự động thêm token vào mọi request
  - Error handling: `try/catch` hoặc `.catch()`

---

### 6. ⏳ react-hook-form (^7.x) - Sẽ cài TUẦN 2
- **Mục đích:** Form validation, quản lý form state
- **Trạng thái:** ⏳ Chưa cài
- **Cài đặt:** `npm install react-hook-form`
- **Giải thích:**
  - Quản lý form state, validation, error handling
  - Ít re-render hơn tự dùng `useState` cho từng field
  - Performance tốt hơn
- **Cách dùng:**
  ```tsx
  import { useForm } from 'react-hook-form'
  
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('email', { required: true })} />
    {errors.email && <span>Email là bắt buộc</span>}
  </form>
  ```
- **Khi nào cài:** TUẦN 2 - NGÀY 5 (Auth pages)

---

### 7. ⏳ yup (^1.x) - Sẽ cài TUẦN 2
- **Mục đích:** Schema validation cho forms
- **Trạng thái:** ⏳ Chưa cài
- **Cài đặt:** `npm install yup @hookform/resolvers`
- **Giải thích:**
  - Định nghĩa validation rules bằng schema
  - Kết hợp với React Hook Form
- **Cách dùng:**
  ```tsx
  import * as yup from 'yup'
  import { yupResolver } from '@hookform/resolvers/yup'
  
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
  })
  
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })
  ```
- **Khi nào cài:** TUẦN 2 - NGÀY 5 (Auth pages)

---

### 8. ⏳ date-fns (^3.x) - Sẽ cài TUẦN 3
- **Mục đích:** Xử lý ngày tháng, format date
- **Trạng thái:** ⏳ Chưa cài
- **Cài đặt:** `npm install date-fns`
- **Giải thích:**
  - Format date: `format(new Date(), 'dd/MM/yyyy')`
  - Tính toán: `addDays()`, `subDays()`, `differenceInDays()`
  - Tree-shake tốt (chỉ import function cần dùng)
- **Cách dùng:**
  ```tsx
  import { format, addDays } from 'date-fns'
  
  format(new Date(), 'dd/MM/yyyy HH:mm')
  addDays(new Date(), 7)
  ```
- **Khi nào cài:** TUẦN 3 - Khi làm Showtime, Booking

---

### 9. ⏳ recharts (^2.x) - Sẽ cài TUẦN 4
- **Mục đích:** Charts cho Dashboard Admin
- **Trạng thái:** ⏳ Chưa cài
- **Cài đặt:** `npm install recharts`
- **Giải thích:**
  - Vẽ biểu đồ: Line chart, Bar chart, Pie chart
  - Dựa trên React + SVG
  - Responsive, customizable
- **Cách dùng:**
  ```tsx
  import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'
  
  <LineChart data={data}>
    <Line dataKey="revenue" />
    <XAxis dataKey="date" />
    <YAxis />
  </LineChart>
  ```
- **Khi nào cài:** TUẦN 4 - Khi làm Dashboard Admin

---

### 10. ⏳ react-hot-toast (^2.x) - Sẽ cài TUẦN 2
- **Mục đích:** Toast notification, thông báo cho user
- **Trạng thái:** ⏳ Chưa cài
- **Cài đặt:** `npm install react-hot-toast`
- **Giải thích:**
  - Thông báo thành công/lỗi đẹp, nhẹ
  - Thay thế SweetAlert2 (nhẹ hơn, đẹp hơn)
- **Cách dùng:**
  ```tsx
  import toast from 'react-hot-toast'
  
  toast.success('Đăng nhập thành công!')
  toast.error('Có lỗi xảy ra!')
  ```
- **Khi nào cài:** TUẦN 2 - Khi làm Auth pages, CRUD operations

---

### 11. ⏳ react-datepicker (^4.x) - Sẽ cài TUẦN 3
- **Mục đích:** Date picker component, chọn ngày
- **Trạng thái:** ⏳ Chưa cài
- **Cài đặt:** `npm install react-datepicker @types/react-datepicker`
- **Giải thích:**
  - Component chọn ngày đẹp, dễ dùng
  - Hỗ trợ: chọn ngày, range, time picker
- **Cách dùng:**
  ```tsx
  import DatePicker from 'react-datepicker'
  import 'react-datepicker/dist/react-datepicker.css'
  
  <DatePicker selected={date} onChange={setDate} />
  ```
- **Khi nào cài:** TUẦN 3 - Khi làm Showtime, Booking flow

---

### 12. ⏳ react-error-boundary (^4.x) - Sẽ cài TUẦN 2
- **Mục đích:** Error boundaries, bắt lỗi React component
- **Trạng thái:** ⏳ Chưa cài
- **Cài đặt:** `npm install react-error-boundary`
- **Giải thích:**
  - Bắt lỗi trong component tree
  - Hiển thị fallback UI khi có lỗi
  - Tránh crash toàn bộ app
- **Cách dùng:**
  ```tsx
  import { ErrorBoundary } from 'react-error-boundary'
  
  <ErrorBoundary fallback={<ErrorFallback />}>
    <App />
  </ErrorBoundary>
  ```
- **Khi nào cài:** TUẦN 2 - Setup error boundaries cho toàn bộ app

---

## 🛠️ DEV DEPENDENCIES (Chỉ dùng khi Dev/Build)

> **Lưu ý:** DevDependencies không được bundle vào file cuối cùng, chỉ dùng khi: `npm run dev`, `npm run build`, `npm run lint`

### 1. ✅ vite (^7.2.4)
- **Mục đích:** Build tool và dev server
- **Trạng thái:** ✅ Đã có (từ Vite template)
- **Giải thích:**
  - Dev server: Nhanh, HMR (Hot Module Replacement)
  - Build tool: Bundle code cho production
- **Kiến thức cần:**
  - `vite.config.ts`: Cấu hình Vite
  - `npm run dev`: Chạy dev server
  - `npm run build`: Build production

---

### 2. ✅ @vitejs/plugin-react (^5.1.1)
- **Mục đích:** Vite plugin để hiểu React/JSX
- **Trạng thái:** ✅ Đã có (từ Vite template)
- **Giải thích:**
  - Cho phép Vite compile JSX/TSX
  - Fast Refresh: Sửa code → tự động reload component

---

### 3. ✅ typescript (~5.9.3)
- **Mục đích:** TypeScript compiler
- **Trạng thái:** ✅ Đã có (từ Vite template)
- **Giải thích:**
  - Compile TypeScript → JavaScript
  - Type checking

---

### 4. ✅ tailwindcss (^4.1.18)
- **Mục đích:** CSS framework (utility-first)
- **Trạng thái:** ✅ Đã cài
- **Cài đặt:** `npm install -D tailwindcss`
- **Giải thích:**
  - Utility-first CSS: Viết CSS trực tiếp trong JSX
  - Ví dụ: `className="px-4 py-2 bg-blue-600 text-white"`
- **Cách dùng:**
  ```tsx
  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    Click me
  </button>
  ```
- **Kiến thức cần:**
  - Utility classes: `px-4`, `bg-blue-600`, `text-white`
  - Responsive: `md:`, `lg:` (ví dụ: `md:px-6`)
  - Hover/Focus: `hover:bg-blue-700`, `focus:ring-2`

---

### 5. ✅ @tailwindcss/vite (^4.1.18)
- **Mục đích:** Vite plugin cho Tailwind CSS v4
- **Trạng thái:** ✅ Đã cài
- **Cài đặt:** `npm install -D @tailwindcss/vite`
- **Giải thích:**
  - Tailwind v4 không cần `tailwind.config.js` nữa
  - Chỉ cần plugin trong `vite.config.ts`
- **Cách dùng:**
  ```ts
  import tailwindcss from '@tailwindcss/vite'
  
  plugins: [react(), tailwindcss()]
  ```

---

### 6. ✅ prettier (^3.7.4)
- **Mục đích:** Format code tự động
- **Trạng thái:** ✅ Đã cài
- **Cài đặt:** `npm install -D prettier`
- **Giải thích:**
  - Format code: indent, quotes, semicolons
  - Tự động format khi save (nếu setup VS Code)
- **Cách dùng:**
  ```bash
  npm run format    # Format tất cả files
  ```
- **Kiến thức cần:**
  - `.prettierrc`: Config Prettier
  - `.prettierignore`: Ignore files

---

### 7. ✅ vite-tsconfig-paths (^6.0.3)
- **Mục đích:** Path aliases (`@/components` thay vì `../../components`)
- **Trạng thái:** ✅ Đã cài
- **Cài đặt:** `npm install -D vite-tsconfig-paths`
- **Giải thích:**
  - Import dễ hơn: `import Button from '@/components/ui/Button'`
  - Không cần `../../` nữa
- **Cách dùng:**
  - Cấu hình trong `vite.config.ts` và `tsconfig.json`
  - Import: `import Button from '@/components/ui/Button'`

---

### 8. ✅ rollup-plugin-visualizer (^6.0.5)
- **Mục đích:** Phân tích bundle size
- **Trạng thái:** ✅ Đã cài
- **Cài đặt:** `npm install -D rollup-plugin-visualizer`
- **Giải thích:**
  - Tạo file HTML hiển thị bundle size
  - Tìm code thừa, optimize bundle
- **Cách dùng:**
  - Thêm vào `vite.config.ts`
  - Sau khi build → mở `dist/stats.html`

---

### 9. ✅ eslint (^9.39.1)
- **Mục đích:** Code quality, bắt lỗi
- **Trạng thái:** ✅ Đã có (từ Vite template)
- **Giải thích:**
  - Kiểm tra code, bắt lỗi, enforce style
- **Cách dùng:**
  ```bash
  npm run lint    # Check code
  ```

---

### 10. ✅ postcss (^8.5.6)
- **Mục đích:** CSS processor (cần cho Tailwind)
- **Trạng thái:** ✅ Đã cài
- **Giải thích:**
  - Xử lý CSS: autoprefixer, minify
  - Tailwind cần PostCSS để hoạt động

---

### 11. ✅ autoprefixer (^10.4.23)
- **Mục đích:** Tự động thêm vendor prefixes (-webkit-, -moz-)
- **Trạng thái:** ✅ Đã cài
- **Giải thích:**
  - Tự động thêm `-webkit-`, `-moz-` cho CSS
  - Đảm bảo tương thích với nhiều browser

---

### 12. ✅ @types/react (^19.2.5)
- **Mục đích:** TypeScript types cho React
- **Trạng thái:** ✅ Đã có (từ Vite template)
- **Giải thích:**
  - Type definitions cho React
  - Giúp TypeScript hiểu React types

---

### 13. ✅ @types/react-dom (^19.2.3)
- **Mục đích:** TypeScript types cho React DOM
- **Trạng thái:** ✅ Đã có (từ Vite template)

---

### 14. ✅ @types/node (^24.10.1)
- **Mục đích:** TypeScript types cho Node.js
- **Trạng thái:** ✅ Đã có (từ Vite template)

---

## 📋 TỔNG HỢP

### **Dependencies (5 đã cài + 7 sẽ cài):**
1. ✅ react
2. ✅ react-dom
3. ✅ react-router-dom
4. ✅ @tanstack/react-query
5. ✅ axios
6. ⏳ react-hook-form (TUẦN 2)
7. ⏳ yup (TUẦN 2)
8. ⏳ date-fns (TUẦN 3)
9. ⏳ recharts (TUẦN 4)
10. ⏳ react-hot-toast (TUẦN 2)
11. ⏳ react-datepicker (TUẦN 3)
12. ⏳ react-error-boundary (TUẦN 2)

### **DevDependencies (14 đã cài):**
1. ✅ vite
2. ✅ @vitejs/plugin-react
3. ✅ typescript
4. ✅ tailwindcss
5. ✅ @tailwindcss/vite
6. ✅ prettier
7. ✅ vite-tsconfig-paths
8. ✅ rollup-plugin-visualizer
9. ✅ eslint
10. ✅ postcss
11. ✅ autoprefixer
12. ✅ @types/react
13. ✅ @types/react-dom
14. ✅ @types/node

---

## 🔄 CẬP NHẬT

**Ngày cập nhật:** 2026-01-07

**Ghi chú:** File này sẽ được cập nhật mỗi khi cài thêm dependency mới.

---

## 📚 TÀI LIỆU THAM KHẢO

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [TanStack React Query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [date-fns](https://date-fns.org/)
- [Recharts](https://recharts.org/)

