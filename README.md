# My Product

เว็บโชว์สินค้าแบบ frontend-only ที่ใช้ `React + TypeScript + Tailwind CSS + shadcn-style components` พร้อม 2 โหมดในแอปเดียว:

- `หน้าร้าน` สำหรับผู้ใช้ทั่วไป ไม่ต้อง login
- `Admin` สำหรับเพิ่ม / แก้ไข / ลบสินค้า และจัดการหมวดหมู่ผ่าน product form

ดีไซน์เน้น light premium ใกล้แนว `apple.com` และวางโครง service layer ให้เปลี่ยนจาก mock/localStorage ไปเป็น backend API และ database จริงได้ภายหลัง

## Features

- Product cards พร้อมรูป, ราคา, รายละเอียด, highlights และปุ่มไป Line
- Filter ตามหมวดหมู่ + ค้นหาสินค้าแบบ real-time
- Admin dialog สำหรับ create / update / delete สินค้า
- เก็บข้อมูลชั่วคราวใน `localStorage`
- Repository abstraction รองรับทั้ง mock storage และ future API implementation
- ใช้ `HashRouter` เพื่อ deploy static hosting ได้ง่ายขึ้น

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Radix UI primitives
- shadcn-style UI components

## Run

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

## GitHub Pages

โปรเจกต์นี้ควร deploy ผ่าน `GitHub Actions` ไม่ใช่ `Deploy from a branch` ตรง ๆ เพราะ Vite ต้อง build ไฟล์ใน `dist/` ก่อน

ค่าที่ควรตั้งใน GitHub Pages:

- `Source: GitHub Actions`
- workflow ที่ใช้คือ [deploy-pages.yml](/Users/hattrick/Project/my-product/.github/workflows/deploy-pages.yml)

workflow นี้จะ build และ deploy อัตโนมัติเมื่อมีการ push ไปที่ branch `develop`

## Environment

คัดลอกจาก `.env.example` แล้วกำหนดค่าตามต้องการ:

```bash
cp .env.example .env
```

ตัวแปรที่รองรับ:

- `VITE_USE_MOCKS=true` ใช้ localStorage repository
- `VITE_API_BASE_URL=http://localhost:8080/api` เตรียมไว้สำหรับ backend จริง
- `VITE_LINE_OA_URL=https://line.me/R/ti/p/@yourlineid` ลิงก์ Line Official Account หรือ Line chat

ถ้ายังไม่ตั้ง `VITE_LINE_OA_URL` ระบบจะ fallback ไปเปิด LINE share link พร้อมข้อความสินค้าที่ผู้ใช้กดสนใจ

## Project Structure

```text
src/
  components/
    admin/
    catalog/
    ui/
  context/
  data/
  lib/
  pages/
  services/
  types/
```

## Backend-ready Notes

จุดที่เตรียมไว้สำหรับเชื่อม backend จริง:

- `src/services/catalog-repository.ts` เป็น interface กลาง
- `src/services/local-catalog-repository.ts` ใช้ mock/localStorage
- `src/services/api-catalog-repository.ts` เป็นตัวอย่าง endpoint contract ที่ฝั่ง backend ควรรองรับ
- `src/services/create-catalog-repository.ts` ใช้ env ตัดสินใจว่าจะรัน mock หรือ api mode
