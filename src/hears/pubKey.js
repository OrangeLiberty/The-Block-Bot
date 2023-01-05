const axios = require("axios");

module.exports = (bot) => {
    //Return a list of a node's channels given its :pubKey
    bot.hears(/^[A-Fa-f0-9]{66}$/gm, async(ctx) => {
        try {
            let pubKey = ctx.match[0];
            //API
            let res = await axios.get(
                `https://mempool.space/api/v1/lightning/nodes/${pubKey}`
            );
            let data = res.data;
            let location = ``;
            if (data.city === null) {
                if (data.country !== null) {
                    location = data.country.en;
                } else {
                    location = `Unknown`;
                }
            } else {
                location = data.city.en + `, ` + data.country.en;
            }
            let message = `\n✍️ Alias: ${data.alias}\n\n🔑 Public Key: ${
        data.public_key
      }\n\n💰 Active Capacity: ${data.capacity} sat\n\n😎 Active Channels: ${
        data.active_channel_count
      }\n\n📐 Average Channel Size: ${Math.round(
        data.capacity / data.active_channel_count
      )} sat\n\n🌐 Location: ${location}\n\n📅 First Seen:\n ${new Date(
        data.first_seen * 1000
      )}\n🕦 Last Update:\n ${new Date(data.updated_at * 1000)}\n`;
            await bot.telegram.sendMessage(ctx.chat.id, "Node Details:\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "🔙 Back to Lightning Network Overview",
                            callback_data: "lightning",
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