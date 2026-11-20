import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface Utilisateur {
  readonly login: string;
  readonly roles: readonly string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private credentialsEnMemoire: string | null = null;

  readonly utilisateur = signal<Utilisateur | null>(null);

  async connecter(login: string, motDePasse: string): Promise<void> {
    const credentials = btoa(`${login}:${motDePasse}`); 
    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}` 
    });

    const user = await firstValueFrom(
      this.http.get<Utilisateur>('/api/me', { headers })
    );

    this.credentialsEnMemoire = credentials; 
    this.utilisateur.set(user);
  }

  getCredentials(): string | null {
    return this.credentialsEnMemoire;
  }

  deconnecter(): void {
    this.credentialsEnMemoire = null;
    this.utilisateur.set(null);
  }
}