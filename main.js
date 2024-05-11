const { NeynarAPIClient } = require("@neynar/nodejs-sdk");
const core = require("@actions/core");

async function run() {
    // Input values to the action
    let message = core.getInput("message", { required: true });
    let signerUUID = core.getInput("signer-uuid", { required: true });
    let neynarApiKey = core.getInput("neynar-api-key", { required: true });
    let embedsCS = core.getInput("embeds");
    let channelId = core.getInput("channel-id");

    let embeds = embedsCS.split(",").map((embed) => {
        if (embed.startsWith("https://")) return { url: embed };

        embed = embed.replaceAll("(", "").replaceAll(")", "");

        let [fid, hash] = embed.split("_");

        return { cast_id: { fid, hash } };
    });

    const client = new NeynarAPIClient(neynarApiKey);

    await client.publishCast(signerUUID, message, {
        embeds: embedsCS ? embeds : [],
        channelId: channelId ?? undefined,
    });
}

run();
