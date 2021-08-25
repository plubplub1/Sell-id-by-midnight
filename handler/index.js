const { crearDB } = require('megadb');
const point = new crearDB('point');
const axios = require('axios');
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = async (client) => {

    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    client.random = (min = 0, max = 0) => {
        let num = Math.random() * (max - min) + min;
  
        return Math.floor(num);
    };

    client.format = (number) => {
        var formatter = new Intl.NumberFormat('en-US', {
            currency: 'USD',
        });

        return formatter.format(number);
    }

    client.get = async (id) => {
        if (!point.has(id)) { point.set(id, 0)};

        return await point.get(id);
    };

    client.add = async (id, amount) => {
        if (!point.has(id)) { point.set(id, 0)};

        point.add(id, amount);
    };

    client.remove = async (id, amount) => {
        if (!point.has(id)) { point.set(id, 0)};

        point.subtract(id, amount);
    };

    client.set = async (id, amount) => {
        if (!point.has(id)) { point.set(id, 0)};

        point.set(id, amount);
    };

    client.lineNotify = (msg) => {
        if (!client.config.lineNotify) return;

        axios({
            method: 'post',
            url: 'https://notify-api.line.me/api/notify',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Access-Control-Allow-Origi': '*',
              'Authorization': 'Bearer '+ client.config.linetoken,
            },
            data: 'message=' + msg
        })
    }

    client.redeem = async (code) => {
        try {
        var res = await axios({
            method: 'post',
            url: 'https://gift.truemoney.com/campaign/vouchers/' + code + '/redeem',
            data : {
                mobile: client.config.phone,
                voucher_hash: code
            }
        })

        return res.data


        } catch (err) {
            throw err.response;
        }
    }
}