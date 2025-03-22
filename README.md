# Hayal Dünyası Projesi

Bu proje, React ve TypeScript kullanılarak geliştirilmiş bir web uygulamasıdır.

## 🚀 Özellikler

- React 18 ve TypeScript ile modern web geliştirme
- Firebase entegrasyonu (Authentication, Realtime Database, Storage)
- Local Storage desteği
- Responsive tasarım
- Modern UI/UX
- Gerçek zamanlı veri senkronizasyonu
- Güvenli kimlik doğrulama

## 🛠️ Teknolojiler

### Frontend

- React.js
- TypeScript
- Tailwind CSS
- React Router
- LocalForage

### Backend (Firebase)

- Firebase Authentication
- Firebase Realtime Database
- Firebase Storage
- Firebase Cloud Functions
- Firebase Analytics
- Firebase Cloud Messaging

### AI ve Veri İşleme

- TensorFlow.js
- Web Speech API

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- Firebase CLI
- npm veya yarn

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

4. Firebase CLI'ı yükleyin:

```bash
npm install -g firebase-tools
```

5. Firebase'e giriş yapın:

```bash
firebase login
```

6. Firebase projesini başlatın:

```bash
firebase init
```

7. `.env` dosyasını oluşturun:

```bash
cp .env.example .env
```

8. Uygulamayı başlatın:

```bash
npm start
```

## 🌐 Erişim

Uygulama varsayılan olarak http://localhost:3000 adresinde çalışır.

## 📝 Proje Yapısı

```
hayal-dunyasi/
├── src/
│   ├── components/     # React bileşenleri
│   ├── models/        # Veri modelleri
│   ├── services/      # Firebase servisleri
│   ├── types/         # TypeScript tip tanımlamaları
│   └── utils/         # Yardımcı fonksiyonlar
├── public/            # Statik dosyalar
├── functions/         # Firebase Cloud Functions
└── package.json       # Proje bağımlılıkları
```

## 🔒 Güvenlik

- Firebase Authentication ile güvenli kimlik doğrulama
- Firebase Security Rules ile veri güvenliği
- Hassas bilgiler `.env` dosyasında saklanır
- `.env` dosyası GitHub'a yüklenmez
- Güvenlik önlemleri için `.env.example` dosyası örnek olarak sunulmuştur

## 📅 Geliştirme Aşaması

Proje şu anda geliştirme aşamasındadır. İlerleyen aşamalarda aşağıdaki özellikler eklenecektir:

- [x] Firebase Authentication entegrasyonu
- [x] Firebase Realtime Database entegrasyonu
- [x] Firebase Storage entegrasyonu
- [ ] AI modeli entegrasyonu
- [ ] Test yazımı
- [ ] CI/CD pipeline kurulumu

## 🔄 Veri Senkronizasyonu

- Firebase Realtime Database ile gerçek zamanlı veri senkronizasyonu
- Offline çalışma desteği
- Otomatik veri yedekleme
- Çoklu cihaz senkronizasyonu

## 📊 Monitoring ve Analytics

- Firebase Analytics ile kullanıcı davranışları analizi
- Firebase Crashlytics ile hata takibi
- Firebase Performance Monitoring ile performans analizi

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
