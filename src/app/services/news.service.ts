import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.config';
import { NewsDto } from '../data-type/news-data';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);
  private readonly url = `${API_URL}/news`;

  public getNews(): Observable<NewsDto[]> {
    return this.http.get<NewsDto[]>(this.url);
  }

  public addNews(news: NewsDto): Observable<NewsDto> {
    return this.http.post<NewsDto>(this.url, news);
  }

  public updateNews(id: string, newsData: Partial<NewsDto>): Observable<NewsDto> {
    return this.http.put<NewsDto>(`${this.url}/${id}`, newsData);
  }

  public deleteNews(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
