module.exports = (bot) => {
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
};