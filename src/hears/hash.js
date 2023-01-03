const axios = require("axios");

module.exports = (bot) => {
    //Takes an hash value and returns block information
    bot.hears(/^[0]{6}[A-Fa-f0-9]{58}$/gm, async(ctx) => {
        try {
            //API
            let hash = ctx.match[0];
            let res = await axios.get(`https://mempool.space/api/block/${hash}`);
            let data = res.data;
            let weight = Math.round(data.weight / 10000) / 100;
            let size = Math.round(data.size / 10000) / 100;
            let timeStamp = data.timestamp * 1000;
            let time = new Date(timeStamp);
            let message = `🧮Hash: ${data.id}\n\n⏳ Blocktime: ${data.height}\n\n📅 Timestamp: ${time}\n\n🔄 Included Transactions: ${data.tx_count}\n\n📐 Size: ${size} MB\n\n⚖️ Weight: ${weight} MWU`;

            await bot.telegram.sendMessage(ctx.chat.id, message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "🔙 Back to Block Informations",
                            callback_data: "blocks",
                        }, ],
                    ],
                },
            });
        } catch (error) {
            console.log(error);
            await ctx.reply("Something went wrong 🚧");
        }
    });
};