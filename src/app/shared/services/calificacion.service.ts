import { Injectable } from '@angular/core';
import {API_URL} from "../utilities/constants.utility";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Calificacion} from "../interfaces/calificacion";

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private apiUrl = API_URL;

  constructor(public http: HttpClient) {
  }

  getCalificacion(): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(`${this.apiUrl}/calificacion`);
  }

  saveCalificacion(calificacion: Calificacion): Observable<Calificacion> {
    return this.http.post<Calificacion>(`${this.apiUrl}/calificacion`, calificacion);
  }

  updateCalificacion(id: number | undefined, request: Calificacion): Observable<Calificacion> {
    return this.http.put<Calificacion>(`${this.apiUrl}/calificacion/${id}`, request);
  }

  deleteCalificacion(id: number | undefined): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/calificacion/${id}`, { responseType: 'text' as 'json' });
  }
}
