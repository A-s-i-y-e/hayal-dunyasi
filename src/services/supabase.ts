import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Çizim kaydetme fonksiyonu
export const saveDrawing = async (drawingData: Blob, userId: string) => {
  try {
    // Storage'a yükle
    const fileName = `${userId}/${Date.now()}.png`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from("drawings")
      .upload(fileName, drawingData);

    if (storageError) throw storageError;

    // Veritabanına kaydet
    const { data, error } = await supabase.from("drawings").insert([
      {
        user_id: userId,
        image_path: fileName,
        created_at: new Date(),
      },
    ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Çizim kaydetme hatası:", error);
    throw error;
  }
};

// Çizim getirme fonksiyonu
export const getDrawing = async (drawingId: string) => {
  try {
    // Veritabanından bilgileri al
    const { data, error } = await supabase
      .from("drawings")
      .select("image_path")
      .eq("id", drawingId)
      .single();

    if (error) throw error;

    // Storage'dan çizimi indir
    const { data: blob, error: downloadError } = await supabase.storage
      .from("drawings")
      .download(data.image_path);

    if (downloadError) throw downloadError;

    return blob;
  } catch (error) {
    console.error("Çizim getirme hatası:", error);
    throw error;
  }
};

// Kullanıcının çizimlerini getirme
export const getUserDrawings = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("drawings")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Kullanıcı çizimlerini getirme hatası:", error);
    throw error;
  }
};
