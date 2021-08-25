const client = require("../index");

client.on("ready", () => {
    client.user.setActivity('bot by KIMMOJI', { type: 'PLAYING' });
    console.log(client.user.tag + ' is ready.');
    client.lineNotify(client.user.tag + ' ถูกเปิดใช้งานเรียบร้อย.')
})
