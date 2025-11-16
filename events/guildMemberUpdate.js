module.exports = (client, oldMember, newMember) => {
    if (oldMember.guild.id !== "") return; 
    
    const logChannel = getLogChannel(newMember.guild); 
  
    
    if (oldMember.nickname !== newMember.nickname) {
      const embed = new EmbedBuilder()
        .setTitle("👤 Kullanıcı Takma Adı Güncellendi")
        .setDescription(`${newMember.user.tag} kullanıcı adı **${oldMember.nickname || oldMember.user.username}** → **${newMember.nickname || newMember.user.username}** olarak güncellendi.`)
        .setColor("Orange")
        .setTimestamp();
  
      logChannel.send({ embeds: [embed] });
    }
  };
  