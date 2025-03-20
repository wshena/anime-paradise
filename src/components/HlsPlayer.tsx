"use client";
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface HlsPlayerProps {
  src: string;
  tracks?: any;
  autoPlay?: boolean;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
}

/**
 * Komponen video yang mendukung HLS (m3u8) di browser selain Safari.
 */
const HlsPlayer: React.FC<HlsPlayerProps> = ({
  src,
  tracks,
  autoPlay = false,
  controls = true,
  width = "100%",
  height = "auto",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    // Gunakan proxy URL untuk manifest HLS sehingga seluruh segmen pun diarahkan melalui proxy
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(src)}`;

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferSize: 0,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        startFragPrefetch: true,
        startLevel: 0
      });
      // Muat manifest melalui proxy
      hls.loadSource(proxyUrl);
      hls.attachMedia(video!);

      // Tangkap error yang membutuhkan reload
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("Network error - membutuhkan reload.");
              setHasError(true);
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("Media error - mencoba pemulihan.");
              hls.recoverMediaError();
              break;
            default:
              console.error("Fatal error - membutuhkan reload.");
              setHasError(true);
              break;
          }
        }
      });

      return () => hls.destroy();
    } else if (video?.canPlayType("application/vnd.apple.mpegurl")) {
      // Jika browser mendukung HLS secara native (misalnya Safari/iOS)
      video.src = proxyUrl;
    }
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handlePlaying = () => {
        setHasError(false);
      };
  
      video.addEventListener("playing", handlePlaying);
      return () => {
        video.removeEventListener("playing", handlePlaying);
      };
    }
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const textTracks = video.textTracks;
      for (let i = 0; i < textTracks.length; i++) {
        // Contoh: nyalakan track English
        if (textTracks[i].label === 'English') {
          textTracks[i].mode = 'showing';
        }
      }
    }
  }, [tracks]);  

  // Fungsi untuk reload halaman
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div style={{ position: "relative", width, height }}>
      {/* Video Player */}
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        controls={controls}
        style={{ width: "100%", height: "100%" }}
        preload="auto"
        crossOrigin="anonymous"
        disablePictureInPicture
      >
        {tracks?.map((item: any, idx: number) => (
          <track
            key={`${item?.label} - ${idx}`}
            src={item?.file}
            kind={item.kind}
            label={item?.label}
            srcLang="en"
            default={item?.label === "English"}
          />
        ))}
      </video>

      {/* Pesan Error dan Tombol Reload */}
      {hasError && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            flexDirection: "column",
          }}
        >
          <p>There are errors in loading the video, please change the server or reload the page.</p>
          <button
            onClick={handleReload}
            style={{
              padding: "10px 20px",
              marginTop: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Reload page
          </button>
        </div>
      )}
    </div>
  );
};

export default HlsPlayer;
