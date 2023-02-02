//Explorer InlineButtons Template
async function sendStartTemplate(ctx, bot) {
    await bot.telegram.sendMessage(
        ctx.chat.id,
        "Select what Infomations you need 👇", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "🔮 Mempool", callback_data: "mempool" }],
                    [{
                        text: "⚙️ Difficulty Details",
                        callback_data: "difficultyAdjustment",
                    }, ],
                    [{ text: "📦 Block Details", callback_data: "blocks" }],

                    [{ text: "💰 Fees", callback_data: "recFee" }],
                    [{
                        text: "👀 Adress UTXOs",
                        callback_data: "adresses",
                    }, ],
                    [{
                        text: "🔎 Transaction ID",
                        callback_data: "transaction",
                    }, ],
                    [{
                        text: "⛏ Mining Data",
                        callback_data: "mining",
                    }, ],
                    [{
                        text: "⚡️ Lightning Network",
                        callback_data: "lightning",
                    }, ],
                    [{ text: "☕️ Tip me", callback_data: "tip" }],
                ],
            },
        }
    );
}
//Mempool Template
async function sendMemTemplate(ctx, bot) {
    try {
        await bot.telegram.sendMessage(ctx.chat.id, "Select from the Mempool 👇", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "📝 Mempool Backlog", callback_data: "backlog" }],
                    [{
                        text: "🔭 Projected Blocks",
                        callback_data: "projectedBlocks",
                    }, ],
                    [{
                        text: "🔙 Back to Total Overview",
                        callback_data: "explorer",
                    }, ],
                ],
            },
        });
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong 🚧");
    }
}
//Block Template
async function sendBlockTemplate(ctx, bot) {
    try {
        await bot.telegram.sendMessage(ctx.chat.id, "Select Block Information 👇", {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "⏳ Current Blocktime",
                        callback_data: "blockHeight",
                    }, ],
                    [{
                        text: "📦 Latest confirmed Blocks",
                        callback_data: "latestBlocks",
                    }, ],
                    [{
                        text: "🧮 Get Hash from specific Blocktime\n(Blocktime required)",
                        callback_data: "blockHash",
                    }, ],
                    [{
                        text: "🪧 Specific Block Informations\n(Hash value required)",
                        callback_data: "getBlockInfo",
                    }, ],
                    [{
                        text: "🔙 Back to Total Overview",
                        callback_data: "explorer",
                    }, ],
                ],
            },
        });
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong 🚧");
    }
}
//Mining Template
async function sendMiningTemplate(ctx, bot) {
    try {
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Select Mining Informations 👇", {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🧮 Hashrate (3 Days)", callback_data: "hashrate" }],
                        [{
                            text: "💰 Reward Statistics",
                            callback_data: "rewardStats",
                        }, ],
                        [{ text: "📈 Pool Hashrates", callback_data: "poolHashrate" }],
                        [{
                            text: "📊 Blocks found by Pools",
                            callback_data: "poolBlocks",
                        }, ],
                        [{
                            text: "🏭 Pool Informations",
                            callback_data: "poolDetail",
                        }, ],
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
}
//Pool Detail Template
async function sendPoolTemplate(ctx, bot) {
    try {
        await bot.telegram.sendMessage(ctx.chat.id, "Select a Pool 👇", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Braiinspool", callback_data: "braiinspool" },
                        { text: "AntPool", callback_data: "antpool" },
                        { text: "F2Pool", callback_data: "f2pool" },
                    ],
                    [
                        { text: "Binance Pool", callback_data: "binancepool" },
                        { text: "ViaBTC", callback_data: "viabtc" },
                        { text: "BTC.com", callback_data: "btccom" },
                    ],
                    [
                        { text: "Poolin", callback_data: "poolin" },
                        { text: "Luxor", callback_data: "luxor" },
                        { text: "MARA Pool", callback_data: "marapool" },
                    ],
                    [
                        { text: "SBI Crypto", callback_data: "sbicrypto" },
                        { text: "ULTIMUSPOOL", callback_data: "ultimuspool" },
                        { text: "Foundry USA", callback_data: "foundryusa" },
                    ],
                    [{
                            text: "🔝 Back to Top",
                            callback_data: "explorer",
                        },
                        {
                            text: "🔙 Back to Mining",
                            callback_data: "mining",
                        },
                    ],
                ],
            },
        });
    } catch (error) {
        console.log(error);
        ctx.reply("Something went wrong 🚧");
    }
}

//Lightning Network Template
async function sendLightningTemplate(ctx, bot) {
    try {
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Select Lightning Network Informations 👇", {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "🏆 Top Nodes per Country",
                            callback_data: "topCountry",
                        }, ],
                        [{
                            text: "📊 Network Statistics",
                            callback_data: "networkStats",
                        }, ],
                        [{ text: "🥇 Top Liquidity", callback_data: "topLiquidity" }],
                        [{
                            text: "🎯 Top Channels",
                            callback_data: "topChannel",
                        }, ],
                        [{
                            text: "🔎 Node Details (Node Pubkey required)",
                            callback_data: "nodeDetail",
                        }, ],
                        [{
                            text: "👁 Channel Details (Channel ID required)",
                            callback_data: "channelDetail",
                        }, ],
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
}
module.exports = {
    sendStartTemplate,
    sendMemTemplate,
    sendBlockTemplate,
    sendMiningTemplate,
    sendLightningTemplate,
    sendPoolTemplate,
};