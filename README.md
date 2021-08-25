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
### วิธีการจัดการพ้อย์
 1. วิธีการเช็คพ้อย `!point`
 2. วิธีการเพิ่มพ้อยท์ `!point add [user] [จำนวน]`
   - ตัวอย่าง : `!point add @KIMMOJI 20`
 3. วิธีการตั้งพ้อยท์ `!point set [user] [จำนวน]`
   - ตัวอย่าง : `!point set @KIMMOJI 25`
 4. วิธีการลบพ้อยท์ `!point remove [user] [จำนวน]`
   - ตัวอย่าง : `!point remove @KIMMOJI 10`

### วิธีการเติมเงิน 
 1. พิมพ์คำสั่ง `!topup [ซองอังเปา]`
   - ตัวอย่าง : `!topup https://gift.truemoney.com/campaign/?v=iQTdjiaYmdCvemSIcg`

### วิธีการซื้อสินค้า
 1. พิมพ์คำสั่ง  `!buy`
 2. เลือกสินค้าที่ต้องการ
 3. เมื่อกดสั่งซื้อแล้วบอทจะส่งรหัสไปในแชทส่วนตัว
