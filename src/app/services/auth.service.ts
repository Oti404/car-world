import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, User } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface UserProfile {
  role?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Observable for the current user state
  public readonly user$: Observable<User | null>;
  
  // Observable defining if the user is an admin
  public readonly isAdmin$: Observable<boolean>;

  private firestore = inject(Firestore);

  constructor(private auth: Auth) {
    this.user$ = authState(this.auth);

    // Determine if user is admin based on their Firestore document
    this.isAdmin$ = this.user$.pipe(
      switchMap(user => {
        if (!user) {
          return of(null);
        }
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        return docData(userDocRef) as Observable<UserProfile | undefined>;
      }),
      switchMap((userProfile) => {
        return of(userProfile?.role === 'admin');
      })
    );
  }

  // Register with email and password
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Login with email and password
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Logout
  logout() {
    return signOut(this.auth);
  }

  // Get current synchronous user
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}

