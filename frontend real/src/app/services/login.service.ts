import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:3000/auth";

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log("Iniciando login:", email, password);

    return this.httpClient.post<{ user_id: string, email: string }>(
      `${this.apiUrl}/login`, 
      { email, password }, 
      { withCredentials: true } 
    ).pipe(
      tap((value) => {
        console.log("Login bem-sucedido!", value);
      }),
      catchError((err) => {
        console.error("Erro na requisição de login:", err);
        return throwError(() => err);
      })
    );
  }

  signup(email: string, password: string): Observable<any> {
    console.log("Iniciando cadastro:", email, password);

    return this.httpClient.post<{ user_id: string, email: string }>(
      `${this.apiUrl}/register`,
      { email, password },
      { withCredentials: true }
    ).pipe(
      tap((value) => {
        console.log("Cadastro bem-sucedido!", value);
      }),
      catchError((err) => {
        console.error("Erro na requisição de cadastro:", err);
        return throwError(() => err);
      })
    );
  }

  validate(): Observable<boolean> {
    return this.httpClient.get<{ valid: boolean, user?: any }>(
      `${this.apiUrl}/validate`,
      { withCredentials: true }
    ).pipe(
      map(response => {
        console.log("Sessão validada:", response);
        return response.valid;
      }),
      catchError((err) => {
        console.error("Falha ao validar sessão:", err);
        return throwError(() => err);
      })
    );
  }

  logout(): Observable<any> {
   return this.httpClient.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }
}
