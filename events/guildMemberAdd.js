const { EmbedBuilder } = require("discord.js");
const config = require("../src/config"); 

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    if (member.guild.id !== config.guildId) return;

    const logChannel = member.guild.channels.cache.get(config.logChannelId);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
      .setTitle("👤 Kullanıcı Katıldı")
      .setDescription(`**${member.user.tag}** sunucuya katıldı.`)
      .setColor("Green")
      .setTimestamp();

    logChannel.send({ embeds: [embed] });
  },
};
