# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/profile-endpoints.spec.ts >> Profile endpoints - status code validation >> login endpoint returns 200
- Location: tests/api/profile-endpoints.spec.ts:39:7

# Error details

```
TypeError: apiRequestContext.post: Invalid URL
```

# Test source

```ts
  1  | import { APIRequestContext, APIResponse } from '@playwright/test';
  2  | 
  3  | type MultipartData = Record<
  4  |   string,
  5  |   string | number | boolean | { name: string; mimeType: string; buffer: Buffer }
  6  | >;
  7  | 
  8  | /**
  9  |  * Thin wrapper over Playwright's APIRequestContext so tests don't repeat
  10 |  * header/auth boilerplate on every call.
  11 |  */
  12 | export class ApiClient {
  13 |   private readonly request: APIRequestContext;
  14 |   private authToken?: string;
  15 | 
  16 |   constructor(request: APIRequestContext) {
  17 |     this.request = request;
  18 |   }
  19 | 
  20 |   setAuthToken(token: string): void {
  21 |     this.authToken = token;
  22 |   }
  23 | 
  24 |   private get headers(): Record<string, string> {
  25 |     return this.authToken ? { Authorization: `Bearer ${this.authToken}` } : {};
  26 |   }
  27 | 
  28 |   async get(url: string): Promise<APIResponse> {
  29 |     return this.request.get(url, { headers: this.headers });
  30 |   }
  31 | 
  32 |   async post(url: string, data?: Record<string, unknown>): Promise<APIResponse> {
> 33 |     return this.request.post(url, { headers: this.headers, data });
     |                         ^ TypeError: apiRequestContext.post: Invalid URL
  34 |   }
  35 | 
  36 |   async postMultipart(url: string, multipart: MultipartData): Promise<APIResponse> {
  37 |     return this.request.post(url, { headers: this.headers, multipart });
  38 |   }
  39 | 
  40 |   async put(url: string, data?: Record<string, unknown>): Promise<APIResponse> {
  41 |     return this.request.put(url, { headers: this.headers, data });
  42 |   }
  43 | }
```