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
│   │   ├── Navbar.tsx  # Navigasyon menüsü
│   │   └── ProfilePicture.tsx  # Profil resmi yükleme bileşeni
│   ├── pages/         # Sayfa bileşenleri
│   │   ├── Home.tsx   # Ana sayfa
│   │   ├── Login.tsx  # Giriş sayfası
│   │   ├── Register.tsx # Kayıt sayfası
│   │   ├── Library.tsx # Masal kütüphanesi
│   │   ├── Profile.tsx # Profil sayfası
│   │   └── DrawingWorkshop.tsx # Çizim atölyesi
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

## 📅 Proje İlerleme Durumu

### ✅ Tamamlanan Haftalar (1-5)

1. Hafta: Proje Başlangıcı ve Planlama

   - Proje gereksinimleri analizi
   - Temel dosya ve klasör yapısı oluşturuldu

2. Hafta: Geliştirme Ortamı

   - Gerekli araçların kurulumu (React, Tailwind CSS, Firebase)
   - Basit web sayfası oluşturuldu

3. Hafta: Veritabanı Kurulumu-Temel Sayfalar

   - Firebase veritabanı ve depolama sistemi kurulumu
   - Web sitesinin temel sayfaları oluşturuldu
   - Navigasyon sistemi kuruldu

4. Hafta: Kullanıcı Sistemi

   - Kullanıcı kayıt/giriş sistemi
   - Firebase Authentication entegrasyonu
   - Kullanıcı profili yönetimi

5. Hafta: Çizim Sistemi - Temel
   - Temel çizim özellikleri eklendi
   - Canvas entegrasyonu yapıldı
   - Renk paleti ve temel araçlar eklendi
   - Şekil seçenekleri ve diğer araç ayarları eklendi

### 🔄 Devam Eden Haftalar (6)

1. Hafta: Çizim Sistemi - Gelişmiş

### ⏳ Bekleyen Haftalar (7-14)

1. Hafta: Hikaye Oluşturma - Temel
2. Hafta: Hikaye Oluşturma - Gelişmiş
3. Hafta: Ses Özellikleri
4. Hafta: Yapay Zeka - Temel
5. Hafta: Ebeveyn Paneli
6. Hafta: Temel Testler
7. Hafta: Optimizasyon
8. Hafta: Son Kontroller ve Yayın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
