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

  getPostById(id: number | undefined): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.apiUrl}/publicacion/${id}`);
  }

  searchPost(searchText: string): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.apiUrl}/publicacion/search?description=${searchText}`);
  }

  getCountlikes(id: number | undefined): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/publicacion/${id}/likes/count`)
  }

  getCommentsByPublication(id: number | undefined): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/publicacion/${id}/comment`)
  }

  deletePost(id: number | undefined): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/publicacion/${id}`, { responseType: 'text' as 'json' });
  }

  deleteComment(id: number | undefined): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/publicacion/${id}/comment`, { responseType: 'text' as 'json' });
  }
}
