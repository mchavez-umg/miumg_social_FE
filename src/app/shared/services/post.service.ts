import { Injectable } from '@angular/core';
import {API_URL} from "../utilities/constants.utility";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Publicacion} from "../interfaces/publicacion";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = API_URL;

  constructor(public http: HttpClient) {}

  getAllPost(): Observable<Publicacion[]>{
    return this.http.get<Publicacion[]>(`${this.apiUrl}/publicacion`)
  }

  getAllLikes(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/publicacion/likes/total`)
  }
}
