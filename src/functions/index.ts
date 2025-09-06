import slugify from "slugify";
import { formatDistanceToNow } from "date-fns";

export const createSlug = (input:string) => slugify(input, { lower: true, strict: true });

export function truncateTitle(title: string, maxLength: number): string {
  // Jika panjang title sudah kurang atau sama dengan maxLength, kembalikan title asli
  if (title?.length <= maxLength) return title;
  
  // Potong string hingga maxLength
  const truncated = title?.slice(0, maxLength);
  
  // Cari indeks spasi terakhir pada potongan string
  const lastSpaceIndex = truncated?.lastIndexOf(" ");
  
  // Jika ada spasi, potong hingga spasi tersebut untuk menghindari memotong kata
  // Jika tidak ada, gunakan potongan langsung
  return (lastSpaceIndex > 0 ? truncated?.slice(0, lastSpaceIndex) : truncated) + "...";
}

export const getRelativeTime = (date:any) => {
  const Datadate = new Date(date)
  const relativeTime = formatDistanceToNow(Datadate, { addSuffix: true })

  return relativeTime
}

export const slugToOriginal = (slug: string, capitalize: boolean = true): string => {
  if (!slug) return '';
  
  // Ganti semua hyphen dengan spasi
  let original = slug.replace(/-/g, ' ');
  
  // Handle kasus khusus (optional)
  original = original.replace(/\s+/g, ' ').trim();
  
  if (capitalize) {
    // Kapitalisasi setiap kata, tapi pertahankan kata sambung kecil
    const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'of', 'on', 'or', 'the', 'to', 'via', 'wa', 'ga', 'no', 'ni', 'de'];
    
    return original
      .split(' ')
      .map((word, index, array) => {
        // Selalu kapitalisasi kata pertama dan terakhir
        if (index === 0 || index === array.length - 1) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        
        // Untuk kata di tengah, kapitalisasi kecuali kata sambung
        if (smallWords.includes(word.toLowerCase())) {
          return word.toLowerCase();
        }
        
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
  
  return original;
};