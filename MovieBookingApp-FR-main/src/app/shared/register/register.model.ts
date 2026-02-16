export interface RegisterRequest {
  FirstName: string;
  LastName: string;
  Email: string;
  UserName: string;
  ContactNumber: string;
  Passwordhash: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  // Add other fields based on your .NET API response, e.g.:
  // userId?: number;
}