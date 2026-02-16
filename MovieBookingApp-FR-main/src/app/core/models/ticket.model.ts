import { Movie } from './movie.model';
export interface Ticket {
  ticketId: number;
  movieId: number;
  movieName: string;
  seatNumber: string;
}

export interface TicketResponse {
  msg: string;
  data: Ticket[];
  status: number;
}