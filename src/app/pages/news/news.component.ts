import { Component, inject, OnInit } from '@angular/core';
import { NewsDto } from '../../data-type/news-data';
import { NewsService } from '../../services/news.service';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  private readonly newsService = inject(NewsService);

  /**
   * Local state for storing automotive news articles.
   */
  public newsArticles: NewsDto[] = [];

  public ngOnInit(): void {
    this.initializeNews();
  }

  /**
   * Synchronizes component state with the data provided by the NewsService.
   */
  private initializeNews(): void {
    this.newsArticles = this.newsService.fetchNews();
  }
}
