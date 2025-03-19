import connectDB from "./db";

const testConnection = async () => {
  try {
    await connectDB();
    console.log("Veritabanı bağlantısı başarılı!");
  } catch (error) {
    console.error("Veritabanı bağlantı hatası:", error);
  }
};

testConnection();
