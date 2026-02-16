// movie.model.ts
export interface Movie {
  movieId: number;
  movieName: string;
  totalTickets: number;
  ticketStatus: string;
}

export interface MovieResponse {
  msg: string;
  data: Movie[]; // This matches your JSON structure
  status: number;
}


