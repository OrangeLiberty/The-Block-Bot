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
            let message = `\nš Channel ID: ${data.id}\nš¦ Created: ${
        data.created
      }\nš Closing date: ${data.closing_date}\nš° Channel Capacity: ${
        data.capacity
      } sat\n\nš¤ Channel Partner 1:\nāļø Name: ${
        data.node_left.alias
      }\nš Public Key: ${data.node_left.public_key}\nš Channels: ${
        data.node_left.channels
      }\nā”ļø Capacity: ${data.node_left.capacity} sat\nšø Fee Rate: ${
        data.node_left.fee_rate
      } ppm\nšµ Base Fee: ${
        data.node_left.base_fee_mtokens
      } ppm\nš Min HTLC: ${
        data.node_left.min_htlc_mtokens
      } sat\nš Max HTLC: ${
        data.node_left.max_htlc_mtokens / 1000
      } sat\nš Timelock Delta: ${
        data.node_left.cltv_delta
      } Blocks\n\nš¤ Channel Partner 2:\nāļø Name: ${
        data.node_right.alias
      }\nš Public Key: ${data.node_right.public_key}\nš Channels: ${
        data.node_right.channels
      }\nā”ļø Capacity: ${data.node_right.capacity} sat\nšø Fee Rate: ${
        data.node_right.fee_rate
      } ppm\nšµ Base Fee: ${
        data.node_right.base_fee_mtokens
      } ppm\nš Min HTLC: ${
        data.node_right.min_htlc_mtokens
      } sat\nš Max HTLC: ${
        data.node_right.max_htlc_mtokens / 1000
      } sat\nš Timelock Delta: ${data.node_right.cltv_delta} Blocks\n`;

            await bot.telegram.sendMessage(
                ctx.chat.id,
                "Lightning Channel Info:\n" + message, {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: "š Back to Lightning Network Overview",
                                callback_data: "lightning",
                            }, ],
                        ],
                    },
                }
            );
        } catch (error) {
            console.log(error);
            await ctx.reply("Something went wrong š§");
        }
    });
};