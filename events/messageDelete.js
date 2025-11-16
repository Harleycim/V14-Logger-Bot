const { EmbedBuilder } = require("discord.js");
const config = require("../src/config");


module.exports = {
  name: "messageDelete",
  async execute(message) {
    
    if (!message.guild || message.author?.bot || message.guild.id !== config.guildId) return;

    
    const logChannel = message.guild.channels.cache.get(config.logChannelId);
    if (!logChannel) return;

    
    const embed = new EmbedBuilder()
      .setTitle("🗑️ Mesaj Silindi")
      .setDescription(`**${message.author.tag}** tarafından gönderilen mesaj silindi.`)
      .addFields({
        name: "İçerik",
        value: message.content || "*boş mesaj*",
      })
      .setColor("Red")
      .setTimestamp();

    
    logChannel.send({ embeds: [embed] });
  },
};
