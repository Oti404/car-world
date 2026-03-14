import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NewsDto } from '../data-type/news-data';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private firestore = inject(Firestore);
  private newsCollection = collection(this.firestore, 'news');

  /**
   * Retrieves the catalog of automotive news from Firestore, ordered by title.
   */
  public getNews(): Observable<NewsDto[]> {
    const newsQuery = query(this.newsCollection, orderBy('title'));
    return collectionData(newsQuery, { idField: 'id' }) as Observable<NewsDto[]>;
  }

  /**
   * Adds a new news article to Firestore.
   */
  public addNews(news: NewsDto): Promise<any> {
    return addDoc(this.newsCollection, news);
  }

  /**
   * Updates an existing news article.
   */
  public updateNews(id: string, newsData: Partial<NewsDto>): Promise<void> {
    const newsDocRef = doc(this.firestore, `news/${id}`);
    return updateDoc(newsDocRef, newsData);
  }

  /**
   * Deletes a news article.
   */
  public deleteNews(id: string): Promise<void> {
    const newsDocRef = doc(this.firestore, `news/${id}`);
    return deleteDoc(newsDocRef);
  }
}
