const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();
const axios = require("axios");
const express = require("express");
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
console.log("The Bot is running");
//Start Command
bot.command("start", async(ctx) => {
    let userName = ctx.message.from.first_name;
    let startMessage = `👋Welcome ${userName}!\n\n🔍This Block Explorer provides you with Information about the Bitcoin Blockchain.\n\n
🫵 You can check:\n\n🚦 The current transaction traffic\n🧮 How high is the hashrate?\n🤷🏽‍♂️ What is the recommended fee?\n⏳ What Blocktime is it?\n👀 Is your transaction already confirmed?\n🚀 And much more...\n\n⚙️ Commands:\n\n/start 📚 Start from the beginning.\n/explorer 🔭 Discover the Mempool.\n/help 📖 Read this help.\n/tip 🧡 Support the work.\n\n👋 Join us for feedback on https://t.me/theblockbot
`;
    await ctx.reply(startMessage);
    console.log(ctx.message);
});

//Explorer Command with StartTemplate
bot.command("explorer", async(ctx) => {
    await sendStartTemplate(ctx);
});
//Handle the help command
bot.command("help", async(ctx) => {
    await bot.telegram.sendMessage(
        ctx.chat.id,
        `👉 What is a Block Explorer?\n\nA block explorer is a tool that enables you to explore real-time and historical information about the blockchain of a cryptocurrency. This includes data related to blocks, transactions, addresses, and more.\n\n👉 What is a Mempool?\n\nA mempool (short for "memory pool") is the queue of pending and unconfirmed transactions for a cryptocurrency network node. There is no one global mempool: every node on the network maintains its own mempool, so different nodes may hold different transactions in their mempools.\n\n👉 What is Mining?\n\nMining is the process by which unconfirmed transactions in a mempool are confirmed into a block on a blockchain. Miners select unconfirmed transactions from their mempools and arrange them into a block such that they solve a particular math problem.\nThe first miner on the network to find a suitable block earns all the transaction fees from the transactions in that block. As a result, miners tend to prioritize transactions with higher transaction fees.\n\n👉 What are Mining Pools?\n\nMining pools are groups of miners that combine their computational power in order to increase the probability of finding new blocks.\n\n👉 What is sat/vB?\n\nThe priority of a pending Bitcoin transaction is determined by its feerate. Feerates are measured in sat/vB.\n\n👉 Why isn't my transaction confirming?\n\nIf it's been a while and your transaction hasn't confirmed, your transaction is probably using a lower feerate relative to other transactions currently in the mempool. Depending on how you made your transaction, there may be ways to accelerate the process.\nThere's no need to panic—a Bitcoin transaction will always either confirm completely (or not at all) at some point. As long as you have your transaction's ID, you can always see where your funds are.\nUsing a higher sat/vB feerate for a Bitcoin transaction will generally result in quicker confirmation than using a lower feerate. But feerates change all the time, so it's important to check suggested feerates right before making a transaction to avoid it from getting stuck.`, {
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
});
//Handle the done callback
bot.action("done", async(ctx) => {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Explorer Handler with StartTemplate
bot.action("explorer", async(ctx) => {
    await sendStartTemplate(ctx);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle the mempool callback from total overview
bot.action("mempool", async(ctx) => {
    await sendMemTemplate(ctx);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle the backlog callback from mempool overview
bot.action("backlog", async(ctx) => {
    await sendBacklog(ctx);
    await ctx.deleteMessage();
});
//Handle the projectedBlocks callback from mempool overview
bot.action("projectedBlocks", async(ctx) => {
    await sendProjectedBlocks(ctx);
    await ctx.deleteMessage();
});
//Handle the difficultyAdjustment callback total overview
bot.action("difficultyAdjustment", async(ctx) => {
    await showDifficulty(ctx);
    await ctx.deleteMessage();
});
//Handle the blocks callback from total overview
bot.action("blocks", async(ctx) => {
    await sendBlockTemplate(ctx);
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

//Handle the blockHeight callback from block overview
bot.action("blockHeight", async(ctx) => {
    await showBlocktime(ctx);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle the recFee callback from total overview
bot.action("recFee", async(ctx) => {
    await showFee(ctx);
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
    await sendMiningTemplate(ctx);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle the hashrate callback from mining overview
bot.action("hashrate", async(ctx) => {
    await showHashrate(ctx);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle the Reward Stats callback from Mining Overview
bot.action("rewardStats", async(ctx) => {
    await showRewardStats(ctx);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle the Pool Hashrate callback from Mining Overview
bot.action("poolHashrate", async(ctx) => {
    await showPoolHashrate(ctx);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle the Pool BlocksFound  callback from Mining Overview
bot.action("poolBlocks", async(ctx) => {
    await showPoolBlocks(ctx);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle the Lightning callback from Total Overview
bot.action("lightning", async(ctx) => {
    await sendLightningTemplate(ctx);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle topCountry callback from Lightning Overview
bot.action("topCountry", async(ctx) => {
    await sendTopCountry(ctx);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle networkStats callback from Lightning Overview
bot.action("networkStats", async(ctx) => {
    await sendNetworkStats(ctx);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle topLiquidity callback from Lightning Overview
bot.action("topLiquidity", async(ctx) => {
    await sendTopLiquidity(ctx);
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});
//Handle the topChannel callback from Lightning Overview
bot.action("topChannel", async(ctx) => {
    await sendTopChannel(ctx);
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

//Handle the Donation callback from total overview
bot.action("tip", async(ctx) => {
    let message = `LNURL1DP68GURN8GHJ7MRW9E6XJURN9UH8WETVDSKKKMN0WAHZ7MRWW4EXCUP0X9URVCEEX4JX2CTRVY6RQDECX43KVVS5LKZ\n\nIf you 🧡 the bot, please consider supporting this project with a donation.\n\nLightning Adress: ⚡️stacksats@getalby.com\n\nThank you, very much appreciated!`;
    await bot.telegram.sendPhoto(ctx.chat.id, "https://imgur.com/a/p0J2Z0V", {
        caption: { text: message },
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "🔙 Back to Total Overview",
                    callback_data: "explorer",
                }, ],
            ],
        },
    });
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});

//Handle the donate command from Start Template
bot.command("tip", async(ctx) => {
    let message = `LNURL1DP68GURN8GHJ7MRW9E6XJURN9UH8WETVDSKKKMN0WAHZ7MRWW4EXCUP0X9URVCEEX4JX2CTRVY6RQDECX43KVVS5LKZ\n\nIf you 🧡 the bot, please consider supporting this project with a donation.\n\nLightning Adress: ⚡️stacksats@getalby.com\n\nThank you, very much appreciated!`;
    await bot.telegram.sendPhoto(ctx.chat.id, "https://imgur.com/a/p0J2Z0V", {
        caption: { text: message },
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "✅ Done",
                    callback_data: "done",
                }, ],
            ],
        },
    });
    await ctx.deleteMessage();
});
//Explorer InlineButtons Template
async function sendStartTemplate(ctx) {
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
async function sendMemTemplate(ctx) {
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
async function sendBlockTemplate(ctx) {
    try {
        await bot.telegram.sendMessage(ctx.chat.id, "Select Block Information 👇", {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "⏳ Current Blocktime",
                        callback_data: "blockHeight",
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
async function sendMiningTemplate(ctx) {
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
                        //Hier weiter coden!
                        [{ text: "📈 Pool Hashrates", callback_data: "poolHashrate" }],
                        [{
                            text: "📊 Blocks found by Pools",
                            callback_data: "poolBlocks",
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
//Lightning Network Template
async function sendLightningTemplate(ctx) {
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

//Return the current  Backlog
async function sendBacklog(ctx) {
    try {
        //API
        let res = await axios.get("https://mempool.space/api/mempool");
        let data = res.data;

        let weight = Math.round(data.vsize / 1000000) / 100;
        let fees = Math.round(data.total_fee / 1000000) / 10000;
        let message = `Current Backlog Statistics:\n\n🕦 Waiting Transactions: ${data.count}\n\n⚖️ Total size: ${weight} MWU\n\n💸 Total fees: ${fees} BTC`;
        await bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "🔙 Back to Mempool Overview",
                        callback_data: "mempool",
                    }, ],
                ],
            },
        });
        await ctx.answerCbQuery();
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong 🚧");
    }
}
//Returns upcoming blocks
async function sendProjectedBlocks(ctx) {
    try {
        //API
        let res = await axios.get(
            "https://mempool.space/api/v1/fees/mempool-blocks"
        );
        let data = res.data;
        let message = ``;
        let i = 1;
        for (const item of data) {
            message += `\n📇 Block: ${i}\n📐 Size: ${
        Math.round(item.blockSize / 10000) / 100
      } MB\n⚖️ Weight: ${
        Math.round(item.blockVSize / 10000) / 100
      } MWU\n🔄 Tx-count: ${item.nTx}\n📝 Total fees: ${
        Math.round(item.totalFees / 1000000) / 10000
      } BTC\n💰 Median fee: ${Math.round(item.medianFee * 100) / 100} sat/vB\n`;
            i++;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            `Tick Tock next Block:\n${message}`, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "🔙 Back to Mempool Overview",
                            callback_data: "mempool",
                        }, ],
                    ],
                },
            }
        );
        await ctx.answerCbQuery();
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong 🚧");
    }
}
//Return the Difficulty
async function showDifficulty(ctx) {
    try {
        //API
        let res = await axios.get(
            "https://mempool.space/api/v1/difficulty-adjustment"
        );
        let data = res.data;
        let message = `Difficulty Adjustment:\n\n📊 Current Period: ${
      Math.round(data.progressPercent * 100) / 100
    } %\n\n📦 Remaining Blocks: ${
      data.remainingBlocks
    }\n\n🗒 Estimate Adjustment: ${
      Math.round(data.difficultyChange * 100) / 100
    } %\n\n🏁 Previous Retarget: ${
      Math.round(data.previousRetarget * 100) / 100
    } %\n`;
        await bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "🔙 Back to Total Overview", callback_data: "explorer" }],
                ],
            },
        });
        await ctx.answerCbQuery();
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong 🚧");
    }
}
//Send the Blocktime
async function showBlocktime(ctx) {
    try {
        //API
        let res = await axios.get("https://mempool.space/api/blocks/tip/height");
        let data = res.data;
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "⏳Current Blocktime: " + data, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "🔙 Back to Block Informations",
                            callback_data: "blocks",
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

//Enter Blocktime to get BlockHash
bot.hears(/^[1-9][0-9]{0,5}$/gm, async(ctx) => {
    try {
        let blockTime = ctx.match[0];
        //API
        let res = await axios.get(
            `https://mempool.space/api/block-height/${blockTime}`
        );
        let data = res.data;
        let message = `⏳ Blocktime: ${blockTime}\n\n🧮Hash: ${data}`;
        await bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "🔙 Back to Block Infomation",
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

//Return recommended Fees
async function showFee(ctx) {
    try {
        //API
        let res = await axios.get("https://mempool.space/api/v1/fees/recommended");
        let data = res.data;
        let message = `Currently suggested fees for new transactions:\n\n😎 Min: ${data.minimumFee} sat/vB\n\n🐌Slow: ${data.hourFee} sat/vB\n\n🏄🏿‍♀️ Medium: ${data.halfHourFee} sat/vB\n\n🚀Fast: ${data.fastestFee} sat/vB\n`;
        await bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "🔙 Back to Explorer",
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
//Takes an adress and returns UTXOS # BC1Q
bot.hears(/^bc1q[0-9a-zA-Z]{38}$/gm, async(ctx) => {
    try {
        let adressMessage = ctx.match[0];
        //API
        let res = await axios.get(
            `https://mempool.space/api/address/${adressMessage}/utxo`
        );
        let data = res.data;
        console.log(data);
        let message = ``;
        let i = 1;
        for (const item of data) {
            message += `
🍰 UTXO: ${i}
🪪 Transaction-Id: ${item.txid}
🔄 Usage count: ${item.vout}
✅ Confirmed: ${item.status.confirmed} @⏳ Blocktime ${item.status.block_height}
🧮 Block Hash: ${item.status.block_hash}
💰 Value: ${item.value / 100000000} BTC\n
`;
            i++;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Unspent Transaction Output:\n" + message, {
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
        await ctx.reply("Too many outputs!\n\nMaybe time to consolidate?");
    }
});
//Takes an adress and returns UTXOS # OLD 1/3
bot.hears(/^[13][0-9a-zA-Z]{32,34}$/gm, async(ctx) => {
    try {
        let adressMessage = ctx.match[0];
        //API
        let res = await axios.get(
            `https://mempool.space/api/address/${adressMessage}/utxo`
        );
        let data = res.data;
        console.log(data);
        let message = ``;
        let i = 1;
        for (const item of data) {
            message += `
🍰 UTXO: ${i}
🪪 Transaction-Id: ${item.txid}
🔄 Usage count: ${item.vout}
✅ Confirmed: ${item.status.confirmed} @⏳ Blocktime ${item.status.block_height}
🧮 Block Hash: ${item.status.block_hash}
💰 Value: ${item.value / 100000000} BTC\n
`;
            i++;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Unspent Transaction Output: " + message, {
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
        await ctx.reply("Too many outputs!\n\nMaybe time to consolidate?");
    }
});
//Takes an adress and returns UTXOS # BC1P
bot.hears(/^bc1p[0-9a-zA-Z]{58}$/gm, async(ctx) => {
    try {
        let adressMessage = ctx.match[0];
        //API
        let res = await axios.get(
            `https://mempool.space/api/address/${adressMessage}/utxo`
        );
        let data = res.data;
        console.log(data);
        let message = ``;
        let i = 1;
        for (const item of data) {
            message += `
🍰 UTXO: ${i}
🪪 Transaction-Id: ${item.txid}
🔄 Usage count: ${item.vout}
✅ Confirmed: ${item.status.confirmed} @⏳Blocktime ${item.status.block_height}
🧮 Block Hash: ${item.status.block_hash}
💰 Value: ${item.value / 100000000} BTC\n
`;
            i++;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Unspent Transaction Output: " + message, {
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
        await ctx.reply("Too many outputs!\n\nMaybe time to consolidate?");
    }
});
//
//Takes an TXID and returns TX details # BC1P
bot.hears(/^[A-Za-z0-9]{64}$/gm, async(ctx) => {
    try {
        let txMessage = ctx.match[0];
        //API
        let res = await axios.get(`https://mempool.space/api/tx/${txMessage}`);
        let data = res.data;
        console.log(data.vin);
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
//Return Hashrates
async function showHashrate(ctx) {
    try {
        //API
        let res = await axios.get(
            "https://mempool.space/api/v1/mining/hashrate/3d"
        );
        let data = res.data;
        let message = `\n🧮 Real time Hashrate: ${
      Math.round(data.currentHashrate / 1000000000000) / 100
    } Terahash/sec\n📊 Real time Difficulty: ${data.currentDifficulty}\n`;
        for (let i = 0; i < 3; i++) {
            message += `\n📐 Average Hashrate: ${
        Math.round(data.hashrates[i].avgHashrate / 1000000000000) / 100
      } Terahash/sec\n📅 Timestamp: ${new Date(
        data.hashrates[i].timestamp * 1000
      )}\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Network-wide Hashrate:\n(Over the last 3 days)\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "🔙 Back to Mining Overview",
                            callback_data: "mining",
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
//Return the Mining reward stats
async function showRewardStats(ctx) {
    try {
        //API
        let res = await axios.get(
            "https://mempool.space/api/v1/mining/reward-stats/144"
        );
        let data = res.data;
        let message = `\n🚩Blocktime Start: ${data.startBlock}\n🏁Blocktime End: ${
      data.endBlock
    }\n\n🎯Total Transactions: ${data.totalTx}\n💰Total Reward: ${
      data.totalReward / 100000000
    } BTC\n💸Total Fees: ${data.totalFee / 100000000} BTC\n`;

        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Mining Rewards past 144 Blocks\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "🔙 Back to Mining Overview",
                            callback_data: "mining",
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
//Return the Pool Hashrates
async function showPoolHashrate(ctx) {
    try {
        //API request
        let res = await axios.get(
            "https://mempool.space/api/v1/mining/hashrate/pools/1m"
        );
        let data = res.data;
        let timeStamp = data[0].timestamp * 1000;
        let time = new Date(timeStamp);
        let message = ``;
        for (let i = 0; i < 10; i++) {
            message += `\n✍️ Name: ${data[i].poolName}\n🔄 Share: ${
        Math.round(data[i].share * 10000) / 100
      }%\n🧮 Hashrate: ${
        Math.round(data[i].avgHashrate / 1000000000000) / 100
      } Terahash/sec\n📅 Timestamp: ${time}\n `;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Average Hashrates and share of total hashrate of Mining Pools for 1 Month:\n(In descending order of hashrate)\n" +
            message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "🔙 Back to Mining Overview",
                            callback_data: "mining",
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

//Return the BlocksFound by Pools
async function showPoolBlocks(ctx) {
    try {
        //API
        let res = await axios.get("https://mempool.space/api/v1/mining/pools/1w");
        let data = res.data.pools;
        let message = ``;
        for (let i = 0; i < 10; i++) {
            message += `\n🏆 Rank: ${data[i].rank}\n✍️ Name: ${data[i].name}\n📦 Blocks found: ${data[i].blockCount}\n🗑 Empty Blocks: ${data[i].emptyBlocks}\n🔗 Link: ${data[i].link}\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Mining Pools ordered by blocks found in the last week:\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "🔙 Back to Mining Overview",
                            callback_data: "mining",
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
//Returns aggregate capacity and number of clearnet nodes per country. Capacity figures are in satoshis.
async function sendTopCountry(ctx) {
    try {
        //API request
        let res = await axios.get(
            "https://mempool.space/api/v1/lightning/nodes/countries"
        );
        let data = res.data;
        let message = ``;
        for (let i = 0; i < 10; i++) {
            message += `\n🏆 Rank: ${i + 1}\n🌐 Country: ${data[i].name.en}, ${
        data[i].name["pt-BR"]
      }, ${data[i].name.es}\n📊 Nodes: ${data[i].count}\n🔄 Share: ${
        data[i].share
      }\n💰 Capacity: ${Math.round(data[i].capacity / 1000000) / 100} BTC\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Capacity and Number of Clearnet Nodes per Country:\n" + message, {
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
}
//Return the latest Lightning Network Statistics
async function sendNetworkStats(ctx) {
    try {
        //API request
        let res = await axios.get(
            "https://mempool.space/api/v1/lightning/statistics/latest"
        );
        let data = res.data.latest;
        let date = data.added;
        let message = `\n⚡️ Nodes: ${data.node_count}\n😎 Channels: ${
      data.channel_count
    }\n💰 Capacity: ${
      Math.round(data.total_capacity / 1000000) / 100
    }BTC\n📐 Average Capacity: ${data.avg_capacity}sat\n💸 Average Fee Rate: ${
      data.avg_fee_rate
    }ppm\n⚖️ Average Base Fee: ${
      data.avg_base_fee_mtokens
    }ppm\n🕦 At the time: ${date}\n`;
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Lastest Network Statistics:\n" + message, {
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
}
//Return the TopLiquidityNodes
async function sendTopLiquidity(ctx) {
    try {
        //API request
        let res = await axios.get(
            "https://mempool.space/api/v1/lightning/nodes/rankings/liquidity"
        );
        let data = res.data;
        let message = ``;
        for (let i = 0; i < 10; i++) {
            message += `\n🏆 Rank: ${i + 1}\n✍️ Alias: ${
        data[i].alias
      }\n💰 Capacity: ${
        Math.round(data[i].capacity / 1000000) / 100
      }BTC\n😎 Channels: ${data[i].channels}\n📅 First Seen: ${new Date(
        data[i].firstSeen * 1000
      )}\n🕦 Last Update: ${new Date(
        data[i].updatedAt * 1000
      )}\n🔑 Public Key: ${data[i].publicKey}\n🌐 Country: ${
        data[i].country.en
      }, ${data[i].country["pt-BR"]}, ${data[i].country.es}\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Top Nodes by Liquidity:\n" + message, {
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
}
//Return the Top Channel Nodes
async function sendTopChannel(ctx) {
    try {
        //API request
        let res = await axios.get(
            "https://mempool.space/api/v1/lightning/nodes/rankings/connectivity"
        );
        let data = res.data;
        let message = ``;
        for (let i = 0; i < 10; i++) {
            message += `\n🏆 Rank: ${i + 1}\n✍️ Alias: ${
        data[i].alias
      }\n💰 Capacity: ${
        Math.round(data[i].capacity / 1000000) / 100
      }BTC\n😎 Channels: ${data[i].channels}\n📅 First Seen: ${new Date(
        data[i].firstSeen * 1000
      )}\n🕦 Last Update: ${new Date(
        data[i].updatedAt * 1000
      )}\n🔑 Public Key: ${data[i].publicKey}\n🌐 Country: ${
        data[i].country.en
      }, ${data[i].country["pt-BR"]}, ${data[i].country.es}\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Top Nodes by Liquidity:\n" + message, {
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
}
//Return a list of a node's channels given its :pubKey
bot.hears(/[A-Fa-f0-9]{66}/gm, async(ctx) => {
    try {
        let pubKey = ctx.match[0];
        //API
        let res = await axios.get(
            `https://mempool.space/api/v1/lightning/nodes/${pubKey}`
        );
        let data = res.data;
        let message = `\n✍️ Alias: ${data.alias}\n\n🔑 Public Key: ${
      data.public_key
    }\n\n💰 Active Capacity: ${data.capacity} sat\n\n😎 Active Channels: ${
      data.active_channel_count
    }\n\n📐 Average Channel Size: ${Math.round(
      data.capacity / data.active_channel_count
    )} sat\n\n🌐 Location: ${data.city.en}, ${
      data.country.en
    }\n\n📅 First Seen:\n ${new Date(
      data.first_seen * 1000
    )}\n🕦 Last Update:\n ${new Date(data.updated_at * 1000)}\n`;
        await bot.telegram.sendMessage(ctx.chat.id, "Node Statistic:\n" + message, {
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