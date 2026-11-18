import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDto } from '../../data-type/news-data';
import { NewsService } from '../../services/news.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  private readonly newsService = inject(NewsService);
  public readonly authService = inject(AuthService);

  public readonly fallbackImage = 'assets/news-000.webp';

  /**
   * Observable stream of automotive news articles.
   */
  public newsArticles$!: Observable<NewsDto[]>;

  /** Articles whose full text is currently expanded ("Read more"). */
  private readonly expanded = signal<Set<string>>(new Set());

  public ngOnInit(): void {
    this.newsArticles$ = this.newsService.getNews();
  }

  private key(article: NewsDto): string {
    return article.id ?? article.title;
  }

  public isExpanded(article: NewsDto): boolean {
    return this.expanded().has(this.key(article));
  }

  public toggle(article: NewsDto): void {
    const key = this.key(article);
    this.expanded.update(set => {
      const next = new Set(set);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  public onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (!img.src.endsWith(this.fallbackImage)) {
      img.src = this.fallbackImage;
    }
  }
}
