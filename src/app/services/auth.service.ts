import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, User } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface UserProfile {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  role?: 'user' | 'admin';
  createdAt?: any;
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

  // Register with email and password and create a Firestore profile
  async register(email: string, password: string, additionalData: Partial<UserProfile>) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = credential.user;
    
    // Create initial profile in Firestore
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    const profile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      firstName: additionalData.firstName || '',
      lastName: additionalData.lastName || '',
      country: additionalData.country || '',
      role: 'user',
      createdAt: new Date()
    };
    
    await setDoc(userDocRef, profile);
    
    // Also update Firebase Auth displayName for convenience
    const { updateProfile } = await import('@angular/fire/auth');
    await updateProfile(user, { 
      displayName: `${profile.firstName} ${profile.lastName}`.trim() 
    });
    
    return credential;
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

  async updateDisplayName(name: string) {
    const user = this.auth.currentUser;
    if (user) {
      const { updateProfile } = await import('@angular/fire/auth');
      return updateProfile(user, { displayName: name });
    }
    throw new Error('No user logged in');
  }

  /**
   * Updates the profile data in Firestore for the current user.
   */
  async updateProfileData(data: Partial<UserProfile>) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('No user logged in');
    
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    
    // Update Firestore
    await updateDoc(userDocRef, data as any);
    
    // If names are updated, also update Firebase Auth displayName
    if (data.firstName || data.lastName) {
      const { updateProfile } = await import('@angular/fire/auth');
      const currentProfile = await this.getUserProfile(user.uid);
      const newName = `${data.firstName || currentProfile?.firstName || ''} ${data.lastName || currentProfile?.lastName || ''}`.trim();
      await updateProfile(user, { displayName: newName });
    }
  }

  /**
   * Retrieves the full user profile from Firestore.
   */
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const snapshot = await getDoc(userDocRef);
    return snapshot.exists() ? snapshot.data() as UserProfile : null;
  }

  /**
   * Observable version of getUserProfile for reactive UIs.
   */
  getUserProfile$(uid: string): Observable<UserProfile | null> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return docData(userDocRef) as Observable<UserProfile | null>;
  }
}

