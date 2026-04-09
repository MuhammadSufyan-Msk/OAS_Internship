import { Injectable, inject } from '@angular/core'; // From @angular/core
import { HttpClient } from '@angular/common/http'; // From @angular/common/http
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Data {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  async getGridData(): Promise<any[]> {
    try {
      const response = await firstValueFrom(this.http.get<any[]>(this.API_URL));
      localStorage.setItem('grid_backup', JSON.stringify(response));
      return response;
    } catch (error) {
      const backup = localStorage.getItem('grid_backup');
      return backup ? JSON.parse(backup) : [];
    }
  }
}