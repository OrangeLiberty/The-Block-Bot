const axios = require("axios");

module.exports = (bot) => {
    //Return infos about a Lightning Channel with the given :channelID
    bot.hears(/^[0-9]{18}$/gm, async(ctx) => {
        try {
            let channelId = ctx.match[0];
            let res = await axios.get(
                `https://mempool.space/api/v1/lightning/channels/${channelId}`
            );
            let data = res.data;
            let message = `\n🆔 Channel ID: ${data.id}\n🕦 Created: ${
        data.created
      }\n📅 Closing date: ${data.closing_date}\n💰 Channel Capacity: ${
        data.capacity
      } sat\n\n👤 Channel Partner 1:\n✍️ Name: ${
        data.node_left.alias
      }\n🔑 Public Key: ${data.node_left.public_key}\n😎 Channels: ${
        data.node_left.channels
      }\n⚡️ Capacity: ${data.node_left.capacity} sat\n💸 Fee Rate: ${
        data.node_left.fee_rate
      } ppm\n💵 Base Fee: ${
        data.node_left.base_fee_mtokens
      } ppm\n📃 Min HTLC: ${
        data.node_left.min_htlc_mtokens
      } sat\n📝 Max HTLC: ${
        data.node_left.max_htlc_mtokens / 1000
      } sat\n👉 Timelock Delta: ${
        data.node_left.cltv_delta
      } Blocks\n\n👤 Channel Partner 2:\n✍️ Name: ${
        data.node_right.alias
      }\n🔑 Public Key: ${data.node_right.public_key}\n😎 Channels: ${
        data.node_right.channels
      }\n⚡️ Capacity: ${data.node_right.capacity} sat\n💸 Fee Rate: ${
        data.node_right.fee_rate
      } ppm\n💵 Base Fee: ${
        data.node_right.base_fee_mtokens
      } ppm\n📃 Min HTLC: ${
        data.node_right.min_htlc_mtokens
      } sat\n📝 Max HTLC: ${
        data.node_right.max_htlc_mtokens / 1000
      } sat\n👉 Timelock Delta: ${data.node_right.cltv_delta} Blocks\n`;

            await bot.telegram.sendMessage(
                ctx.chat.id,
                "Lightning Channel Info:\n" + message, {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: "🔙 Back to Lightning Network Overview",
                                callback_data: "lightning",
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