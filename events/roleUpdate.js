
const { EmbedBuilder } = require("discord.js");
const config = require("../src/config");


module.exports = (client) => {
  client.on("roleUpdate", (oldRole, newRole) => {
    if (newRole.guild.id !== config.guildId) return;

    const logChannel = newRole.guild.channels.cache.get(config.logChannelId);
    if (!logChannel) return;

    let embed = new EmbedBuilder()
      .setTitle("🎭 Rol Güncellendi")
      .setDescription(`**${oldRole.name}** rolü güncellendi.`)
      .setColor("Yellow")
      .setTimestamp();

    if (oldRole.name !== newRole.name) {
      embed.addFields({ name: "Önce", value: oldRole.name }, { name: "Sonra", value: newRole.name });
    }

    logChannel.send({ embeds: [embed] });
  });
};
