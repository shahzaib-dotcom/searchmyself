export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

export interface SearchResponse {
  totalResults: number;
  items: SearchResult[];
}

export async function searchGoogle(query: string): Promise<SearchResponse> {
  const apiKey = process.env.GOOGLE_CSE_API_KEY;
  const cx = process.env.GOOGLE_CSE_ID;

  if (!apiKey || !cx) {
    console.error('Google CSE API key or Search Engine ID not configured');
    return { totalResults: 0, items: [] };
  }

  const params = new URLSearchParams({
    key: apiKey,
    cx,
    q: query,
    num: '10',
  });

  try {
    const res = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error(`Google CSE error: ${res.status} ${res.statusText} - ${errBody.slice(0, 500)}`);
      return { totalResults: 0, items: [] };
    }

    const data = await res.json();

    return {
      totalResults: parseInt(data.searchInformation?.totalResults || '0', 10),
      items: (data.items || []).map((item: { title: string; link: string; snippet: string }) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet || '',
      })),
    };
  } catch (error) {
    console.error('Google CSE fetch error:', error);
    return { totalResults: 0, items: [] };
  }
}
