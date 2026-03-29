import React, { useState } from "react";
import { migrateToStorage } from "../services/storageMigration";

const MigrationTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  const handleMigration = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setProgress([]);

    try {
      // Console.log'ları yakala
      const originalConsoleLog = console.log;
      const originalConsoleError = console.error;

      console.log = (...args) => {
        originalConsoleLog.apply(console, args);
        setProgress((prev) => [...prev, args.join(" ")]);
      };

      console.error = (...args) => {
        originalConsoleError.apply(console, args);
        setError(args.join(" "));
      };

      await migrateToStorage();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Storage Migration
          </h1>

          <div className="space-y-4">
            <button
              onClick={handleMigration}
              disabled={isLoading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${
                  isLoading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
              {isLoading ? "Migration Yapılıyor..." : "Migration Başlat"}
            </button>

            {progress.length > 0 && (
              <div className="mt-4 space-y-2">
                {progress.map((message, index) => (
                  <div
                    key={index}
                    className="p-2 bg-blue-50 text-blue-700 rounded"
                  >
                    {message}
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 p-4 bg-green-50 text-green-700 rounded">
                Migration başarıyla tamamlandı!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MigrationTest;
