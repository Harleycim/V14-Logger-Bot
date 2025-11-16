const { EmbedBuilder } = require("discord.js");
const config = require("../src/config");


module.exports = {
  name: "guildUpdate",
  async execute(oldGuild, newGuild) {
    
    if (newGuild.id !== config.guildId) return;

    
    const logChannel = newGuild.channels.cache.get(config.logChannelId);
    if (!logChannel) return;

    
    const embed = new EmbedBuilder()
      .setTitle("🔄 Sunucu Bilgisi Güncellendi")
      .setColor("Blue")
      .setTimestamp();

    
    if (oldGuild.name !== newGuild.name) {
      embed.addFields({
        name: "Eski Sunucu Adı",
        value: oldGuild.name || "*Boş*",
      });
      embed.addFields({
        name: "Yeni Sunucu Adı",
        value: newGuild.name || "*Boş*",
      });
    }

    
    if (oldGuild.icon !== newGuild.icon) {
      embed.addFields({
        name: "Eski Sunucu Simgesi",
        value: oldGuild.iconURL() || "*Boş*",
      });
      embed.addFields({
        name: "Yeni Sunucu Simgesi",
        value: newGuild.iconURL() || "*Boş*",
      });
    }

    
    if (oldGuild.banner !== newGuild.banner) {
      embed.addFields({
        name: "Eski Sunucu Banner'ı",
        value: oldGuild.bannerURL() || "*Boş*",
      });
      embed.addFields({
        name: "Yeni Sunucu Banner'ı",
        value: newGuild.bannerURL() || "*Boş*",
      });
    }

    
    if (oldGuild.description !== newGuild.description) {
      embed.addFields({
        name: "Eski Sunucu Açıklaması",
        value: oldGuild.description || "*Boş*",
      });
      embed.addFields({
        name: "Yeni Sunucu Açıklaması",
        value: newGuild.description || "*Boş*",
      });
    }

    
    logChannel.send({ embeds: [embed] });
  },
};
