import { Injectable, inject, PLATFORM_ID } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { isPlatformBrowser } from '@angular/common'; // Import this helper
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Data {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID); // Inject Platform ID to detect environment
  private readonly API_URL = environment.apiUrl;

  async getGridData(): Promise<any[]> {
    // Check if we are currently running in the browser
    const isBrowser = isPlatformBrowser(this.platformId);

    try {
      const response = await firstValueFrom(this.http.get<any[]>(this.API_URL));
      
      // Only use localStorage if the browser is available
      if (isBrowser) {
        localStorage.setItem('grid_backup', JSON.stringify(response));
      }
      
      return response;
    } catch (error) {
      console.warn('API call failed, attempting to load from local storage...');
      
      // Fallback to localStorage only if in browser
      if (isBrowser) {
        const backup = localStorage.getItem('grid_backup');
        return backup ? JSON.parse(backup) : [];
      }
      
      return []; // Return empty array if on server or no backup exists
    }
  }
}