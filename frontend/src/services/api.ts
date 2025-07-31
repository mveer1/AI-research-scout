// frontend/src/services/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class SearchAPI {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async searchPapers(query: string, sources?: string[], limit?: number) {
    return this.request('/search/papers', {
      method: 'POST',
      body: JSON.stringify({
        query,
        sources,
        limit,
      }),
    });
  }

  async getTrends(keywords: string[], timeframe?: string, geo?: string) {
    return this.request('/trends/analyze', {
      method: 'POST',
      body: JSON.stringify({
        keywords,
        timeframe,
        geo,
      }),
    });
  }

  async getDiscussions(query: string, sources?: string[], limit?: number) {
    return this.request('/discussions/search', {
      method: 'POST',
      body: JSON.stringify({
        query,
        sources,
        limit,
      }),
    });
  }

  async getSummary(query: string, eli5Mode: boolean = false) {
    return this.request('/summary/generate', {
      method: 'POST',
      body: JSON.stringify({
        query,
        sources: ['research', 'trends', 'discussions'],
        eli5_mode: eli5Mode,
      }),
    });
  }
}

export const searchAPI = new SearchAPI();
