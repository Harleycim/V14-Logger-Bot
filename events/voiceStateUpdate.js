const { EmbedBuilder } = require("discord.js");
const config = require("../src/config");

module.exports = {
  name: "voiceStateUpdate",
  async execute(oldState, newState) {
    if (newState.guild.id !== config.guildId) return;
    const logChannel = newState.guild.channels.cache.get(config.logChannelId);
    if (!logChannel) return;

    const member = newState.member;
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;

    let embed;

    if (!oldChannel && newChannel) {
      embed = new EmbedBuilder()
        .setTitle("🔊 Ses Kanalına Girdi")
        .setDescription(`${member} **${newChannel.name}** kanalına katıldı.`)
        .setColor("Green");
    } else if (oldChannel && !newChannel) {
      embed = new EmbedBuilder()
        .setTitle("🔇 Ses Kanalından Ayrıldı")
        .setDescription(`${member} **${oldChannel.name}** kanalından ayrıldı.`)
        .setColor("Red");
    } else if (oldChannel && newChannel && oldChannel.id !== newChannel.id) {
      embed = new EmbedBuilder()
        .setTitle("🔄 Ses Kanalı Değiştirdi")
        .setDescription(`${member} **${oldChannel.name}** → **${newChannel.name}**`)
        .setColor("Orange");
    }

    if (oldState.deaf !== newState.deaf) {
      embed = new EmbedBuilder()
        .setTitle(newState.deaf ? "🔇 Sağırlaştırma" : "🔊 Sağırlaştırma Kaldırıldı")
        .setDescription(`${member} kullanıcısının sağırlaştırma durumu değişti.`)
        .setColor(newState.deaf ? "Purple" : "Green");
    } else if (oldState.mute !== newState.mute) {
      embed = new EmbedBuilder()
        .setTitle(newState.mute ? "🔕 Susturuldu" : "🔊 Susturma Kaldırıldı")
        .setDescription(`${member} kullanıcısının susturma durumu değişti.`)
        .setColor(newState.mute ? "Red" : "Green");
    }

    if (embed) {
      embed.setTimestamp();
      logChannel.send({ embeds: [embed] });
    }
  }
};
