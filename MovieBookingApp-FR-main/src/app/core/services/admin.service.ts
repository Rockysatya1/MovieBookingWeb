import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    private apiUrl = `https://localhost:44337/api/v1.0/moviebooking/Admin`;

    constructor(private http: HttpClient) { }

    // Example method to get admin data
    // Add a new movie
    addMovie(movieData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/addmovie`, movieData);
    }

    // Delete a movie by ID passed in URL
    deleteMovie(movieId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete/${movieId}`);
    }

    updateTicketStatus(dto: { movieId: number; ticketStatus: string }): Observable<any> {
        return this.http.put(`${this.apiUrl}/update-ticket-status`, dto);
    }
}