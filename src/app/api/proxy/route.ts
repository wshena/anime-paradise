// app/api/proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse(
      JSON.stringify({ error: 'Missing url parameter' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const decodedUrl = decodeURIComponent(url);
    console.log('Requested URL:', decodedUrl);

    // Mengubah header: gunakan referer dari domain sendiri dan hilangkan header 'Origin'
    const headersConfig = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
      'Referer': 'http://localhost:3000', // gunakan referer dari aplikasi Anda
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Sec-Fetch-Dest': 'video',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin'
    };

    const axiosResponse = await axios.get(decodedUrl, {
      responseType: 'arraybuffer',
      headers: headersConfig,
      timeout: 15000
    });

    const contentType = axiosResponse.headers['content-type'] || 'application/octet-stream';
    console.log('Content-Type:', contentType);

    // Deteksi apakah resource adalah manifest HLS (.m3u8)
    const isM3u8 =
      contentType.includes('application/vnd.apple.mpegurl') ||
      contentType.includes('application/x-mpegurl') ||
      decodedUrl.toLowerCase().endsWith('.m3u8');

    if (isM3u8) {
      const manifestText = Buffer.from(axiosResponse.data).toString('utf-8');
      console.log('Original manifest (preview):', manifestText.substring(0, 200) + '...');

      const manifestUrl = new URL(decodedUrl);
      const baseUrl = manifestUrl.href.substring(0, manifestUrl.href.lastIndexOf('/') + 1);
      const origin = manifestUrl.origin;
      console.log('Base URL:', baseUrl);
      console.log('Origin:', origin);

      const rewrittenManifest = manifestText
        .split('\n')
        .map((line) => {
          if (line.startsWith('#') || line.trim() === '') {
            return line;
          }
          let fullUrl = '';
          if (line.startsWith('http')) {
            fullUrl = line;
          } else if (line.startsWith('/')) {
            fullUrl = origin + line;
          } else {
            fullUrl = baseUrl + line;
          }
          // Pastikan semua resource di manifest diarahkan melalui proxy
          return `/api/proxy?url=${encodeURIComponent(fullUrl)}`;
        })
        .join('\n');

      return new NextResponse(rewrittenManifest, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': contentType,
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        },
      });
    } else {
      return new NextResponse(axiosResponse.data, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600'
        },
      });
    }
  } catch (error: any) {
    console.error('Error fetching resource:', error);
    let errorMessage = 'Unknown error';
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      errorMessage = error.message;
      if (error.response) {
        statusCode = error.response.status;
        errorMessage = `Server responded with status ${error.response.status}: ${error.message}`;
      } else if (error.request) {
        errorMessage = `No response received: ${error.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch resource', details: errorMessage }),
      { status: statusCode, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
