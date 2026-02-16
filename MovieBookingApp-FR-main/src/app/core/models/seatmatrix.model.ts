export interface SeatMatrixData {
  movieId: number;
  movieName: string;
  originalSeatNumbers: string[];
  bookedSeatNumbers: string[];
  availableSeatNumbers: string[];
}

export interface SeatMatrixResponse {
  status: number;
  message: string;
  data: SeatMatrixData;
}

export interface BookingRequest {
  movieId: number;
  userId: number | null;
  seatNumbers: string[];
  //numberOfTickets: number;
}