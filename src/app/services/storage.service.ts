import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage = inject(Storage);

  /**
   * Uploads a file to Firebase Storage under the 'cars' folder.
   * Returns a Promise that resolves with the download URL.
   */
  async uploadCarImage(file: File, carName: string): Promise<string> {
    // Sanitize car name for folder structure
    const sanitizedName = carName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const uniqueFileName = `${Date.now()}_${file.name}`;
    const filePath = `cars/${sanitizedName}/${uniqueFileName}`;
    
    const storageRef = ref(this.storage, filePath);
    const uploadTask = await uploadBytesResumable(storageRef, file);
    
    // Get the public URL after successful upload
    return await getDownloadURL(uploadTask.ref);
  }
}
