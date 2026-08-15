# CLUBROD — Recovery Notes & Code Reconstruction Details

เอกสารนี้ระบุรายละเอียดการแปลง Production Bundle Recovery ของ CLUBROD มาเป็น Editable Source Code ในรูปแบบ React + Vite

---

## 1. การจำแนกไฟล์ Production Build เดิม vs Source Code ที่แยกใหม่

### 🛡️ ไฟล์จาก Production Build เดิม (เก็บเป็น Backup ห้ามลบ)
- `assets/page-BkeqTED8.js`: Compiled Client JavaScript Bundle หลัก
- `assets/framework-CXnKph_e.js`: React 18 Framework Bundle
- `assets/index-pCGOCx8i.js`: Entry Client Bootstrapper
- `assets/index-lYfuH_xj.css`: Compiled Stylesheet จาก Production Build
- `assets/layout-segment-context-B3HHlNyH.js`: RSC Segment Context
- `assets/rolldown-runtime-S-ySWqyJ.js`: Bundle Runtime
- `assets/_vinext_fonts/`: Woff2 Web fonts (Geist & Geist Mono)
- `index.production-backup.html`: HTML Delivered by Server (SSR/RSC)

### 🌟 ไฟล์ Source Code ที่สร้างขึ้นใหม่ (Editable Source)
- `src/App.jsx`: Component หลัก จัดการ View Routing, Auth State, และ Toast
- `src/main.jsx`: Entry point สำหรับ Vite React
- `src/services/storage.js`: Service สำหรับจัดการ LocalStorage แยกเป็นระเบียบ
- `src/services/api.js`: Abstraction Service สำหรับ `/api/inspection-reports` และ `/api/chats`
- `src/utils/formatters.js`: ฟังก์ชันช่วยเหลือ (จัดรูปแบบเงิน, เบอร์โทร, กรองข้อมูลรถเด่น)
- `src/data/initialData.js`: รวบรวมข้อมูลจำลองตั้งต้น (Cars, Agents, Advertisers, Leads)
- `src/components/common/*`: Logo, IconBox, StatCard, ToggleSwitch, MultiImageUpload, InspectionPdfUpload, StorefrontImageUpload, SupabaseGuide, ChatWidget
- `src/components/auth/*`: LoginForm, AgentRegisterForm, AdvertiserRegisterForm, AuthLayoutCard
- `src/components/car/*`: CarCard, CarDetailModal, AgentCarList, AdvertiserInventory, AdminCarManager, AdminPayoutManager
- `src/components/dashboard/*`: LeadTable, PanelLayout
- `src/layouts/*`: Header, Footer, AppShell
- `src/pages/*`: Home, AgentDashboard, AdvertiserDashboard, AdminDashboard

---

## 2. สถานะความแน่นอนของ Components

### 🟢 ระบุได้แน่นอน 100% (Identified from Minified Source & Pre-rendered DOM)
1. **Logo (`v`)**: มีโครงสร้าง `logo-lockup`, `logo-mark`, `logo-word` ตรงตาม DOM เดิม
2. **PublicMarketplace / Home (`w`)**: มี Hero section, Search Panel 2 ระดับ, Featured Car, Trust Badges, Car Grid, Buying Steps, Footer
3. **CarCard**: การ์ดแสดงผลรถยนต์ พร้อมปุ่มหัวใจ, ป้ายปี, เกียร์, ไมล์, ตารางผ่อน, ราคาเสนอขาย
4. **CarDetailModal (`G`)**: หน้าต่างรายละเอียดรถยนต์ พร้อมรูปภาพ, สเปก, ลิงก์ PDF ตรวจสภาพ, ฟอร์มส่งข้อมูล Lead, Live Chat
5. **AgentDashboard (`A`)**: ภาพรวม, รายการรถรับลิงก์แนะนำ (`ref`), รายชื่อลูกค้า, รายได้, โปรไฟล์
6. **AdvertiserDashboard (`L`)**: สต็อกรถของเต็นท์, ฟอร์มเพิ่ม/แก้ไขประกาศ, อัปโหลดรูปภาพหลายรูป, อัปโหลดหน้าร้าน
7. **AdminDashboard (`z`)**: การตั้งค่าแสดงผลรถ, ปุ่ม CLUBROD CHOICE, การอนุมัตินายหน้า/เต็นท์รถ, การอนุมัติจ่ายเงิน
8. **ChatWidget (`U`)**: หน้าส่งข้อความโต้ตอบ `/api/chats`
9. **InspectionPdfUpload (`x`)**: อัปโหลด PDF รายงานตรวจสภาพ `/api/inspection-reports`

---

## 3. ฟังก์ชันและระบบที่ต้องตรวจสอบในขั้นถัดไป (Features to Verify)

1. **Backend Integration**:
   - ปัจจุบัน API `/api/inspection-reports` และ `/api/chats` ถูกสร้างเป็น Service Abstraction ใน `src/services/api.js` แล้ว แต่ระบบ Backend จริงสำหรับบันทึกไฟล์ยังต้องเชื่อมต่อกับ Node.js / Next.js API Routes หรือ Supabase Storage ในอนาคต
2. **Supabase Database Migration**:
   - ปัจจุบันใช้ `src/services/storage.js` กับ `localStorage` (`cc-cars`, `cc-agents`, `cc-advertisers`, `cc-leads`) ตามโจทย์ เมื่อพร้อมเชื่อม Supabase สามารถสลับตัวเรียกใน `src/services/storage.js` ได้ทันที
