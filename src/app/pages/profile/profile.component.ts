import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, UserProfile } from '../../services/auth.service';
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

      <div class="profile-card" *ngIf="profile() as userProfile">
        <div class="profile-header">
          <div class="avatar-container">
             <i class="fas fa-user-circle default-avatar"></i>
          </div>
          <div class="user-info">
            <h2>{{ userProfile.firstName }} {{ userProfile.lastName }}</h2>
            <span class="member-since">Membru Car World din {{ userProfile.createdAt | date:'mediumDate' }}</span>
          </div>
        </div>

        <form (ngSubmit)="updateProfile()" class="profile-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Prenume</label>
              <input 
                type="text" 
                id="firstName" 
                [(ngModel)]="editData.firstName" 
                name="firstName"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="lastName">Nume</label>
              <input 
                type="text" 
                id="lastName" 
                [(ngModel)]="editData.lastName" 
                name="lastName"
                class="form-control"
              >
            </div>
          </div>

          <div class="form-group">
            <label for="country">Țară</label>
            <select id="country" [(ngModel)]="editData.country" name="country" class="form-control">
              <option value="Romania">Romania</option>
              <option value="Germany">Germany</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>

          <div class="form-actions">
            <app-button 
              [buttonLabel]="isUpdating() ? 'Se salvează...' : 'Salvează Modificările'" 
              [buttonType]="buttonType.Orange"
              [disabled]="isUpdating()"
            ></app-button>
          </div>

          <div *ngIf="message()" [class.success]="isSuccess()" [class.error]="!isSuccess()" class="form-message">
            {{ message() }}
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

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    @media (max-width: 600px) {
      .profile-card { padding: 2rem 1.5rem; }
      .profile-header { flex-direction: column; text-align: center; }
      .form-row { grid-template-columns: 1fr; }
    }
  `]
})
export class ProfileComponent {
  private authService = inject(AuthService);
  public buttonType = ButtonType;

  public profile = signal<UserProfile | null>(null);
  public editData: Partial<UserProfile> = {};
  public isUpdating = signal(false);
  public message = signal('');
  public isSuccess = signal(false);

  constructor() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.getUserProfile$(user.uid).subscribe(p => {
          this.profile.set(p);
          if (p) {
            this.editData = { ...p };
          }
        });
      }
    });
  }

  async updateProfile() {
    this.isUpdating.set(true);
    this.message.set('');
    
    try {
      await this.authService.updateProfileData(this.editData);
      this.message.set('Profilul a fost actualizat cu succes!');
      this.isSuccess.set(true);
    } catch (error: any) {
      this.message.set('Eroare la actualizarea profilului: ' + error.message);
      this.isSuccess.set(false);
    } finally {
      this.isUpdating.set(false);
    }
  }
}
