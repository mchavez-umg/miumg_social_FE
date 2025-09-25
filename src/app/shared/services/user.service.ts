import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../utilities/constants.utility";
import {Observable} from "rxjs";
import {Usuario} from "../interfaces/usuario";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = API_URL;

  constructor(public http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/authenticate`, { username, password }, { responseType: 'text' as 'json' });
  }

  getAllUsers(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuario`)
  }


  updateUser(id: number | undefined, request: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuario/${id}`, request);
  }

}

