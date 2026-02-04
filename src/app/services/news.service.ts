import { Injectable } from '@angular/core';
import { NewsDto } from '../data-type/news-data';
import { news } from '../../resources/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  /**
   * Retrieves the current catalog of automotive news.
   */
  public fetchNews(): NewsDto[] {
    return news;
  }
}
