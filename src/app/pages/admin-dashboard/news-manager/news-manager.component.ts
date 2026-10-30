import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { NewsService } from '../../../services/news.service';
import { StorageService } from '../../../services/storage.service';
import { NewsDto } from '../../../data-type/news-data';
import { ButtonComponent } from '../../../components/button/button.component';
import { ButtonType } from '../../../data-type/data-type';

@Component({
  selector: 'app-news-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  template: `
    <div class="news-manager-card">
      <div class="card-header">
        <h3><i class="fas fa-newspaper"></i> News Management</h3>
        <button class="btn-toggle" (click)="isAdding.set(!isAdding())">
          {{ isAdding() ? 'Cancel' : '+ Add News' }}
        </button>
      </div>

      <!-- Add/Edit Form -->
      <div class="news-form" *ngIf="isAdding() || editingId()">
        <h4>{{ editingId() ? 'Edit Article' : 'New Article' }}</h4>
        <div class="form-grid">
          <input [(ngModel)]="newsModel.title" placeholder="News Title" class="admin-input">
          
          <div class="upload-section">
            <label class="file-label">
              <i class="fas fa-cloud-upload-alt"></i> {{ selectedFile() ? selectedFile()?.name : 'Upload Article Image' }}
              <input type="file" (change)="onFileSelected($event)" accept="image/*" hidden>
            </label>
            <p class="upload-tip" *ngIf="newsModel.image">Current: {{ newsModel.image | slice:0:40 }}...</p>
            <div class="progress-bar" *ngIf="isUploading()">
               <div class="progress-fill"></div>
            </div>
          </div>

          <input [(ngModel)]="newsModel.imageAlt" placeholder="Image Alt Text" class="admin-input">
          <textarea [(ngModel)]="newsModel.content" placeholder="Content Preview" class="admin-textarea"></textarea>
        </div>
        <div class="form-actions">
          <app-button 
            [buttonLabel]="editingId() ? 'Update' : 'Save News'" 
            [buttonType]="buttonType.Orange"
            (buttonClicked)="saveNews()"
            [disabled]="isUploading()"
          ></app-button>
        </div>
      </div>

      <!-- News List -->
      <div class="news-list">
        <div class="news-item" *ngFor="let item of newsList$ | async">
          <div class="news-info">
            <strong>{{ item.title }}</strong>
            <p>{{ item.content | slice:0:60 }}...</p>
          </div>
          <div class="item-actions">
            <button class="btn-icon edit" (click)="startEdit(item)"><i class="fas fa-edit"></i></button>
            <button class="btn-icon delete" (click)="deleteNews(item.id!)"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .news-manager-card {
      background: var(--card-bg);
      border-radius: 15px;
      padding: 2rem;
      box-shadow: var(--card-shadow);
      border: 1px solid var(--border-primary);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .news-form {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      border: 1px solid var(--border-primary);
    }
    .form-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .admin-input, .admin-textarea {
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid var(--border-primary);
      background: var(--bg-primary);
      color: var(--text-primary);
    }
    .admin-textarea { height: 100px; resize: vertical; }

    .upload-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .file-label {
      padding: 10px;
      background: var(--bg-primary);
      border: 1px dashed var(--border-primary);
      border-radius: 8px;
      cursor: pointer;
      text-align: center;
      color: var(--text-muted);
      transition: all 0.3s ease;
    }
    .file-label:hover {
      border-color: var(--primary-accent);
      color: var(--primary-accent);
    }
    .upload-tip { font-size: 0.75rem; color: var(--text-muted); }
    .progress-bar {
      height: 4px;
      background: var(--border-primary);
      border-radius: 2px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: var(--primary-accent);
      width: 50%;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0% { opacity: 0.5; width: 0; }
      100% { opacity: 1; width: 100%; }
    }

    .news-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .news-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: var(--bg-primary);
      border-radius: 10px;
      border: 1px solid var(--border-primary);
    }
    .news-info p {
      margin: 0;
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    .btn-toggle {
      padding: 8px 16px;
      border-radius: 8px;
      border: none;
      background: var(--primary-accent);
      color: white;
      cursor: pointer;
      font-weight: 600;
    }
    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      font-size: 1rem;
    }
    .edit { color: #3498db; }
    .delete { color: #e74c3c; }
  `]
})
export class NewsManagerComponent {
  private newsService = inject(NewsService);
  private storageService = inject(StorageService);

  public newsList$ = this.newsService.getNews();
  public buttonType = ButtonType;

  public isAdding = signal(false);
  public editingId = signal<string | null>(null);
  public isUploading = signal(false);
  public selectedFile = signal<File | null>(null);
  
  public newsModel: NewsDto = {
    title: '',
    image: '',
    imageAlt: '',
    content: ''
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile.set(file);
    }
  }

  async saveNews() {
    if (!this.newsModel.title || !this.newsModel.content) return;

    try {
      this.isUploading.set(true);
      if (this.selectedFile()) {
        const imageUrl = await this.storageService.uploadNewsImage(this.selectedFile()!);
        this.newsModel.image = imageUrl;
      }

      if (this.editingId()) {
        await firstValueFrom(this.newsService.updateNews(this.editingId()!, this.newsModel));
      } else {
        await firstValueFrom(this.newsService.addNews(this.newsModel));
      }
      this.resetForm();
    } catch (error) {
      console.error('Error saving news:', error);
    } finally {
      this.isUploading.set(false);
    }
  }

  startEdit(item: NewsDto) {
    this.editingId.set(item.id!);
    this.newsModel = { ...item };
    this.isAdding.set(false);
    this.selectedFile.set(null);
  }

  async deleteNews(id: string) {
    if (confirm('Are you sure you want to delete this news article?')) {
      await firstValueFrom(this.newsService.deleteNews(id));
    }
  }

  resetForm() {
    this.isAdding.set(false);
    this.editingId.set(null);
    this.selectedFile.set(null);
    this.isUploading.set(false);
    this.newsModel = { title: '', image: '', imageAlt: '', content: '' };
  }
}
