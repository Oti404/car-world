import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDto } from '../../data-type/news-data';
import { NewsService } from '../../services/news.service';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from '../../components/card/card.component';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  private readonly newsService = inject(NewsService);
  public readonly authService = inject(AuthService);

  /**
   * Observable stream of automotive news articles from Firestore.
   */
  public newsArticles$!: Observable<NewsDto[]>;

  public ngOnInit(): void {
    this.newsArticles$ = this.newsService.getNews();
  }
}
