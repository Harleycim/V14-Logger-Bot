const { EmbedBuilder } = require("discord.js");
const config = require("../src/config");


module.exports = {
  name: "guildMemberRemove",
  async execute(member) {
    
    if (member.guild.id !== config.guildId) return;

    
    const logChannel = member.guild.channels.cache.get(config.logChannelId);
    if (!logChannel) return;

    
    const embed = new EmbedBuilder()
      .setTitle("🚪 Kullanıcı Ayrıldı")
      .setDescription(`${member.user.tag} sunucudan ayrıldı.`)
      .setColor("Red")
      .setTimestamp();

    
    logChannel.send({ embeds: [embed] });
  },
};
