import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../utilities/constants.utility";
import {Observable} from "rxjs";
import {Admin} from "../interfaces/admin";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = API_URL;

  constructor(public http: HttpClient) {
  }

  getAdministradores(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}/admin`);
  }

  saveAdministrador(administrador: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}/admin`, administrador);
  }

  updateAdministrador(id: number | undefined, request: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.apiUrl}/admin/${id}`, request);
  }

  deleteAdministrador(id: number | undefined): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/admin/${id}`, { responseType: 'text' as 'json' });
  }


}
