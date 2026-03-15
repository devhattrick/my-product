import type { CatalogSnapshot } from "@/types/catalog";

export function createDefaultCatalog(lineUrl: string): CatalogSnapshot {
  const categories = [
    {
      id: "workspace",
      name: "Workspace",
      slug: "workspace",
      description: "อุปกรณ์สำหรับโต๊ะทำงานที่ดูเรียบ สว่าง และพร้อมโฟกัส",
    },
    {
      id: "audio",
      name: "Audio",
      slug: "audio",
      description: "เสียงคมชัดสำหรับประชุม ฟังเพลง และโหมดการทำงานลึก",
    },
    {
      id: "mobile",
      name: "Mobile",
      slug: "mobile",
      description: "อุปกรณ์เสริมมือถือที่บาง เบา และพร้อมพกทุกวัน",
    },
    {
      id: "travel",
      name: "Travel",
      slug: "travel",
      description: "อุปกรณ์พกพาสำหรับการเดินทางที่คุมโทนและหยิบใช้เร็ว",
    },
    {
      id: "living",
      name: "Living",
      slug: "living",
      description: "ชิ้นงานในบ้านหรือสตูดิโอที่ให้แสงนุ่มและบรรยากาศนิ่งขึ้น",
    },
  ];

  return {
    shop: {
      brandName: "Lume Product Studio",
      heroTitle: "คอลเลกชันสินค้าพรีเมียมสำหรับโต๊ะทำงานและไลฟ์สไตล์",
      heroDescription:
        "ออกแบบหน้า storefront ให้ใช้งานจริงได้ทันทีสำหรับโชว์สินค้า, ค้นหาและกรองได้ไว, และมี admin panel สำหรับจัดการข้อมูลแบบไม่ต้องมี backend ตอนเริ่มต้น",
      lineUrl,
    },
    categories,
    products: [
      {
        id: "halo-display-27",
        sku: "HALO-27",
        name: "Halo Display 27",
        categoryId: "workspace",
        price: 39900,
        summary: "จอทำงาน 27 นิ้วสไตล์มินิมอลสำหรับ workspace ที่ต้องการภาพคมและโต๊ะที่ยังดูเบา",
        description:
          "พาเนลความละเอียดสูงในกรอบอะลูมิเนียมบางเฉียบ มาพร้อมฐานปรับระดับและพอร์ต USB-C hub เพื่อให้โต๊ะทำงานดูสะอาดตาแต่ยังพร้อมต่อทุก workflow",
        imageUrl: "/products/halo-display.svg",
        highlights: [
          "จอ 27 นิ้วคมชัดระดับ 5K-inspired",
          "USB-C hub และสายซ่อนในฐาน",
          "โทนสีสบายตาสำหรับงานครีเอทีฟและ productivity",
        ],
        featured: true,
        createdAt: "2026-03-15T16:00:00.000Z",
        updatedAt: "2026-03-15T16:00:00.000Z",
      },
      {
        id: "studio-dock-pro",
        sku: "DOCK-PRO",
        name: "Studio Dock Pro",
        categoryId: "workspace",
        price: 12900,
        summary: "แท่นวางและ docking hub แบบ all-in-one สำหรับโต๊ะทำงานสายคลีน",
        description:
          "รวม charging pad, hub และแท่นวางไว้ในชิ้นเดียว ช่วยให้โต๊ะทำงานมีจุดเก็บอุปกรณ์ที่ชัดเจนและเสียบน้อยชิ้นที่สุด",
        imageUrl: "/products/studio-dock.svg",
        highlights: [
          "ชาร์จเร็วหลายอุปกรณ์พร้อมกัน",
          "โครงสร้างอะลูมิเนียม unibody",
          "รองรับโน้ตบุ๊ก แท็บเล็ต และมือถือ",
        ],
        featured: true,
        createdAt: "2026-03-15T16:00:00.000Z",
        updatedAt: "2026-03-15T16:00:00.000Z",
      },
      {
        id: "pulse-buds",
        sku: "PULSE-BUDS",
        name: "Pulse Buds",
        categoryId: "audio",
        price: 6900,
        summary: "หูฟังไร้สายที่เน้นเสียงใส คอลประชุมชัด และกล่องขนาดกะทัดรัด",
        description:
          "ออกแบบสำหรับคนสลับระหว่างเพลงและประชุมทั้งวัน มีไมค์ตัดเสียงรบกวนและโหมด transparency สำหรับการใช้งานในออฟฟิศหรือคาเฟ่",
        imageUrl: "/products/pulse-buds.svg",
        highlights: [
          "ไมค์คู่พร้อมตัดเสียงรบกวน",
          "สวมสบายและน้ำหนักเบา",
          "รองรับการฟังต่อเนื่องตลอดวันทำงาน",
        ],
        featured: true,
        createdAt: "2026-03-15T16:00:00.000Z",
        updatedAt: "2026-03-15T16:00:00.000Z",
      },
      {
        id: "orbit-sleeve-14",
        sku: "ORBIT-14",
        name: "Orbit Sleeve 14",
        categoryId: "travel",
        price: 2900,
        summary: "ซองใส่โน้ตบุ๊กและเอกสารแบบบางที่ยังหยิบอุปกรณ์เสริมได้ครบ",
        description:
          "วัสดุสัมผัสนุ่มพร้อมช่องเก็บอะแดปเตอร์ สายชาร์จ และสมุดโน้ต เหมาะกับการพกไปประชุมหรือนั่งทำงานนอกสถานที่โดยไม่ดูเทอะทะ",
        imageUrl: "/products/orbit-sleeve.svg",
        highlights: [
          "ซับในนุ่ม ลดรอยขีดข่วน",
          "ช่องเก็บของแยกเป็นระเบียบ",
          "คุมโทนดีไซน์ได้ทั้งทำงานและเดินทาง",
        ],
        featured: false,
        createdAt: "2026-03-15T16:00:00.000Z",
        updatedAt: "2026-03-15T16:00:00.000Z",
      },
      {
        id: "pocket-charge-max",
        sku: "PCHARGE-MAX",
        name: "Pocket Charge Max",
        categoryId: "mobile",
        price: 3900,
        summary: "แบตสำรองบางพิเศษพร้อมขาตั้งในตัวสำหรับคนใช้งานมือถือทั้งวัน",
        description:
          "ดีไซน์บางระดับพกใส่กระเป๋าเสื้อได้ง่าย รองรับการชาร์จเร็วและมี kickstand สำหรับวางดูคอนเทนต์หรือประชุมออนไลน์ได้ทันที",
        imageUrl: "/products/pocket-charge.svg",
        highlights: [
          "ชาร์จเร็วผ่าน USB-C",
          "kickstand ในตัวสำหรับวางเครื่อง",
          "น้ำหนักเบาและพกง่ายมาก",
        ],
        featured: false,
        createdAt: "2026-03-15T16:00:00.000Z",
        updatedAt: "2026-03-15T16:00:00.000Z",
      },
      {
        id: "canvas-lamp-mini",
        sku: "CANVAS-LAMP",
        name: "Canvas Lamp Mini",
        categoryId: "living",
        price: 4900,
        summary: "โคมไฟแสงนุ่มสำหรับโต๊ะข้างหรือมุมอ่านหนังสือที่ต้องการบรรยากาศนิ่ง",
        description:
          "ให้แสงกระจายสม่ำเสมอและโทน warm neutral ที่ช่วยให้โต๊ะหรือชั้นวางดูสงบขึ้น เหมาะกับมุมทำงานช่วงกลางคืนหรือสตูดิโอเล็ก",
        imageUrl: "/products/canvas-lamp.svg",
        highlights: [
          "แสง warm neutral นุ่มตา",
          "ฐานขนาดเล็กเหมาะกับโต๊ะและชั้นวาง",
          "ควบคุมระดับแสงได้หลายโหมด",
        ],
        featured: false,
        createdAt: "2026-03-15T16:00:00.000Z",
        updatedAt: "2026-03-15T16:00:00.000Z",
      },
    ],
  };
}
