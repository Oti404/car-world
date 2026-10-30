import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_URL } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private http = inject(HttpClient);

  /**
   * Uploads a car image to the backend (stored on the server's disk).
   * Returns a Promise that resolves with the public URL.
   */
  uploadCarImage(file: File, carName: string): Promise<string> {
    return this.upload(file, 'cars');
  }

  /**
   * Uploads a news (or review) image to the backend.
   */
  uploadNewsImage(file: File): Promise<string> {
    return this.upload(file, 'news');
  }

  private async upload(file: File, folder: string): Promise<string> {
    const params = { folder, filename: file.name };
    const headers = { 'Content-Type': file.type || 'application/octet-stream' };
    const res = await firstValueFrom(this.http.post<{ url: string }>(`${API_URL}/uploads`, file, { params, headers }));
    return res.url;
  }
}
