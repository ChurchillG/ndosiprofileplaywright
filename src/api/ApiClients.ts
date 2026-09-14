import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  private readonly request: APIRequestContext;
  private authToken?: string;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  private get headers(): Record<string, string> {
    return this.authToken ? { Authorization: `Bearer ${this.authToken}` } : {};
  }

  async get(url: string): Promise<APIResponse> {
    return this.request.get(url, { headers: this.headers });
  }

  async post(url: string, data?: Record<string, unknown>): Promise<APIResponse> {
    return this.request.post(url, { headers: this.headers, data });
  }

  async postMultipart(url: string, multipart: Record<string, unknown>): Promise<APIResponse> {
    return this.request.post(url, { headers: this.headers, multipart });
  }

  async put(url: string, data?: Record<string, unknown>): Promise<APIResponse> {
    return this.request.put(url, { headers: this.headers, data });
  }
}