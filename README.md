# Discord.js v14 Logger Bot

Discord sunucunuzda gerçekleşen tüm önemli olayları loglayan kapsamlı bir Discord botu.

## 🚀 Özellikler

Bu bot aşağıdaki olayları loglar:

### 📝 Mesaj Logları
- ✅ Mesaj silindi
- ✅ Mesaj düzenlendi

### 👥 Kullanıcı Logları
- ✅ Kullanıcı katıldı
- ✅ Kullanıcı ayrıldı
- ✅ Kullanıcı takma adı güncellendi

### 🎭 Rol Logları
- ✅ Rol verildi
- ✅ Rol alındı
- ✅ Rol oluşturuldu
- ✅ Rol silindi
- ✅ Rol güncellendi

### 📁 Kanal Logları
- ✅ Kanal oluşturuldu
- ✅ Kanal silindi
- ✅ Kanal güncellendi

### 🔊 Ses Kanalı Logları
- ✅ Ses kanalına girdi
- ✅ Ses kanalından ayrıldı
- ✅ Ses kanalı değiştirdi
- ✅ Sağırlaştırma/Sağırlaştırma kaldırıldı
- ✅ Susturuldu/Susturma kaldırıldı

### 😄 Emoji Logları
- ✅ Emoji oluşturuldu
- ✅ Emoji silindi

### 🏠 Sunucu Logları
- ✅ Sunucu bilgisi güncellendi (ad, simge, banner, açıklama)

### 🛡️ Moderasyon Logları
- ✅ Timeout verildi
- ✅ Kullanıcı banlandı
- ✅ Ban kaldırıldı

**Toplam: 26 farklı log türü!**

## 📋 Gereksinimler

- Node.js v16.9.0 veya üzeri
- Discord.js v14
- discord-logs paketi

## 🔧 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/kullaniciadi/v14-logger-bot.git
cd v14-logger-bot
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `src/config.example.js` dosyasını `src/config.js` olarak kopyalayın ve düzenleyin:
   - **Windows:** `copy src\config.example.js src\config.js`
   - **Linux/Mac:** `cp src/config.example.js src/config.js`

Ardından `src/config.js` dosyasını düzenleyin:
```javascript
module.exports = {
    token: "BOT_TOKENINIZ",
    logChannelId: "LOG_KANAL_ID",
    ownerId: "SAHİP_ID",     
    guildId: "SUNUCU_ID",              
    status: {
      text: "Harleywashere?",
      type: "Playing",  
      presence: "invisible",  
    },
};
```

4. Botu başlatın:
```bash
npm start
```

veya

```bash
node harley.js
```

## ⚙️ Yapılandırma

### Bot Token
Discord Developer Portal'dan bot token'ınızı alın ve `config.js` dosyasına ekleyin.

### Log Kanalı
Logların gönderileceği kanalın ID'sini `logChannelId` alanına ekleyin.

### Sunucu ID
Botun çalışacağı sunucunun ID'sini `guildId` alanına ekleyin.

### Bot İzinleri
Botun aşağıdaki izinlere sahip olması gerekir:
- Mesajları okuma
- Mesaj geçmişini görüntüleme
- Embed linkler gönderme
- Kanal ve mesaj loglarını görüntüleme

## 📁 Proje Yapısı

```
v14-logger-bot/
├── events/              # Event handler dosyaları
│   ├── channelUpdate.js
│   ├── guildMemberAdd.js
│   ├── guildMemberRemove.js
│   ├── guildMemberUpdate.js
│   ├── guildUpdate.js
│   ├── messageDelete.js
│   ├── messageUpdate.js
│   ├── roleUpdate.js
│   └── voiceStateUpdate.js
├── src/
│   ├── config.js        # Yapılandırma dosyası (oluşturmanız gerekiyor)
│   └── config.example.js # Örnek yapılandırma dosyası
├── harley.js            # Ana bot dosyası
├── package.json
└── README.md
```

## 🎨 Özelleştirme

### Durum Mesajı
`config.js` dosyasındaki `status` objesini düzenleyerek botun durum mesajını değiştirebilirsiniz.

### Log Renkleri
Her log türü için farklı renkler kullanılmaktadır. `harley.js` ve `events/` klasöründeki dosyalarda `setColor()` metodunu düzenleyerek renkleri değiştirebilirsiniz.

## 📝 Lisans

ISC

## 👤 Yazar

Harleywashere

## ⚠️ Uyarı

- Bot token'ınızı asla paylaşmayın!
- `src/config.js` dosyasını `.gitignore`'a eklediğinizden emin olun.
- Production ortamında environment variables kullanmanız önerilir.

