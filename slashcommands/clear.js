const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clearing message"),
  async execute(interaction) {
    await interaction.reply("clear!");
  },
};
