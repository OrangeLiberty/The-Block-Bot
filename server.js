console.log("The Bot is running");
require("dotenv").config();
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const express = require("express");
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

// Start the server
if (process.env.NODE_ENV === "production") {
    // Use Webhooks for the production server
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
    // Use Long Polling for development
    bot.launch();
}