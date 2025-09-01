import Bottleneck from 'bottleneck';

export const limiter = new Bottleneck({
  maxConcurrent: 3,              // Hanya jalankan 1 request bersamaan
  minTime: 1100,                 // ~3 request per detik (1000ms / 3 ≈ 333ms)
  reservoir: 60,                 // Maksimal 60 request dalam 1 menit
  reservoirRefreshAmount: 60,    // Isi ulang hingga 60 request
  reservoirRefreshInterval: 60 * 1000, // Setiap 60 detik (1 menit)
});

// Debug limiter
limiter.on("error", (error) => console.error("Limiter error:", error));
limiter.on("depleted", () => console.warn("Rate limit tercapai, menunggu..."));