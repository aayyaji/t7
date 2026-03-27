# 🕌 البوت الشيعي الإسلامي — Shia Islamic Telegram Bot

بوت تلغرام متخصص في الإجابة على الأسئلة الدينية الشيعية من المصادر الموثقة، مع إمكانية تنزيل الكتب الشيعية بصيغة PDF.

> **يعمل بتوكن التلغرام فقط — لا يحتاج أي مفتاح API آخر.**
> يستخدم خدمة [Pollinations.ai](https://pollinations.ai) المجانية بالكامل.

---

## ✨ المميزات

- 📖 إجابات دينية من المصادر الشيعية الموثقة (الكافي، بحار الأنوار، نهج البلاغة...)
- 📚 تنزيل أكثر من 30 كتاباً شيعياً بصيغة PDF مباشرةً في التلغرام
- 🤖 يعمل بذكاء اصطناعي مجاني (GPT-4o عبر Pollinations.ai)
- ⚡ سريع وموثوق، يعمل 24/7 على Railway
- 🔑 **متطلب وحيد:** توكن تلغرام فقط

---

## 🚀 خطوات النشر على Railway

### 1. المتطلبات

- حساب GitHub
- حساب Railway (مجاني): https://railway.app
- توكن بوت تلغرام من @BotFather

### 2. رفع المشروع على GitHub

```bash
git init
git add .
git commit -m "Initial commit: Shia Telegram Bot"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/shia-bot.git
git push -u origin main
```

### 3. النشر على Railway

1. اذهب إلى https://railway.app وسجّل دخولك
2. انقر **New Project** → **Deploy from GitHub repo**
3. اختر الـ repository الذي رفعته
4. اذهب إلى **Variables** وأضف متغيراً **واحداً فقط**:

| المتغير | القيمة |
|---------|--------|
| `TELEGRAM_BOT_TOKEN` | توكن البوت من @BotFather |

5. انقر **Deploy** — وانتهى! 🎉

---

## 📁 هيكل المشروع

```
shia-bot/
├── src/
│   ├── index.ts              ← نقطة البداية
│   ├── app.ts                ← إعداد Express
│   ├── lib/
│   │   └── logger.ts         ← نظام السجلات
│   ├── routes/
│   │   ├── index.ts          ← توجيه المسارات
│   │   └── health.ts         ← فحص صحة السيرفر
│   └── bot/
│       ├── telegramBot.ts    ← منطق البوت الرئيسي
│       ├── aiHandler.ts      ← الذكاء الاصطناعي المجاني
│       ├── systemPrompt.ts   ← الـ prompt الشيعي التفصيلي
│       ├── bookDatabase.ts   ← قاعدة بيانات الكتب
│       ├── bookDownloader.ts ← تنزيل وإرسال الكتب
│       └── conversationHistory.ts ← إدارة سجل المحادثات
├── build.mjs                 ← سكريبت البناء (esbuild)
├── tsconfig.json
├── package.json
├── Dockerfile
├── railway.json
└── .env.example
```

---

## 🛠️ التشغيل المحلي

```bash
# 1. تثبيت الحزم
npm install --legacy-peer-deps

# 2. إعداد ملف البيئة
cp .env.example .env
# عدّل .env وضع توكن التلغرام فقط

# 3. البناء والتشغيل
npm run dev
```

---

## 📚 الكتب المتاحة للتنزيل (30+ كتاباً)

| التصنيف | أمثلة |
|---------|-------|
| 📿 الأدعية والزيارات | مفاتيح الجنان، الصحيفة السجادية |
| 📜 الحديث والروايات | الكافي، الخصال، الأمالي، معاني الأخبار |
| 🕌 التاريخ والسيرة | الإرشاد، مقتل الحسين، الغارات، وقعة صفين |
| 💡 العقيدة والكلام | نهج الحق، أوائل المقالات، دلائل الإمامة |
| 📖 التفسير | مجمع البيان للطبرسي |

---

## ⚙️ متغيرات البيئة

| المتغير | مطلوب | الوصف |
|---------|-------|-------|
| `TELEGRAM_BOT_TOKEN` | ✅ | توكن البوت من @BotFather |
| `PORT` | ❌ | يُضبط تلقائياً في Railway |
| `LOG_LEVEL` | ❌ | مستوى السجلات (افتراضي: `info`) |
