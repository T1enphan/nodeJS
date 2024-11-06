const { StreamChat } = require("stream-chat");

const apiKey = "cad9tfc3qmpv";
const apiSecret = "5vakp69ttqjmgcfnmvsvateb3tzn3sk732vgk63vgd7cuv3z7yftapw64n439rg8";

const chatClient = StreamChat.getInstance(apiKey, apiSecret);

module.exports = chatClient;
