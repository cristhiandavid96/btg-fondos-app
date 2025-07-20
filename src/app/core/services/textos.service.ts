import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TextosService {
  private textos: Record<string, string> = {};
  private readonly cargado$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {
    // Initialization moved to init() method
    this.init();
  }

  async init(): Promise<void> {
    await this.cargar();
  }

  async cargar(): Promise<void> {
    const data = await firstValueFrom(
      this.http.get<Record<string, string>>('/assets/i18n/es.json')
    );
    this.textos = data ?? {};
    this.cargado$.next(true);
  }

  get(key: string): string {
    return this.textos[key] ?? `??${key}??`;
  }

  getCargado$() {
    return this.cargado$.asObservable();
  }
}