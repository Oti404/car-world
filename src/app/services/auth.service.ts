import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_URL } from '../api.config';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'GUEST' | 'CUSTOMER' | 'OWNER' | 'ADMIN';
  firstName?: string;
  lastName?: string;
  country?: string;
  createdAt?: any;
}

/** Logged-in user, shaped like the old Firebase User so components keep working. */
export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
}

interface AuthResponse {
  token: string;
  user: UserProfile;
}

const TOKEN_KEY = 'mhp_token';
const USER_KEY = 'mhp_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${API_URL}/users`;

  private readonly dbUserSubject = new BehaviorSubject<UserProfile | null>(this.readStoredUser());
  public readonly dbUser$: Observable<UserProfile | null> = this.dbUserSubject.asObservable();

  public readonly user$: Observable<AuthUser | null> = this.dbUser$.pipe(map(u => this.toAuthUser(u)));
  public readonly isAdmin$: Observable<boolean> = this.dbUser$.pipe(map(u => u?.role === 'ADMIN'));

  constructor() {
    // Re-validate a stored session (token may have expired or role changed)
    if (this.getToken()) {
      this.http.get<UserProfile>(`${this.apiUrl}/me`, { headers: this.authHeaders() }).subscribe({
        next: user => this.setUser(user),
        error: () => this.logout()
      });
    }
  }

  async register(email: string, password: string, additionalData: { firstName?: string; lastName?: string; country?: string }) {
    const name = `${additionalData.firstName || ''} ${additionalData.lastName || ''}`.trim() || email;
    const res = await this.request(this.http.post<AuthResponse>(`${this.apiUrl}/register`, { email, password, name }));
    this.startSession(res);
    return res.user;
  }

  async login(email: string, password: string) {
    const res = await this.request(this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }));
    this.startSession(res);
    return res.user;
  }

  async logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.dbUserSubject.next(null);
  }

  getCurrentUser(): AuthUser | null {
    return this.toAuthUser(this.dbUserSubject.value);
  }

  getDbUser(): UserProfile | null {
    return this.dbUserSubject.value;
  }

  async updateDisplayName(name: string) {
    if (!this.getToken()) throw new Error('No user logged in');
    const user = await this.request(this.http.put<UserProfile>(`${this.apiUrl}/me`, { name }, { headers: this.authHeaders() }));
    this.setUser(user);
  }

  async updateProfileData(data: { firstName?: string; lastName?: string; [key: string]: any }) {
    if (!this.getToken()) throw new Error('No user logged in');
    const name = `${data.firstName || ''} ${data.lastName || ''}`.trim();
    if (name) await this.updateDisplayName(name);
  }

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      return await firstValueFrom(this.http.get<UserProfile>(`${this.apiUrl}/${uid}`));
    } catch { return null; }
  }

  getUserProfile$(uid: string): Observable<UserProfile | null> {
    return this.http.get<UserProfile>(`${this.apiUrl}/${uid}`).pipe(catchError(() => of(null)));
  }

  private startSession(res: AuthResponse) {
    localStorage.setItem(TOKEN_KEY, res.token);
    this.setUser(res.user);
  }

  private setUser(user: UserProfile) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.dbUserSubject.next(user);
  }

  private getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
  }

  private readStoredUser(): UserProfile | null {
    try {
      return localStorage.getItem(TOKEN_KEY) ? JSON.parse(localStorage.getItem(USER_KEY) || 'null') : null;
    } catch { return null; }
  }

  private toAuthUser(u: UserProfile | null): AuthUser | null {
    return u ? { uid: u.id, email: u.email, displayName: u.name } : null;
  }

  /** Unwraps API errors into an Error with the server's message, for the login/register forms. */
  private async request<T>(obs: Observable<T>): Promise<T> {
    try {
      return await firstValueFrom(obs);
    } catch (e) {
      const err = e as HttpErrorResponse;
      throw new Error(err.error?.error || err.message || 'Request failed');
    }
  }
}
