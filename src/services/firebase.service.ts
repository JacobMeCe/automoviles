import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private storage: Storage) {}

  /**
   * @description Upload a file to Firebase Storage,
   * and return a URL to access it
   * @exampleReturn 'https://firebasestorage.googleapis.com/v0/b/...'
   * @param file
   * @param name
   */
  async uploadImage(file: File, name: string): Promise<string> {
    const imageRef = ref(this.storage, `vehicles/images/${name}`);
    try {
      const snapshot = await uploadBytes(imageRef, file);
      console.log('Uploaded a blob or file!', getDownloadURL(snapshot.ref));
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * @description Get a file from Firebase Storage by its path
   * @examplePath 'vehicles/images/abc123.jpg'
   * @param path
   */
  async getImageByPath(path: string): Promise<string> {
    const imageRef = ref(this.storage, path);
    try {
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
