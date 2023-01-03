const axios = require("axios");

module.exports = (bot) => {
    //Takes an TXID and returns TX details
    bot.hears(/^[A-Za-z0-9]{64}$/gm, async(ctx) => {
        try {
            let txMessage = ctx.match[0];
            //API
            let res = await axios.get(`https://mempool.space/api/tx/${txMessage}`);
            let data = res.data;
            let timeStamp = data.status.block_time * 1000;
            let time = new Date(timeStamp);

            let message = `🔎Transaction: ${data.txid}\n\n🕦Timestamp: ${time}\n\n⏳Blocktime: ${data.status.block_height}\n\n📐Size: ${data.size} B\n\n⚖️Weight: ${data.weight} kWU\n\n💸Fee: ${data.fee} sat\n\n✅Confirmed: ${data.status.confirmed}\n\n`;
            let txInput = ``;
            let txOutput = ``;
            let i = 1;
            for (const item of data.vin) {
                txInput += `${item.prevout.scriptpubkey_address}\n${
          item.prevout.value / 100000000
        } BTC\n`;
                i++;
            }

            for (const item of data.vout) {
                txOutput += `${item.scriptpubkey_address}\n${
          item.value / 100000000
        } BTC\n`;
                i++;
            }

            await bot.telegram.sendMessage(
                ctx.chat.id,
                message + "⤴️Input:\n" + txInput + "\n⤵️Output:\n" + txOutput, {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: "🔙 Back to Total Overview",
                                callback_data: "explorer",
                            }, ],
                        ],
                    },
                }
            );
        } catch (error) {
            console.log(error);
            await ctx.reply("Something went wrong 🚧");
        }
    });
};