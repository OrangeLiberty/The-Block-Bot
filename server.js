console.log("The Bot is running");
require("dotenv").config();
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const express = require("express");
const axios = require("axios");
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
const lightning = require("./src/topics/lightning");
const mempool = require("./src/topics/mempool");
const mining = require("./src/topics/mining");
const difficulty = require("./src/topics/difficulty");
const template = require("./src/topics/template");
const blocks = require("./src/topics/blocks");
const fee = require("./src/topics/fee");

//Handle start command
const startCommand = require("./src/commands/start");
startCommand(bot);

//Handle tip command
const tipCommand = require("./src/commands/tip");
tipCommand(bot);

//Handle tip action command
const tip = require("./src/actions/tip");
tip(bot);

//Handle the help command
const help = require("./src/commands/help");
help(bot);

//Blocktime hear command
const blocktime = require("./src/hears/blocktime");
blocktime(bot);

//Hashvalue hear command
const hash = require("./src/hears/hash");
hash(bot);

//Transaction hear command
const transaction = require("./src/hears/transactionId");
transaction(bot);

//Adress hear Command
const adress = require("./src/hears/adress");
adress(bot);

//Lightning pubKey hear command
const pubKey = require("./src/hears/pubKey");
pubKey(bot);

//Lightning Channel ID hear command
const channelId = require("./src/hears/channelId");
channelId(bot);

//Explorer Command with StartTemplate
bot.command("explorer", async(ctx) => {
    await template.sendStartTemplate(ctx, bot);
});

//Handle the done callback
bot.action("done", async(ctx) => {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

// //Explorer Handler with StartTemplate
bot.action("explorer", async(ctx) => {
    await template.sendStartTemplate(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the mempool callback from total overview
bot.action("mempool", async(ctx) => {
    await template.sendMemTemplate(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the backlog callback from mempool overview
bot.action("backlog", async(ctx) => {
    await mempool.sendBacklog(ctx, bot);
    await ctx.deleteMessage();
});

//Handle the projectedBlocks callback from mempool overview
bot.action("projectedBlocks", async(ctx) => {
    await mempool.sendProjectedBlocks(ctx, bot);
    await ctx.deleteMessage();
});

//Handle the difficultyAdjustment callback total overview
bot.action("difficultyAdjustment", async(ctx) => {
    await difficulty.showDifficulty(ctx, bot);
    await ctx.deleteMessage();
});

//Handle the blocks callback from total overview
bot.action("blocks", async(ctx) => {
    await template.sendBlockTemplate(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the blockHeight callback from block overview
bot.action("blockHeight", async(ctx) => {
    await blocks.showBlocktime(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle latest Blocks callback from block overview
bot.action("latestBlocks", async(ctx) => {
    await blocks.showLatestBlocks(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle the getBlockInfo callback from block overview
bot.action("getBlockInfo", async(ctx) => {
    await bot.telegram.sendMessage(
        ctx.chat.id,
        "Please enter a 64 digit hash value...👇", {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "✅ Done",
                        callback_data: "done",
                    }, ],
                ],
            },
        }
    );
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the blockHash callback from block overview
bot.action("blockHash", async(ctx) => {
    await bot.telegram.sendMessage(ctx.chat.id, "Please enter a Blocktime...👇", {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "✅ Done",
                    callback_data: "done",
                }, ],
            ],
        },
    });
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the recFee callback from total overview
bot.action("recFee", async(ctx) => {
    await fee.showFee(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle the adresses callback from total overview
bot.action("adresses", async(ctx) => {
    await bot.telegram.sendMessage(
        ctx.chat.id,
        "Please enter a valid Bitcoin Adress...👇", {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "✅ Done",
                        callback_data: "done",
                    }, ],
                ],
            },
        }
    );
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the transaction callback from total overview
bot.action("transaction", async(ctx) => {
    await bot.telegram.sendMessage(
        ctx.chat.id,
        "Please enter a 64 digit Transaction ID...👇", {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "✅ Done",
                        callback_data: "done",
                    }, ],
                ],
            },
        }
    );
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the mining callback from total overview
bot.action("mining", async(ctx) => {
    await template.sendMiningTemplate(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the hashrate callback from mining overview
bot.action("hashrate", async(ctx) => {
    await mining.showHashrate(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the Reward Stats callback from Mining Overview
bot.action("rewardStats", async(ctx) => {
    await mining.showRewardStats(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the Pool Hashrate callback from Mining Overview
bot.action("poolHashrate", async(ctx) => {
    await mining.showPoolHashrate(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the Pool BlocksFound  callback from Mining Overview
bot.action("poolBlocks", async(ctx) => {
    await mining.showPoolBlocks(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle the poolDetail callback from Mining Overview
bot.action("poolDetail", async(ctx) => {
    await template.sendPoolTemplate(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

bot.action(
    [
        "slushpool",
        "antpool",
        "f2pool",
        "binancepool",
        "viabtc",
        "btccom",
        "poolin",
        "luxor",
        "marapool",
        "sbicrypto",
        "ultimuspool",
        "foundryusa",
    ],
    async(ctx) => {
        await mining.showPool(ctx, bot);
        await ctx.deleteMessage();
    }
);

//Handle the Lightning callback from Total Overview
bot.action("lightning", async(ctx) => {
    await template.sendLightningTemplate(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle topCountry callback from Lightning Overview
bot.action("topCountry", async(ctx) => {
    await lightning.sendTopCountry(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle networkStats callback from Lightning Overview
bot.action("networkStats", async(ctx) => {
    await lightning.sendNetworkStats(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle topLiquidity callback from Lightning Overview
bot.action("topLiquidity", async(ctx) => {
    await lightning.sendTopLiquidity(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the topChannel callback from Lightning Overview
bot.action("topChannel", async(ctx) => {
    await lightning.sendTopChannel(ctx, bot);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Shows Details about transaction
bot.action("nodeDetail", async(ctx) => {
    await bot.telegram.sendMessage(
        ctx.chat.id,
        "Please enter a 66 digit Node Public Key...👇", {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "✅ Done",
                        callback_data: "done",
                    }, ],
                ],
            },
        }
    );
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the channelDetail callback from Lightning Overview
bot.action("channelDetail", async(ctx) => {
    await bot.telegram.sendMessage(
        ctx.chat.id,
        "Please enter a 18 digit Channel-ID...👇", {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "✅ Done",
                        callback_data: "done",
                    }, ],
                ],
            },
        }
    );
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Inline Queries

//Return the blocktime to a chat
bot.inlineQuery("blocktime", async(ctx) => {
    try {
        //let message = ctx.inlineQuery.query
        let res = await axios.get("https://mempool.space/api/blocks/tip/height");
        let data = res.data;
        let results = [{
            type: "article",
            id: "blocktime",
            title: "⏳ Send current Blocktime to a chat.",
            input_message_content: {
                message_text: `⏳ Current Blocktime: ${data}`,
            },
            description: "Usage:\n@the_blockbot blocktime",
            thumb_url: "https://i.ibb.co/8m37BMz/the-Block-Bot-logo.png",
            thumb_width: 50,
            thumb_height: 50,
        }, ];
        await bot.telegram.answerInlineQuery(ctx.inlineQuery.id, results);
    } catch (error) {
        console.log(error);
        await ctx.answerInlineQuery("Something went wrong 🚧");
    }
});
//return the difficulty to a chat
bot.inlineQuery("difficulty", async(ctx) => {
    try {
        let res = await axios.get(
            "https://mempool.space/api/v1/difficulty-adjustment"
        );
        let data = res.data;
        let message = `Difficulty Adjustment:\n\n📊 Current Period: ${
      Math.round(data.progressPercent * 100) / 100
    } %\n📦 Remaining Blocks: ${data.remainingBlocks}\n🗒 Estimate Adjustment: ${
      Math.round(data.difficultyChange * 100) / 100
    } %\n🏁 Previous Retarget: ${
      Math.round(data.previousRetarget * 100) / 100
    } %\n`;
        let results = [{
            type: "article",
            id: "difficulty",
            title: "⚙️ Send Difficulty Adjustment to a chat.",
            input_message_content: {
                message_text: `${message}`,
            },
            description: "Usage:\n@the_blockbot difficulty",
            thumb_url: "https://i.ibb.co/8m37BMz/the-Block-Bot-logo.png",
            thumb_width: 50,
            thumb_height: 50,
        }, ];
        await bot.telegram.answerInlineQuery(ctx.inlineQuery.id, results);
    } catch (error) {
        console.log(error);
        await ctx.answerInlineQuery("Something went wrong 🚧");
    }
});
//return the backlog to a chat
bot.inlineQuery("backlog", async(ctx) => {
    try {
        //API
        let res = await axios.get("https://mempool.space/api/mempool");
        let data = res.data;

        let weight = Math.round(data.vsize / 1000000) / 100;
        let fees = Math.round(data.total_fee / 1000000) / 10000;
        let message = `Current Backlog Statistics:\n\n🕦 Waiting Transactions: ${data.count}\n⚖️ Total size: ${weight} MWU\n💸 Total fees: ${fees} BTC`;

        let results = [{
            type: "article",
            id: "backlog",
            title: "📝 Send current Mempool Backlog to a chat.",
            input_message_content: {
                message_text: `${message}`,
            },
            description: "Usage:\n@the_blockbot backlog",
            thumb_url: "https://i.ibb.co/8m37BMz/the-Block-Bot-logo.png",
            thumb_width: 50,
            thumb_height: 50,
        }, ];
        await bot.telegram.answerInlineQuery(ctx.inlineQuery.id, results);
    } catch (error) {
        console.log(error);
        await ctx.answerInlineQuery("Something went wrong 🚧");
    }
});
//Return the recommended fee to a chat
bot.inlineQuery("fee", async(ctx) => {
    try {
        //API
        let res = await axios.get("https://mempool.space/api/v1/fees/recommended");
        let data = res.data;
        let message = `Currently suggested fees for new transactions:\n\n😎 Min: ${data.minimumFee} sat/vB\n🐌 Slow: ${data.hourFee} sat/vB\n🏄🏿‍♀️ Medium: ${data.halfHourFee} sat/vB\n🚀 Fast: ${data.fastestFee} sat/vB\n`;

        let results = [{
            type: "article",
            id: "fee",
            title: "💸 Send recommended fee to a chat.",
            input_message_content: {
                message_text: `${message}`,
            },
            description: "Usage:\n@the_blockbot fee",
            thumb_url: "https://i.ibb.co/8m37BMz/the-Block-Bot-logo.png",
            thumb_width: 50,
            thumb_height: 50,
        }, ];
        await bot.telegram.answerInlineQuery(ctx.inlineQuery.id, results);
    } catch (error) {
        console.log(error);
        await ctx.answerInlineQuery("Something went wrong 🚧");
    }
});
//Return lightning node details to a chat
bot.inlineQuery(/^[A-Fa-f0-9]{66}$/gm, async(ctx) => {
    try {
        let pubKey = ctx.inlineQuery.query;
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
        let message = `\n✍️ Alias: ${data.alias}\n🔑 Public Key: ${
      data.public_key
    }\n💰 Active Capacity: ${data.capacity} sat\n😎 Active Channels: ${
      data.active_channel_count
    }\n📐 Average Channel Size: ${Math.round(
      data.capacity / data.active_channel_count
    )} sat\n🌐 Location: ${location}\n📅 First Seen:\n ${new Date(
      data.first_seen * 1000
    )}\n🕦 Last Update:\n ${new Date(data.updated_at * 1000)}\n`;

        let results = [{
            type: "article",
            id: "node",
            title: "🔎 Send node details to a chat.",
            input_message_content: {
                message_text: `Lightning Node Details:\n${message}`,
            },
            description: "Usage:\n@the_blockbot <Node PubKey>",
            thumb_url: "https://i.ibb.co/8m37BMz/the-Block-Bot-logo.png",
            thumb_width: 50,
            thumb_height: 50,
        }, ];
        await bot.telegram.answerInlineQuery(ctx.inlineQuery.id, results);
    } catch (error) {
        console.log(error);
        await ctx.answerInlineQuery("Something went wrong 🚧");
    }
});
////Return infos about a Lightning Channel with the given :channelID to a chat
bot.inlineQuery(/^[0-9]{18}$/gm, async(ctx) => {
    try {
        let channelId = ctx.inlineQuery.query;
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
    } ppm\n💵 Base Fee: ${data.node_left.base_fee_mtokens} ppm\n📃 Min HTLC: ${
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
    } ppm\n💵 Base Fee: ${data.node_right.base_fee_mtokens} ppm\n📃 Min HTLC: ${
      data.node_right.min_htlc_mtokens
    } sat\n📝 Max HTLC: ${
      data.node_right.max_htlc_mtokens / 1000
    } sat\n👉 Timelock Delta: ${data.node_right.cltv_delta} Blocks\n`;

        let results = [{
            type: "article",
            id: "channelid",
            title: "📊 Send LN Channel details to a chat.",
            input_message_content: {
                message_text: `Lightning Channel Info:\n${message}`,
            },
            description: "Usage:\n@the_blockbot <18 digit Channel-ID>",
            thumb_url: "https://i.ibb.co/8m37BMz/the-Block-Bot-logo.png",
            thumb_width: 50,
            thumb_height: 50,
        }, ];
        await bot.telegram.answerInlineQuery(ctx.inlineQuery.id, results);
    } catch (error) {
        console.log(error);
        await ctx.answerInlineQuery("Something went wrong 🚧");
    }
});

// Start the server
if (process.env.NODE_ENV === "production") {
    //Webhooks for the production server
    //app.use(express.json());
    app.use(bot.webhookCallback("/"));

    app.post("/", (req, res) => {
        bot.handleUpdate(req.body, res.body);
        console.log(req.body);
        console.log(res);
        req.end();
    });

    const PORT = process.env.PORT || 8443;
    app.listen(PORT, () => {
        console.log(`Bot listening on port ${PORT}`);
    });
} else {
    // Long Polling for development
    bot.launch();
}