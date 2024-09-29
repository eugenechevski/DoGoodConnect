import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SearchResult {
  title: string;
  link: string;
  location: string[];
  phone: string[];
  email: string[];
  image: string;
}

export interface SearchResponse {
  message: string;
  data: SearchResult[];
}

@Injectable({
  providedIn: 'root'
})

export class SearchResultsService {
  constructor(private http: HttpClient) {}

  getSearchResults(): Observable<SearchResult[]> {
    // Replace this URL with the actual endpoint where your JSON data is hosted
    return this.http.get<SearchResponse>('assets/sample.json').pipe(
      map(response => response.data)
    );
  }
}