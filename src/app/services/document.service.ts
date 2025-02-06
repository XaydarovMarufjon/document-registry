import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) {}

  createDocument(document: any): Observable<any> {
    return this.http.post(this.apiUrl, document);
  }

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDocumentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateDocument(id: string, document: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, document);
  }

  deleteDocument(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
