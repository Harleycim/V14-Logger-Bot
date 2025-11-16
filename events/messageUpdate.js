const { EmbedBuilder } = require("discord.js");
const config = require("../src/config");


module.exports = {
  name: "messageUpdate",
  async execute(oldMessage, newMessage) {
    
    if (!newMessage.guild || oldMessage.author?.bot || oldMessage.content === newMessage.content || newMessage.guild.id !== config.guildId) return;

    
    const logChannel = newMessage.guild.channels.cache.get(config.logChannelId);
    if (!logChannel) return;

    
    const embed = new EmbedBuilder()
      .setTitle("✏️ Mesaj Düzenlendi")
      .setDescription(`**${newMessage.author.tag}** mesajını düzenledi.`)
      .addFields(
        { name: "Önce", value: oldMessage.content || "*boş*" },
        { name: "Sonra", value: newMessage.content || "*boş*" }
      )
      .setColor("Yellow")
      .setTimestamp();

    
    logChannel.send({ embeds: [embed] });
  },
};
