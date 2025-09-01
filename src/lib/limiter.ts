import Bottleneck from 'bottleneck';

export const limiter = new Bottleneck({
  maxConcurrent: 5,              // Lebih banyak concurrent requests
  minTime: 250,                  // 4 request per detik (lebih cepat)
  reservoir: 100,                // Lebih banyak requests per menit
  reservoirRefreshAmount: 100,   // Isi ulang lebih banyak
  reservoirRefreshInterval: 60 * 1000, // Setiap 60 detik
  
  // Timeout configuration - lebih panjang untuk development
  timeout: 25000,                // 25 detik timeout untuk job
  
  // Retry configuration
  retryCount: 0,                 // No automatic retry (kita handle manual)
});

// Enhanced debugging
limiter.on("error", (error) => {
  console.error("Limiter error:", error);
});

limiter.on("depleted", (empty) => {
  console.warn("Rate limit reservoir depleted:", empty);
});

limiter.on("scheduled", (info:any) => {
  console.log("Job scheduled:", {
    queued: info.queued,
    running: info.running
  });
});

limiter.on("done", (info:any) => {
  console.log("Job completed:", {
    queued: info.queued,
    running: info.running,
    executionTime: info.executionTime
  });
});

// Alternative limiter dengan konfigurasi lebih longgar
export const relaxedLimiter = new Bottleneck({
  maxConcurrent: 5,
  minTime: 200,                  // 5 request per detik
  timeout: 15000,
});

export default limiter;