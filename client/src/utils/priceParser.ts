export function parsePriceSuggestion(response: string): {
  suggestedPrice: number;
  minPrice: number;
  maxPrice: number;
  formattedResponse: string;
} {
  const ranges: { min: number; max: number; condition: string }[] = [];
  
  const rangePattern = /(\d[\d\s]*?)\s*[–-]\s*(\d[\d\s]*?)\s*₽\s*—\s*(.+?)(?=\n|$)/gi;
  
  let match;
  while ((match = rangePattern.exec(response)) !== null) {
    ranges.push({
      min: parseInt(match[1].replace(/\s/g, ''), 10),
      max: parseInt(match[2].replace(/\s/g, ''), 10),
      condition: match[3].trim()
    });
  }

  const idealPattern = /От\s*(\d[\d\s]*?)\s*₽\s*—\s*(.+?)(?=\n|$)/i;
  const idealMatch = response.match(idealPattern);
  
  let suggestedPrice: number;
  let minPrice: number;
  let maxPrice: number;
  
  if (ranges.length > 0) {
    const targetRange = ranges[Math.floor(ranges.length / 2)];
    minPrice = targetRange.min;
    maxPrice = targetRange.max;
    suggestedPrice = Math.round((minPrice + maxPrice) / 2);
  } else if (idealMatch) {
    suggestedPrice = parseInt(idealMatch[1].replace(/\s/g, ''), 10);
    minPrice = Math.round(suggestedPrice * 0.85);
    maxPrice = Math.round(suggestedPrice * 1.15);
  } else {
    // Fallback: ищем любое число
    const anyNumber = response.match(/\d+/);
    suggestedPrice = anyNumber ? parseInt(anyNumber[0], 10) : 0;
    minPrice = Math.round(suggestedPrice * 0.85);
    maxPrice = Math.round(suggestedPrice * 1.15);
  }
  
  const formattedResponse = formatPriceResponse(response);
  
  return {
    suggestedPrice,
    minPrice,
    maxPrice,
    formattedResponse
  };
}

export function formatPriceResponse(rawResponse: string): string {
  return rawResponse
    .replace(/\n{3,}/g, '\n\n')
    .replace(/([^.!?])\n/g, '$1.\n')
    .replace(/(\d[\d\s]*?)\s*[–-]\s*(\d[\d\s]*?)\s*₽/g, (match) => {
      return match.trim();
    })
    .replace(/(\d[\d\s]*?)\s*[–-]\s*(\d[\d\s]*?)\s*₽/g, '**$&**')
    .trim();
}

export function extractSuggestedPrice(response: string): number | null {
  const ranges = response.match(/(\d[\d\s]*?)\s*[–-]\s*(\d[\d\s]*?)\s*₽/g);
  
  if (ranges && ranges.length > 0) {
    const middleRange = ranges[Math.floor(ranges.length / 2)];
    const numbers = middleRange.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const min = parseInt(numbers[0], 10);
      const max = parseInt(numbers[1], 10);
      return Math.round((min + max) / 2);
    }
  }
  
  const singlePrice = response.match(/От\s*(\d[\d\s]*?)\s*₽/i);
  if (singlePrice) {
    return parseInt(singlePrice[1].replace(/\s/g, ''), 10);
  }

  const anyNumber = response.match(/\d+/);
  return anyNumber ? parseInt(anyNumber[0], 10) : null;
}
