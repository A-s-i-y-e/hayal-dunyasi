import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Story {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  content: string;
  date: string;
  genre: string;
  readingTime: string;
  coverImage: string;
}

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const stories: Story[] = [
    {
      id: 1,
      title: "Küçük Prens",
      author: "Antoine de Saint-Exupéry",
      image: "👑",
      description: "Küçük bir prensin uzay yolculuğu ve hayat dersleri...",
      content: `Bir zamanlar, çok uzak bir gezegende yaşayan küçük bir prens varmış. Gezegeni o kadar küçükmüş ki, sadece bir ev ve üç volkan sığabiliyormuş. Küçük Prens, her gün gezegenini temizler, volkanları kontrol eder ve gülüne bakar.

Bir gün, Küçük Prens gezegeninden ayrılmaya karar vermiş. Yolculuğuna başladığında, ilk olarak bir kralın gezegenine uğramış. Kral, kendisini tüm evrenin hükümdarı sanıyormuş. Küçük Prens, kralın aslında hiçbir şeyi yönetmediğini fark etmiş.

Sonra bir kendini beğenmiş adamın gezegenine gitmiş. Bu adam, sürekli kendisini övüyormuş ve başkalarının onu alkışlamasını bekliyormuş. Küçük Prens, bu davranışın anlamsız olduğunu düşünmüş.

Yolculuğu sırasında bir fenercinin gezegenine de uğramış. Fenerci, her dakika feneri yakıp söndürüyormuş çünkü gezegeni çok hızlı dönüyormuş. Küçük Prens, fenercinin sadakatini ve görevine olan bağlılığını takdir etmiş.

En sonunda Dünya'ya gelmiş. Burada bir tilkiyle tanışmış. Tilki ona çok önemli bir ders vermiş: "Gözler gerçeği göremez, yüreğinle bakmalısın." Bu söz, Küçük Prens'in hayatını değiştirmiş.

Küçük Prens, Dünya'da geçirdiği süre boyunca birçok şey öğrenmiş. İnsanların bazen çok tuhaf davrandığını, bazen de çok güzel şeyler yapabildiğini görmüş. En önemlisi, sevginin ne kadar değerli olduğunu anlamış.

Sonunda, Küçük Prens kendi gezegenine dönmeye karar vermiş. Çünkü orada, ona özel olan gülü varmış. Yolculuğu sırasında öğrendiği en önemli ders şuymuş: "Sevdiğin şeyi korumak için zaman harcamalısın, çünkü o senin için özeldir."`,
      date: "2024-03-20",
      genre: "Fantastik",
      readingTime: "45 dakika",
      coverImage:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      title: "Alice Harikalar Diyarında",
      author: "Lewis Carroll",
      image: "🐰",
      description: "Alice'in tavşan deliğinden geçerek başlayan macerası...",
      content: `Alice, bahçede otururken beyaz bir tavşan gördü. Tavşan, cebinden bir saat çıkarıp "Geç kaldım, geç kaldım!" diye bağırıyordu. Alice, bu tuhaf tavşanı takip etmeye karar verdi.

Tavşan bir deliğe girdi ve Alice de peşinden atladı. Delik, Alice'i Harikalar Diyarı'na götürdü. Burada her şey çok tuhaf ve büyüleyiciydi. Alice, bir şişeden içti ve küçüldü, bir kek yedi ve büyüdü.

Yolculuğu sırasında birçok ilginç karakterle tanıştı. Cheshire Kedisi, sürekli gülümsüyor ve kayboluyordu. Mart Tavşanı ve Şapkacı, sonsuz bir çay partisi düzenliyorlardı. Tırtıl, bir mantarın üzerinde oturup nargile içiyordu.

Alice, Kupa Kraliçesi'nin sarayına da gitti. Burada, kraliçe herkesin kafasını kesmek istiyordu. Alice, kraliçenin oyunlarında yer aldı ve birçok zorluğu aştı.

En sonunda, Alice bir kart oyununa katıldı. Oyun sırasında, tüm kartlar havada uçuşmaya başladı. Alice uyandığında, kız kardeşinin kucağında olduğunu fark etti. Tüm bu macera bir rüyaymış.

Alice, bu maceradan çok şey öğrendi. En önemlisi, bazen mantıklı olmak yerine hayal gücünü kullanmanın daha iyi olduğunu anladı.`,
      date: "2024-03-19",
      genre: "Macera",
      readingTime: "1 saat",
      coverImage:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      title: "Pinokyo",
      author: "Carlo Collodi",
      image: "🤥",
      description:
        "Tahtadan yapılmış bir kuklanın gerçek bir çocuk olma hikayesi...",
      content: `Gepetto Usta, bir gün odun parçasından bir kukla yapmaya karar verdi. Kuklayı yaparken, odun parçasının konuştuğunu fark etti. Bu çok şaşırtıcıydı! Gepetto Usta, kuklaya Pinokyo adını verdi.

Pinokyo, Gepetto Usta'nın evinde yaşamaya başladı. Ama çok yaramaz ve söz dinlemezdi. Bir gün okula gitmek yerine, bir kukla tiyatrosuna gitti. Burada, kötü kalpli bir adam tarafından yakalandı.

Pinokyo, birçok macera yaşadı. Bir gün burnu uzadı çünkü yalan söylemişti. Başka bir gün, eşek kuyruğu çıktı çünkü çok tembeldi. Her seferinde, Mavi Peri onu kurtardı ve ona doğru yolu gösterdi.

En büyük macerası, bir balinanın karnında geçti. Gepetto Usta, Pinokyo'yu aramaya çıkmış ve balina tarafından yutulmuştu. Pinokyo, balinanın karnına girdi ve Gepetto Usta'yı kurtardı.

Bu maceralardan sonra, Pinokyo çok değişti. Artık yalan söylemiyor, tembellik etmiyor ve her zaman doğruyu yapıyordu. Mavi Peri, onun bu değişimini gördü ve onu gerçek bir çocuğa dönüştürdü.

Pinokyo, artık gerçek bir çocuktu ve Gepetto Usta ile mutlu bir şekilde yaşamaya başladı. Bu hikaye bize, doğru davranışların ve iyi niyetin her zaman ödüllendirileceğini öğretir.`,
      date: "2024-03-18",
      genre: "Masal",
      readingTime: "30 dakika",
      coverImage:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-6">
            Favori Hikayelerim
          </h1>
          <p className="text-2xl text-gray-600">
            En sevdiğin hikayeleri buradan okuyabilirsin!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            >
              <div className="relative h-48">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                    {story.genre}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {story.title}
                </h2>
                <p className="text-gray-600 mb-4">{story.author}</p>

                <div className="flex items-center text-gray-500 mb-4">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{story.readingTime}</span>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">
                  {story.description}
                </p>

                <button
                  onClick={() => handleStoryClick(story)}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center group-hover:scale-105"
                >
                  <span>Oku</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedStory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">
                    {selectedStory.title}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {selectedStory.author}
                  </p>
                </div>
                <button
                  onClick={handleCloseStory}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-8">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                  <img
                    src={selectedStory.coverImage}
                    alt={selectedStory.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                      {selectedStory.genre}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-500 mb-4">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{selectedStory.readingTime}</span>
                </div>

                <p className="text-lg text-gray-600 mb-6">
                  {selectedStory.description}
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {selectedStory.content}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
