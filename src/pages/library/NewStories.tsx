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

const NewStories: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const stories: Story[] = [
    {
      id: 1,
      title: "Uzaylı Dostum",
      author: "Ayşe Yılmaz",
      image: "👽",
      description: "Bir çocuğun uzaylı bir arkadaşla yaşadığı macera...",
      content: `Ali, bir gece yarısı bahçesinde parlak bir ışık gördü. Işığa doğru yaklaştığında, küçük bir uzay gemisi ve içinden çıkan sevimli bir uzaylı ile karşılaştı.

Uzaylının adı Zog'du ve gezegeninden kaçmıştı. Ali, Zog'u evine götürdü ve ona Dünya'yı tanıtmaya başladı. Zog, Dünya'daki her şeye hayran kalmıştı.

Birlikte birçok macera yaşadılar. Parkta oynadılar, dondurma yediler ve hatta okula bile gittiler. Zog, insanların yaşam tarzını öğreniyordu.

Bir gün, Zog'un ailesi onu buldu. Zog, gezegenine dönmek zorundaydı. Ayrılmadan önce Ali'ye özel bir hediye verdi: uzaylıların kullandığı bir iletişim cihazı.

Artık Ali ve Zog, farklı gezegenlerde olsalar bile birbirleriyle konuşabiliyorlardı. Bu hikaye, farklılıkların dostluğa engel olmadığını gösterir.`,
      date: "2024-03-20",
      genre: "Bilim Kurgu",
      readingTime: "20 dakika",
      coverImage:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      title: "Sihirli Kalem",
      author: "Mehmet Kaya",
      image: "✏️",
      description: "Çizdikleri gerçek olan bir kalemin hikayesi...",
      content: `Zeynep, bir gün eski bir dükkanda sihirli bir kalem buldu. Kalem, çizdiği her şeyi gerçeğe dönüştürüyordu. İlk başta çok heyecanlandı ve birçok şey çizdi.

Bir köpek çizdi ve hemen gerçek bir köpek oldu. Bir bisiklet çizdi ve anında gerçek bir bisikleti oldu. Ama sonra kalemin gücünün tehlikeli olabileceğini fark etti.

Bir gün, kızgınlıkla büyük bir canavar çizdi. Canavar gerçek oldu ve şehri tehdit etmeye başladı. Zeynep, yaptığı hatayı anladı ve canavarı durdurmak için bir plan yaptı.

Sonunda, canavarı yok etmeyi başardı ve kalemi kullanmayı bıraktı. Bu hikaye, gücün sorumluluğuyla birlikte geldiğini öğretir.`,
      date: "2024-03-19",
      genre: "Fantastik",
      readingTime: "25 dakika",
      coverImage:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      title: "Zaman Yolcusu",
      author: "Deniz Akın",
      image: "⏰",
      description: "Geçmişe yolculuk yapan bir çocuğun hikayesi...",
      content: `Can, dedesinin eski saatini bulduğunda, bunun sıradan bir saat olmadığını anladı. Saat, onu geçmişe götürüyordu! İlk yolculuğunda, dedesinin çocukluğuna gitti.

Geçmişte, dedesiyle tanıştı ve birlikte birçok macera yaşadılar. Dedesi ona, eski zamanların nasıl olduğunu anlattı. Can, teknolojinin olmadığı bir dünyada yaşamanın zorluklarını gördü.

Bir gün, saati yanlışlıkla geleceğe ayarladı. Gelecekte, dünyanın çok farklı olduğunu gördü. İnsanlar uzayda yaşıyordu ve teknoloji inanılmaz derecede gelişmişti.

Can, bu deneyimlerden sonra kendi zamanına döndüğünde, hayata bakış açısı değişmişti. Artık geçmişi daha iyi anlıyor ve gelecek için umut doluydu.`,
      date: "2024-03-18",
      genre: "Macera",
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
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-6">
            Yeni Hikayeler
          </h1>
          <p className="text-2xl text-gray-600">
            Yeni eklenen hikayeleri keşfet!
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
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
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
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center group-hover:scale-105"
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
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
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

export default NewStories;
