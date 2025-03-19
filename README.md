# Hayal Dünyası Projesi

Bu proje, React ve TypeScript kullanılarak geliştirilmiş bir web uygulamasıdır.

## 🚀 Özellikler

- React 18 ve TypeScript ile modern web geliştirme
- MongoDB veritabanı entegrasyonu
- Local Storage desteği
- Responsive tasarım
- Modern UI/UX

## 🛠️ Teknolojiler

- React.js
- TypeScript
- MongoDB
- LocalForage
- Tailwind CSS
- React Router

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB
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

4. `.env` dosyasını oluşturun:

```bash
cp .env.example .env
```

5. Uygulamayı başlatın:

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
│   ├── services/      # Servis katmanı
│   ├── types/         # TypeScript tip tanımlamaları
│   └── utils/         # Yardımcı fonksiyonlar
├── public/            # Statik dosyalar
└── package.json       # Proje bağımlılıkları
```

## 🔒 Güvenlik

- Hassas bilgiler `.env` dosyasında saklanır
- `.env` dosyası GitHub'a yüklenmez
- Güvenlik önlemleri için `.env.example` dosyası örnek olarak sunulmuştur

## 📅 Geliştirme Aşaması

Proje şu anda geliştirme aşamasındadır. İlerleyen aşamalarda aşağıdaki özellikler eklenecektir:

- [ ] Kullanıcı kimlik doğrulama
- [ ] Veri senkronizasyonu
- [ ] API entegrasyonu
- [ ] Test yazımı

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
