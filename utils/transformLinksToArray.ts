
export default function transformLinksToArray(linksStr: string): string[] {
    return linksStr
      .split(',')
      .map(link => link.trim())
      .filter(link => link !== ""); 
  }
  