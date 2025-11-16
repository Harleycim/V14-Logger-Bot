// harley.js
const { Client, GatewayIntentBits, Partials, EmbedBuilder, ActivityType } = require("discord.js");
const logs = require("discord-logs");
const fs = require("fs");
const path = require("path");
const config = require("./src/config");


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});



logs(client);



module.exports = (client) => {
  client.on("voiceStateUpdate", (oldState, newState) => {
    
    console.log(`${oldState.member.user.tag} ses kanalını değiştirdi.`);
  });
};

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));
  if (event.name) {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

function getLogChannel(guild) {
  if (guild.id !== config.guildId) return null;
  return guild.channels.cache.get(config.logChannelId);
}

client.once("ready", () => {
  console.log(`${client.user.tag} olarak giriş yapıldı.`);
  client.user.setPresence({
    activities: [{ name: config.status.text, type: ActivityType[config.status.type] }],
    status: config.status.presence,
  });
});

client.on("messageDelete", async (message) => {
  if (!message.guild || message.author?.bot || message.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(message.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("🗑️ Mesaj Silindi")
    .setDescription(`**${message.author.tag}** tarafından gönderilen mesaj silindi.`)
    .addFields({ name: "İçerik", value: message.content || "*boş mesaj*" })
    .setColor("Red")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (!newMsg.guild || oldMsg.author?.bot || oldMsg.content === newMsg.content || newMsg.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(newMsg.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("✏️ Mesaj Düzenlendi")
    .setDescription(`**${newMsg.author.tag}** mesajını düzenledi.`)
    .addFields(
      { name: "Önce", value: oldMsg.content || "*boş*" },
      { name: "Sonra", value: newMsg.content || "*boş*" }
    )
    .setColor("Yellow")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("guildMemberAdd", (member) => {
  if (member.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(member.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("👤 Kullanıcı Katıldı")
    .setDescription(`${member.user.tag} sunucuya katıldı.`)
    .setColor("Green")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("guildMemberRemove", (member) => {
  if (member.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(member.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("🚪 Kullanıcı Ayrıldı")
    .setDescription(`${member.user.tag} sunucudan ayrıldı.`)
    .setColor("Red")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("voiceStateUpdate", (oldState, newState) => {
  if (newState.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(newState.guild);
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
      .setDescription(`${member} kullanıcısının sesli sohbette sağırlaştırma durumu değişti.`)
      .setColor(newState.deaf ? "Purple" : "Green");
  } else if (oldState.mute !== newState.mute) {
    embed = new EmbedBuilder()
      .setTitle(newState.mute ? "🔕 Susturuldu" : "🔊 Susturma Kaldırıldı")
      .setDescription(`${member} kullanıcısının sesli sohbette susturma durumu değişti.`)
      .setColor(newState.mute ? "Red" : "Green");
  }

  if (embed) {
    embed.setTimestamp();
    logChannel.send({ embeds: [embed] });
  }
});

client.on("channelCreate", (channel) => {
  if (channel.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(channel.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("📁 Kanal Oluşturuldu")
    .setDescription(`Yeni kanal: **${channel.name}**`)
    .setColor("Green")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("channelDelete", (channel) => {
  if (channel.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(channel.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("🗑️ Kanal Silindi")
    .setDescription(`Silinen kanal: **${channel.name}**`)
    .setColor("Red")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("roleCreate", (role) => {
  if (role.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(role.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("🎭 Rol Oluşturuldu")
    .setDescription(`Yeni rol: **${role.name}**`)
    .setColor("Blue")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("roleDelete", (role) => {
  if (role.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(role.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("🗑️ Rol Silindi")
    .setDescription(`Silinen rol: **${role.name}**`)
    .setColor("Red")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("emojiCreate", (emoji) => {
  if (emoji.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(emoji.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("😄 Emoji Oluşturuldu")
    .setDescription(`Yeni emoji: **${emoji.name}**`)
    .setColor("Yellow")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("emojiDelete", (emoji) => {
  if (emoji.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(emoji.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("❌ Emoji Silindi")
    .setDescription(`Silinen emoji: **${emoji.name}**`)
    .setColor("Red")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("guildMemberRoleAdd", (member, role) => {
  if (member.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(member.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("➕ Rol Verildi")
    .setDescription(`${member.user.tag} kullanıcısına **${role.name}** rolü verildi.`)
    .setColor("Blue")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("guildMemberRoleRemove", (member, role) => {
  if (member.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(member.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("➖ Rol Alındı")
    .setDescription(`${member.user.tag} kullanıcısından **${role.name}** rolü alındı.`)
    .setColor("Orange")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("guildMemberTimeoutAdd", (member, duration, executor) => {
  if (member.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(member.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("⏳ Timeout Verildi")
    .setDescription(`${member.user.tag} kullanıcısı ${duration / 60000} dakika susturuldu.`)
    .addFields(
      { name: "Susturan", value: executor ? executor.tag : "*Bilinmiyor*" }
    )
    .setColor("Purple")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("guildBanAdd", (ban) => {
  if (ban.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(ban.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("⛔ Kullanıcı Banlandı")
    .setDescription(`${ban.user.tag} sunucudan banlandı.`)
    .addFields(
      { name: "Banlayan", value: ban.executor ? ban.executor.tag : "*Bilinmiyor*" }
    )
    .setColor("DarkRed")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.on("guildBanRemove", (ban) => {
  if (ban.guild.id !== config.guildId) return;
  const logChannel = getLogChannel(ban.guild);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("✅ Ban Kaldırıldı")
    .setDescription(`${ban.user.tag} kullanıcısının banı kaldırıldı.`)
    .addFields(
      { name: "Banı Kaldıran", value: ban.executor ? ban.executor.tag : "*Bilinmiyor*" }
    )
    .setColor("Green")
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
});

client.login(config.token);
