const API_URI = 'https://api.github.com';

export type GitHubValidationError = {
  field: string;
  message: string;
}

enum ErrorKind {
  NETWORK_ERROR = 'NetworkError',
  VALIDATION_ERROR = 'ValidationError',
}

export class APIError extends Error {
  readonly data;
  readonly kind;

  constructor(data: any, kind = 'NetworkError') {
    super('APIError');
    this.data = data;
    this.kind = kind;
  }
}

const callApi = async (endpoint: string, init?: RequestInit) => {
  const response = await fetch(`${API_URI}${endpoint}`, init);
  let json;

  try {
    json = await response.json();
  } catch (e) {
    // ignore to keep things simpler
  }

  if (response.status >= 400) {
    throw new APIError(
      json?.errors,
      // to keep things simple, assume there are only two kinds of errors
      ErrorKind[response.status === 422 ? 'VALIDATION_ERROR' : 'NETWORK_ERROR'],
    );
  }

  return json;
}

const API = {
  get: async (endpoint: string, init?: RequestInit) => callApi(endpoint, {
    method: 'GET',
    ...init,
    headers: {
      ...init?.headers,
      Accept: 'application/vnd.github.v3+json',
    },
  }),
}


export const isNetworkError = (e: any) => e?.kind === ErrorKind.NETWORK_ERROR;

export default API;