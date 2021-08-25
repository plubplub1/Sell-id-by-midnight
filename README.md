# บอทขายไก่ตันอัตโนมติ
- หากพบช่องโหว่โปรดติดต่อที่

  **Discord :** KIMMOJI#7986

  **Facebook :** Suriya Madeekan

# วิธีการติดตั้ง
 1. ติดตั้ง Node.js เวอร์ชั้น 16.x ขึ้นไป

 2. ติดตั้ง packages ต่างๆ

```sh 
npm i discord.js@13.1.0 axios glob megadb  
```

3. ตั้งค่าต่างๆที่ไฟล์ `config.json`

![config](https://cdn.discordapp.com/attachments/817365316950294569/879950485686190110/20210825_114755.png) 

- หากไม่ต้องการเปิดใช้งาน Line Notify ปรับ `"lineNotify" : false`

# วิธีการใช้งาน
 ## วิธีการเปิดใช้งานบอท
  1. รันคำสั่งตามข้างล่างนี้
```sh
node index.js
```
### วิธีการเพิ่มสินค้า
  1. พิมพ์คำสั่ง `!stock add`
  2. ทำตามที่บอทบอกมา

### วิธีการลบสินค้า
  1. พิมพ์คำสั่ง `!stock remove [ไอดีสินค้า]`
   - ตัวอย่าง : `!stock remove 9999`

