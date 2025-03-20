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