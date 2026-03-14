import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../components/button/button.component';
import { ButtonType } from '../../data-type/data-type';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  template: `
    <div class="main-content">
      <div class="title-description-block">
        <h1 class="page-title">Profilul Meu</h1>
        <p class="page-subtitle">Gestionează-ți identitatea și setările contului pentru o experiență personalizată.</p>
      </div>

      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-container">
             <i class="fas fa-user-circle default-avatar"></i>
          </div>
          <div class="user-info">
            <h2>{{ userEmail() }}</h2>
            <span class="member-since">Membru Car World</span>
          </div>
        </div>

        <form (ngSubmit)="updateProfile()" class="profile-form">
          <div class="form-group">
            <label for="displayName">Nume Complet</label>
            <input 
              type="text" 
              id="displayName" 
              [(ngModel)]="displayName" 
              name="displayName"
              placeholder="Ex: Adrian Popescu"
              class="form-control"
            >
          </div>

          <div class="form-actions">
            <app-button 
              [buttonLabel]="isUpdating ? 'Se salvează...' : 'Salvează Modificările'" 
              [buttonType]="buttonType.Orange"
              [disabled]="isUpdating"
            ></app-button>
          </div>

          <div *ngIf="message" [class.success]="isSuccess" [class.error]="!isSuccess" class="form-message">
            {{ message }}
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .profile-card {
      max-width: 600px;
      margin: 0 auto;
      background: var(--card-bg);
      border-radius: 20px;
      box-shadow: var(--card-shadow);
      padding: 3rem;
      border: 1px solid var(--border-primary);
      animation: fadeInUp 0.6s ease-out;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border-primary);
    }

    .avatar-container {
      width: 100px;
      height: 100px;
      background: var(--bg-secondary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 2px 5px rgba(0,0,0,0.1);
    }

    .default-avatar {
      font-size: 4rem;
      color: var(--text-muted);
    }

    .user-info h2 {
      margin: 0;
      color: var(--text-primary);
      font-size: 1.5rem;
    }

    .member-since {
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .profile-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      text-align: left;
    }

    .form-group label {
      font-weight: 700;
      color: var(--text-primary);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .form-control {
      padding: 12px 15px;
      border-radius: 10px;
      border: 1px solid var(--border-primary);
      background: var(--bg-primary);
      color: var(--text-primary);
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    .form-control:focus {
      outline: none;
      border-color: var(--primary-accent);
    }

    .form-actions {
      margin-top: 1rem;
    }

    .form-message {
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
      margin-top: 1rem;
    }

    .success { background: rgba(39, 174, 96, 0.1); color: #27ae60; }
    .error { background: rgba(231, 76, 60, 0.1); color: #e74c3c; }

    @media (max-width: 600px) {
      .profile-card { padding: 2rem 1.5rem; }
      .profile-header { flex-direction: column; text-align: center; }
    }
  `]
})
export class ProfileComponent {
  private authService = inject(AuthService);
  public buttonType = ButtonType;

  
  public userEmail = signal<string>('');
  public displayName = '';
  public isUpdating = false;
  public message = '';
  public isSuccess = false;

  constructor() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userEmail.set(user.email || '');
        this.displayName = user.displayName || '';
      }
    });
  }

  async updateProfile() {
    this.isUpdating = true;
    this.message = '';
    
    try {
      await this.authService.updateDisplayName(this.displayName);
      this.message = 'Profilul a fost actualizat cu succes!';
      this.isSuccess = true;
    } catch (error: any) {
      this.message = 'Eroare la actualizarea profilului: ' + error.message;
      this.isSuccess = false;
    } finally {
      this.isUpdating = false;
    }
  }
}
