# Hayal Dünyası Projesi

Çocuklar için eğlenceli ve güvenli bir dijital platform. Çizim yapma, hikaye oluşturma ve eğitici oyunlar ile çocukların yaratıcılığını destekleyen bir web uygulaması.

## 🚀 Özellikler

- Uzay temalı modern arayüz tasarımı
- Güvenli kullanıcı kimlik doğrulama sistemi
- Çizim yapma ve kaydetme
- Hikaye oluşturma ve paylaşma
- Ebeveyn kontrol paneli
- Gerçek zamanlı veri senkronizasyonu
- Responsive tasarım

## 🛠️ Teknolojiler

- React 18
- TypeScript
- Firebase
  - Authentication
  - Firestore Database
  - Storage
  - Analytics
- Tailwind CSS
- React Router

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Firebase hesabı

## 🔧 Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/A-s-i-y-e/hayal-dunyasi.git
```

2. Proje dizinine gidin:

```bash
cd hayal-dunyasi
```

3. Bağımlılıkları yükleyin:

```bash
npm install
```

4. `.env` dosyasını oluşturun:

```bash
cp .env.example .env
```

5. `.env` dosyasını Firebase yapılandırma bilgilerinizle güncelleyin:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

6. Uygulamayı başlatın:

```bash
npm start
```

## 🌐 Erişim

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır.

## 📝 Proje Yapısı

```
hayal-dunyasi/
├── src/
│   ├── components/     # React bileşenleri
│   │   └── ProfilePicture.tsx  # Profil resmi yükleme bileşeni
│   ├── pages/         # Sayfa bileşenleri
│   │   ├── Home.tsx   # Ana sayfa
│   │   ├── Login.tsx  # Giriş sayfası
│   │   └── Register.tsx # Kayıt sayfası
│   ├── services/      # Servis katmanı
│   │   └── firebase.ts # Firebase servisleri
│   └── styles/        # Stil dosyaları
│       └── index.css  # Ana stil dosyası
├── public/           # Statik dosyalar
└── package.json      # Proje bağımlılıkları
```

## 🔒 Güvenlik

- Hassas bilgiler `.env` dosyasında saklanır
- Firebase Authentication ile güvenli kullanıcı yönetimi
- Firestore kuralları ile veri güvenliği
- Storage kuralları ile dosya güvenliği

## 🎯 Tamamlanan Özellikler

- ✅ Firebase Authentication entegrasyonu
- ✅ Firestore Database entegrasyonu
- ✅ Firebase Storage entegrasyonu
- ✅ Profil resmi yükleme sistemi
- ✅ Çizim ve hikaye görselleri için storage servisleri
- ✅ Modern UI/UX tasarımı ve animasyonlar

## 📅 Gelecek Özellikler

- 🔄 Çizim sistemi
- 🔄 Hikaye oluşturma
- 🔄 Ses kayıt sistemi
- 🔄 Ebeveyn kontrol paneli
- 🔄 Mobil uygulama

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
