const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { crearDB } = require('megadb');
const stock = new crearDB('stock');
const client = require("../index");

client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
    if (message.channel.type === 'dm') return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const number = client.random(100000, 999999)
    const filter = (m) => m.author.id === message.author.id;

    if (!message.guild.me.permissions.has('MANAGE_MESSSAGE')) {
        return msgEmbed('**[!]** บอทไร้ความสามารถ `Manage Messages`')
    }
    const back = new MessageButton()
        .setCustomId('back')
        .setLabel('◀◀')
        .setStyle('SUCCESS')

    const next = new MessageButton()
        .setCustomId('next')
        .setLabel('▶▶')
        .setStyle('SUCCESS')

    const ok = new MessageButton()
        .setCustomId('ok')
        .setLabel('✔')
        .setStyle('SECONDARY')

    const cancel = new MessageButton()
        .setCustomId('cancel')
        .setLabel('✖')
        .setStyle('DANGER')

        
    const row = new MessageActionRow()
        .addComponents(back)
        .addComponents(ok)
        .addComponents(next)
        .addComponents(cancel)

    const row_cancel = new MessageActionRow()
        .addComponents(cancel)
    
    if (command === 'stock') {

        if (!message.member.permissions.has('ADMINISTRATOR')) return await msgEmbed(
            '**[!]** คุณไม่มีความสามารถ `ADMINISTRATOR` จึงไม่สามารถใช้คำสั่งนี้ได้!'
        )

            switch (args[0]) {
                case "add":
                    var msg = await msgEmbed(
                        '**[+]** `กรุณาระบุรายละเอียดสินต้ามาภายในห้องนี้`\n' +
                        '**EX.** `Lv.Max, หมัด SuperHuman, 3ดาบสุ่ม`' 
                        )

                    message.channel.awaitMessages({ filter,  max: 1, time: 5000, errors: ['time'] })
                    .then(collected => {

                        var content = collected.first().content;
                        collected.first().delete()

                        editEmbed(msg,
                            '**[+]** `กรุณาพิมพ์ (id) (pass) (ราคา) มาในห้องนี้`\n'+
                            '**Ex.** `LnwZa2547 12345za 150`'
                            )

                            message.channel.awaitMessages({ filter,  max: 1, time: 5000, errors: ['time'] })
                            .then(collected => {

                                var info = collected.first().content.trim().split(/ +/);
                                collected.first().delete()

                                if (!info[0] || !info[1] || !info[2] || !Number(info[2])) return editEmbed(msg,
                                    `**[!]** คุณได้กรอกข้อมูลผิดพลาด \`${client.config.prefix}stock add\` เพื่อลองใหม่อีกครั้ง!`
                                )

                                var price = Number(info[2])

                                editEmbed(msg,
                                '**[+]** `เพิ่มสินค้าเรียบร้อย`\n\n' +
                                `**เลขสินค้า :** \`${number}\` \n`+
                                `**ID-Pass :** \`id: ${info[0]} pass: ${info[1]}\` \n`+
                                `**ราคา :** \`${price}\` \n`+
                                `**รายละเอียด :** \`${content}\``
                                )

                                stock.set((number).toString(), {
                                    price : price,
                                    password : `id : ${info[0]} pass : ${info[1]}`,
                                    info : content
                                })

                                client.lineNotify(
                                    '\n[⚠] เพิ่มสินค้า \n' + 
                                    'เลขสินค้า : ' + number + '\n' +
                                    'ราคา : ' + price + '\n' + 
                                    'ID-Pass : ' + info[0] + '\n' +
                                    'รายละเอียด : ' + content
                                )
                            })
                            .catch(() => {
                                msg.delete().catch(() => { })
                           })
                        
                    })
                    .catch(() => {
                        msg.delete().catch(() => { })
                    })

                break;

                case 'remove':
                    if (!args[1] || !Number(args[1])) { 
                        msgEmbed(
                            `**[!]** กรุณาพิมพ์ \`${client.config.prefix}stock romove [เลขสินค้า]\` \n`+
                            `**Ex. ** \`${client.config.prefix}stock romove 999999\``
                        );
                    } else if (!stock.has(args[1])) {
                        msgEmbed(
                            `**[!]** ไม่พบรายการสินค้า \`${args[1]}\``
                        )
                    } else {
                        stock.delete((args[1]).toString())
                        msgEmbed(
                            `**[+]** ลบรายการสินค้า \`${args[1]}\` เรียบร้อย.`
                        )
                        client.lineNotify('[⚠] ลบรายการสินค้า ' + args[1] + ' เรียบร้อย!')
                    }
                break;
            
                default:
                    msgEmbed(`**[!]** กรุณาพิมพ์ \`${client.config.prefix}stock [add, remove]\``);
                 break;
            }
            
    } else if (command === 'point') {
        if (!args.join(" ")) {
            var msg = msgEmbed(
                `**[+]** \`จำนานพ้อยท์ของคุณคือ ${client.format(await client.get(message.author.id))}\``
            )
        }

        if (['add', 'set', 'remove'].includes(args[0])) {
            if (!message.member.permissions.has('ADMINISTRATOR')) return await msgEmbed(
                '**[!]** คุณไม่มีความสามารถ `ADMINISTRATOR` จึงไม่สามารถใช้คำสั่งนี้ได้!'
            )

            if (!args[1] || !Number(args[2])) return await msgEmbed(
                `**[!]** กรุณาพิมพ์ \`${client.config.prefix}point [add, set, remove] [ผู้ใช้] [จำนวน]\``
            )

            var mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
            var target = message.guild.members.cache.get(mentioned.id)

            switch (args[0]) {
                case 'add':
                    msgEmbed(
                        `**[+]** เพิ่มพ้อยให้ \`${target.user.username}\` จำนวน \`${args[2]} พ้อยท์\``
                    )

                    client.add(target.user.id, parseInt(args[2]))
                    client.lineNotify(
                        '\n[⚠] ระบบจัดการพ้อยท์\n' +
                        'ผู้ใช้ : ' + message.author.id + '\n' +
                        'เป้าหมาย : ' + target.user.id + '\n' +
                        'เพิ่มพ้อยท์จำนวน ' + args[2] + ' พ้อยท์'
                    )
                break;
                case 'set':
                    msgEmbed(
                        `**[+]** ตั้งพ้อยท์ให้ \`${target.user.username}\` เป็น \`${args[2]} พ้อยท์\``
                    )

                    client.set(target.user.id, parseInt(args[2]))
                    client.lineNotify(
                        '\n[⚠] ระบบจัดการพ้อยท์\n' +
                        'ผู้ใช้ : ' + message.author.id + '\n' +
                        'เป้าหมาย : ' + target.user.id + '\n' +
                        'ตั้งพ้อยท์เป็น ' + args[2] + ' พ้อยท์'
                    )
                break;
                case 'remove':
                    msgEmbed(
                        `**[+]** ลบพ้อย์ของ \`${target.user.username}\` จำนวน \`${args[2]} พ้อยท์\``
                    )

                    client.remove(target.user.id, parseInt(args[2]))
                    client.lineNotify(
                        '\n[⚠] ระบบจัดการพ้อยท์\n' +
                        'ผู้ใช้ : ' + message.author.id + '\n' +
                        'เป้าหมาย : ' + target.user.id + '\n' +
                        'ลบพ้อยท์จำนวน ' + args[2] + ' พ้อยท์'
                    )
                break;
            }
        }
    } else if (command === 'topup') {
        // code บางส่วนนำมาจาก https://github.com/DearTanakorn/discord-vouchertopup

        if (!client.config.phone) return msgEmbed('**[!]** `ไม่พบเบอร์รับซองอังเปา!`');

        if (!args[0]) return msgEmbed(
            `**[${message.author.tag}]** กรุณาพิมพ์ \`${client.config.prefix}topup [ลิงค์ซองอังเปา]\`\n` + 
            `**Ex. ** \`https://gift.truemoney.com/campaign/?v=iQTdjiaYmdCvemSIcg\``
        );

        if (!args[0].startsWith('https://gift.truemoney.com/campaign/?v=')) return msgEmbed(
            `**[${message.author.tag}]** \`ลิงค์ซองอังเปาที่ใส่มาไม่ถูกต้อง!\``
        )

        var msg = await msgEmbed('**[+]** `กำลังตรวจสอบ โปรดรอซักครู่...`');

        var code = args[0].split('v=')[1];

        if (code.match(/[0-9A-Za-z]+/)[0].length !== 18) editEmbed(msg ,
            `**[${message.author.tag}]** \`ลิงค์ซองอังเปาที่ใส่มาไม่ถูกต้อง!\``
            );
        try {
            var redeem = await client.redeem(code);

            editEmbed(msg,
                `**[+]** \`เติมเงินเข้าสู่ระบบสำเร็จ ${redeem.data.voucher.amount_baht} บาท\``
            );

            client.lineNotify(
                '\n[⚠] ระบบเติมเงิน \n'+
                'ผู้ใช้ : ' + message.author.id + ' \n' +
                'เติมเงิน : ' + redeem.data.voucher.amount_baht + ' บาท'
            )

            client.add(message.author.id, parseInt(redeem.data.voucher.amount_baht))

        } catch(e) {
            if (e.status === 400 || e.status === 404) return editEmbed(msg,
                `**[${message.author.tag}]** \`ซองอังเปาไม่ถูกต้อง หรือถูกใช้ไปแล้ว!\``
                )

            editEmbed(msg,
                `**[${message.author.tag}]** \`เกิดปัญหาบางอย่างโปรดติดต่อผู้พัฒนา!\``
                )
        }

    } else if (command === 'buy') {
        if (stock.size() === 0) return msgEmbed(
            '**[!]** `ไม่มีรายการสินค้าในสต๊อก!`'
        )

        stock.sort(false, "price").then(async array => {

            var page = 0;
                    

            const eb = new MessageEmbed()
                .setColor(client.config.color)
                .setAuthor(
                    message.guild.name,
                    message.guild.iconURL({ dynamic: true })
                )
                .addFields(
                    {
                        name : 'เลขสินค้า',
                        value : `\`${array[0].clave}\``,
                        inline : false
                    }, {
                        name : 'ราคา',
                        value :  `\`${client.format(array[0].valor.price)}\` บาท`
                    }, {
                        name : 'รายละเอีด',
                        value :  `\`\`\`\n${array[0].valor.info}\n\`\`\``
                    }
                )
                .setTimestamp()
                .setFooter('Code by KIMMOJI.')

            var msg = await message.channel.send({ embeds: [eb], components: [row] })

            const filter = (m) => m.user.id === message.author.id;

            const collector = message.channel.createMessageComponentCollector({ filter, time: 5000 });

            collector.on('collect', async i => {
                if(i.customId == "back"){
                    if(page - 1 < 0){
                        page = array.length - 1
                    } else{
                        page -= 1;
                    }
                } else if(i.customId == "next"){
                    if(page + 1 == array.length){
                        page = 0;
                    } else{
                        page += 1;
                    }
                }

                if(i.customId == "next" || i.customId == "back"){
                    pageEmbed(msg, array[page].clave, client.format(array[page].valor.price), array[page].valor.info,row)
                    i.deferUpdate().catch(() => { });
                } else if (i.customId == "ok") {

                    i.deferUpdate().catch(() => { });

                    if (!stock.has(array[page].clave)) {
                        return i.followUp({
                            content: `**[!]** \`ไม่พบรายการสินค้านี้ในระบบ!\``, 
                            ephemeral: true
                        })
                    }

                    if (await client.get(i.user.id) < array[page].valor.price) {
                        return i.followUp({
                            content: `**[!]** \`ยอดเงินของคุณไม่เพียงพอกรุณาเติมเงินอีก ${await failMoney(array[page].valor.price)} บาท เพื่อทำนรายการ!\``, 
                            ephemeral: true
                        })
                    }

                    editEmbed(msg,
                        '**[+]** `ซื้อสินค้าสำเร็จ! เช็ครายระเอียดสินค้าได้ที่แชทส่วนตัว`',
                        [row_cancel]
                    ).then((m) => setTimeout(() => m.delete().catch(() => { }), 3000))

                    i.user.send({
                        embeds:[
                            new MessageEmbed()
                                .setColor(client.config.color)
                                .setAuthor(
                                    message.guild.name,
                                    message.guild.iconURL({ dynamic: true })
                                )
                                .addFields(
                                    {
                                        name : 'เลขสินค้า',
                                        value : `\`${array[page].clave}\``,
                                        inline : false
                                    }, {
                                        name : 'ราคา',
                                        value :  `\`${client.format(array[page].valor.price)}\` บาท`
                                    },{
                                        name : 'id-pass',
                                        value :  `\`\`\`\n${array[page].valor.password}\n\`\`\``
                                    }, {
                                        name : 'รายละเอีด',
                                        value :  `\`\`\`\n${array[page].valor.info}\n\`\`\``
                                    }
                                )
                        ]
                    })

                    client.lineNotify(
                        '\n[⚠] การซื้อสินค้า!\n' +
                        'ผู้ใช้ : ' + i.user.id + '\n' +
                        'เลขสินค้า : ' + array[page].clave + '\n' +
                        'ราคา : ' + client.format(array[page].valor.price) + '\n' +
                        'รายละเอีด : \n' + array[page].valor.info
                    )

                    client.remove(i.user.id, array[page].valor.price)    
                    stock.delete(array[page].clave)
                } else if (i.customId == "cancel") {
                    i.message.delete()
                }
            });

            collector.on('end', (i) => {
                msg.delete().catch(() => {  })
            })
            
        }); 
    }

    async function failMoney(amount) {
        return Number(amount - await client.get(message.author.id));
    }

    function pageEmbed(msg, num, price, info, row) {
        var eb = new MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(
                message.guild.name,
                message.guild.iconURL({ dynamic: true })
            )
            .addFields(
                {
                    name : 'เลขสินค้า',
                    value : `\`${num}\``,
                    inline : false
                }, {
                    name : 'ราคา',
                    value :  `\`${client.format(price)}\` บาท`
                }, {
                    name : 'รายละเอีด',
                    value :  `\`\`\`\n${info}\n\`\`\``
                }
            )
            .setTimestamp()
            .setFooter('Code by KIMMOJI.')

        msg.edit({ embeds: [eb], components: [row] })
    }

    function msgEmbed(content) {
        var embed = new MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(
                message.guild.name,
                message.guild.iconURL({ dynamic: true })
            )
            .setDescription(content)
            .setTimestamp()
            .setFooter('Code by KIMMOJI.')

        var m = message.channel.send({ embeds : [embed] })
        return m;
        
    };

    function editEmbed(msg ,content, row) {
        var m = new MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(
                message.guild.name,
                message.guild.iconURL({ dynamic: true })
            )
            .setDescription(content)
            .setTimestamp()
            .setFooter('Code by KIMMOJI.')

            if (row) {
                return msg.edit({ embeds: [m], components: row });
            } else {
                return msg.edit({ embeds: [m] });
            }
    };
});
