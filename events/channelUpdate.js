
const { EmbedBuilder } = require("discord.js");
const config = require("../src/config");

module.exports = (client) => {
  client.on("channelUpdate", (oldChannel, newChannel) => {
    if (newChannel.guild.id !== config.guildId) return;

    const logChannel = newChannel.guild.channels.cache.get(config.logChannelId);
    if (!logChannel) return;

    let embed = new EmbedBuilder()
      .setTitle("📁 Kanal Güncellendi")
      .setDescription(`**${oldChannel.name}** kanalı güncellendi.`)
      .setColor("Yellow")
      .setTimestamp();

    if (oldChannel.name !== newChannel.name) {
      embed.addFields({ name: "Önce", value: oldChannel.name }, { name: "Sonra", value: newChannel.name });
    }

    logChannel.send({ embeds: [embed] });
  });
};
