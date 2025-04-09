import React, { useState } from "react";
import { auth } from "../services/firebase";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("genel");
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    help: false,
    about: false,
    parentControl: false,
    privacy: false,
  });
  const user = auth.currentUser;

  const stats = {
    okunanHikaye: 42,
    yazilanHikaye: 5,
    kazanilanRozet: 8,
    toplamPuan: 1250,
  };

  const achievements = [
    { id: 1, name: "İlk Hikaye", icon: "📚", date: "2024-03-15" },
    { id: 2, name: "Hikaye Ustası", icon: "🏆", date: "2024-03-20" },
    { id: 3, name: "Yaratıcı Yazar", icon: "✍️", date: "2024-03-25" },
    { id: 4, name: "Okuma Şampiyonu", icon: "📖", date: "2024-04-01" },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Profil Başlığı */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-6xl">
                {user?.displayName?.[0] || "👤"}
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all">
                ✏️
              </button>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {user?.displayName || "Misafir Kullanıcı"}
              </h1>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              <div className="flex gap-4">
                <button className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors">
                  Profili Düzenle
                </button>
                <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors">
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-2xl font-bold text-gray-800">
              {stats.okunanHikaye}
            </div>
            <div className="text-gray-600">Okunan Hikaye</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-4xl mb-2">✍️</div>
            <div className="text-2xl font-bold text-gray-800">
              {stats.yazilanHikaye}
            </div>
            <div className="text-gray-600">Yazılan Hikaye</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-gray-800">
              {stats.kazanilanRozet}
            </div>
            <div className="text-gray-600">Kazanılan Rozet</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-gray-800">
              {stats.toplamPuan}
            </div>
            <div className="text-gray-600">Toplam Puan</div>
          </div>
        </div>

        {/* Başarılar */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Başarılar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-gray-50 rounded-xl p-4 text-center"
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <div className="font-medium text-gray-800">
                  {achievement.name}
                </div>
                <div className="text-sm text-gray-500">{achievement.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ayarlar */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ayarlar</h2>
          <div className="space-y-4">
            {/* Yardım ve Destek */}
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection("help")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">💬</div>
                  <div>
                    <div className="font-medium text-gray-800">
                      Yardım ve Destek
                    </div>
                    <div className="text-sm text-gray-500">
                      Sorularınız için bize ulaşın
                    </div>
                  </div>
                </div>
                <div
                  className={`transform transition-transform ${
                    expandedSections.help ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </div>
              </button>
              {expandedSections.help && (
                <div className="p-4 border-t border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Sık Sorulan Sorular
                      </h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-white rounded-lg">
                          <div className="font-medium text-gray-800">
                            Nasıl hikaye yazabilirim?
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Hikaye yazmak için "Hikayeni Yaz" bölümüne gidin ve
                            yeni hikaye oluştur butonuna tıklayın.
                          </p>
                        </div>
                        <div className="p-3 bg-white rounded-lg">
                          <div className="font-medium text-gray-800">
                            Hikayelerimi nasıl düzenleyebilirim?
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Profil sayfanızdan "Hikayelerim" bölümüne giderek
                            hikayelerinizi düzenleyebilirsiniz.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        İletişim
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-white rounded-lg">
                          <span className="text-2xl mr-3">📧</span>
                          <div>
                            <div className="font-medium text-gray-800">
                              E-posta
                            </div>
                            <div className="text-sm text-gray-600">
                              destek@hayaldunyasi.com
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-white rounded-lg">
                          <span className="text-2xl mr-3">📞</span>
                          <div>
                            <div className="font-medium text-gray-800">
                              Telefon
                            </div>
                            <div className="text-sm text-gray-600">
                              0850 123 45 67
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors">
                      Canlı Destek Başlat
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Hakkında */}
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection("about")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">ℹ️</div>
                  <div>
                    <div className="font-medium text-gray-800">Hakkında</div>
                    <div className="text-sm text-gray-500">
                      Uygulama hakkında bilgiler
                    </div>
                  </div>
                </div>
                <div
                  className={`transform transition-transform ${
                    expandedSections.about ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </div>
              </button>
              {expandedSections.about && (
                <div className="p-4 border-t border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Uygulama Bilgileri
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-white rounded-lg">
                          <span className="text-gray-600">Versiyon</span>
                          <span className="font-medium">1.0.0</span>
                        </div>
                        <div className="flex justify-between p-3 bg-white rounded-lg">
                          <span className="text-gray-600">Son Güncelleme</span>
                          <span className="font-medium">2024-04-01</span>
                        </div>
                        <div className="flex justify-between p-3 bg-white rounded-lg">
                          <span className="text-gray-600">Geliştirici</span>
                          <span className="font-medium">
                            Hayal Dünyası Ekibi
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Lisans Bilgileri
                      </h4>
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-sm text-gray-600">
                          Hayal Dünyası uygulaması, çocukların hayal güçlerini
                          geliştirmek ve yaratıcılıklarını desteklemek amacıyla
                          geliştirilmiştir. Tüm hakları saklıdır.
                        </p>
                      </div>
                    </div>
                    <button className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors">
                      Gizlilik Politikasını Görüntüle
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Ebeveyn Kontrolü */}
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection("parentControl")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">👨‍👩‍👧‍👦</div>
                  <div>
                    <div className="font-medium text-gray-800">
                      Ebeveyn Kontrolü
                    </div>
                    <div className="text-sm text-gray-500">
                      Güvenlik ayarlarını yönetin
                    </div>
                  </div>
                </div>
                <div
                  className={`transform transition-transform ${
                    expandedSections.parentControl ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </div>
              </button>
              {expandedSections.parentControl && (
                <div className="p-4 border-t border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-700">
                          İçerik Filtreleme
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-500">
                        Yaşa uygun olmayan içerikleri filtrele
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-700">
                          Günlük Kullanım Süresi
                        </span>
                        <span className="text-purple-600 font-medium">
                          2 saat
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="4"
                        step="0.5"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0 saat</span>
                        <span>4 saat</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Güvenlik Ayarları
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <label className="ml-2 text-sm text-gray-600">
                            Şifre Koruması
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <label className="ml-2 text-sm text-gray-600">
                            Uygulama Kilidi
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <label className="ml-2 text-sm text-gray-600">
                            Aktivite Raporları
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Ebeveyn Bildirimleri
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <label className="ml-2 text-sm text-gray-600">
                            Günlük Kullanım Raporu
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <label className="ml-2 text-sm text-gray-600">
                            Yeni İçerik Uyarıları
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <label className="ml-2 text-sm text-gray-600">
                            Acil Durum Bildirimleri
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Gizlilik Ayarları */}
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection("privacy")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🔒</div>
                  <div>
                    <div className="font-medium text-gray-800">
                      Gizlilik Ayarları
                    </div>
                    <div className="text-sm text-gray-500">
                      Hesap güvenliğinizi yönetin
                    </div>
                  </div>
                </div>
                <div
                  className={`transform transition-transform ${
                    expandedSections.privacy ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </div>
              </button>
              {expandedSections.privacy && (
                <div className="p-4 border-t border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Hesap Güvenliği
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <div className="font-medium text-gray-800">
                              İki Faktörlü Doğrulama
                            </div>
                            <div className="text-sm text-gray-600">
                              Hesabınızı daha güvenli hale getirin
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <div className="font-medium text-gray-800">
                              Şifre Değiştir
                            </div>
                            <div className="text-sm text-gray-600">
                              Güvenli bir şifre oluşturun
                            </div>
                          </div>
                          <button className="text-purple-500 hover:text-purple-600">
                            Değiştir
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Veri Gizliliği
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <div className="font-medium text-gray-800">
                              Veri Toplama
                            </div>
                            <div className="text-sm text-gray-600">
                              Kullanım verilerinin toplanması
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <div className="font-medium text-gray-800">
                              Veri Paylaşımı
                            </div>
                            <div className="text-sm text-gray-600">
                              Üçüncü taraflarla veri paylaşımı
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors">
                      Hesabı Sil
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
