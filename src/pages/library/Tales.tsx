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

const Tales: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const stories: Story[] = [
    {
      id: 1,
      title: "Kırmızı Başlıklı Kız",
      author: "Grimm Kardeşler",
      image: "👧",
      description: "Kırmızı başlıklı kızın ormanda yaşadığı macera...",
      content: `Bir zamanlar, küçük bir köyde yaşayan Kırmızı Başlıklı Kız adında bir kız varmış. Bir gün annesi ona, hasta olan büyükannesine yemek götürmesini söylemiş.

Kırmızı Başlıklı Kız, ormandan geçerek büyükannesinin evine doğru yola çıkmış. Yolda bir kurtla karşılaşmış. Kurt, kıza nereye gittiğini sormuş ve kız da büyükannesine gittiğini söylemiş.

Kurt, Kırmızı Başlıklı Kız'dan önce büyükannenin evine varmış ve büyükannesi yerine geçmiş. Kız eve geldiğinde, kurdun büyükannesini yuttuğunu fark etmiş.

Neyse ki, ormanda avlanan bir avcı, büyükannenin evinden gelen sesleri duymuş ve içeri girmiş. Avcı, kurdu öldürmüş ve büyükannesi ile Kırmızı Başlıklı Kız'ı kurtarmış.

Bu masal bize, yabancılarla konuşmamanın ve büyüklerimizin sözlerini dinlemenin ne kadar önemli olduğunu öğretir.`,
      date: "2024-03-20",
      genre: "Masal",
      readingTime: "15 dakika",
      coverImage:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      title: "Pamuk Prenses",
      author: "Grimm Kardeşler",
      image: "👸",
      description: "Pamuk Prenses'in kötü üvey anneden kaçış hikayesi...",
      content: `Bir zamanlar, Pamuk Prenses adında güzel bir prenses varmış. Üvey annesi, Pamuk Prenses'in kendisinden daha güzel olduğunu öğrenince çok kızmış.

Üvey anne, bir avcıya Pamuk Prenses'i öldürmesini emretmiş. Ama avcı, Pamuk Prenses'e acımış ve onu ormanda bırakmış.

Pamuk Prenses, ormanda yedi cücelerin evini bulmuş. Cüceler, Pamuk Prenses'i evlerinde yaşamaya davet etmişler.

Üvey anne, Pamuk Prenses'in hala yaşadığını öğrenince, zehirli bir elma ile onu öldürmeye çalışmış. Pamuk Prenses, zehirli elmayı yemiş ve uykuya dalmış.

Bir prens, Pamuk Prenses'i görünce ona aşık olmuş ve onu öpmüş. Bu öpücük, Pamuk Prenses'i uyandırmış ve mutlu sona ulaşmışlar.`,
      date: "2024-03-19",
      genre: "Masal",
      readingTime: "20 dakika",
      coverImage:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      title: "Hansel ve Gretel",
      author: "Grimm Kardeşler",
      image: "🍬",
      description: "İki kardeşin şeker evde yaşadığı macera...",
      content: `Hansel ve Gretel, fakir bir ailenin çocuklarıymış. Bir gün, üvey anneleri onları ormanda bırakmaya karar vermiş.

Çocuklar, ormanda kaybolmuş ve şekerden yapılmış bir ev bulmuşlar. Evde yaşlı bir kadın varmış. Kadın, çocukları içeri davet etmiş.

Ama kadın aslında bir cadıymış ve çocukları yemek istiyormuş. Cadı, Hansel'i bir kafese kapatmış ve Gretel'i de çalıştırmaya başlamış.

Gretel, cadıyı kandırarak fırına itmiş ve kardeşini kurtarmış. Çocuklar, cadının hazinesini alarak evlerine dönmüşler.

Bu masal bize, zor durumlarda akıllı olmanın ve kardeş sevgisinin önemini öğretir.`,
      date: "2024-03-18",
      genre: "Masal",
      readingTime: "25 dakika",
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
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
            Masallar
          </h1>
          <p className="text-2xl text-gray-600">
            Klasik masalları keşfet ve oku!
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
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center group-hover:scale-105"
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

export default Tales;
