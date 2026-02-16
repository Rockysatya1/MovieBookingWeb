export interface LoginRequest {
  loginid: string;
  password: string;
}   

export interface LoginData {
    firstName: string;
    lastName: string;
    email: string;
    loginID: string;
    contactNumber: string;
    userType: number;
    userId: number;
    token: string;
}

export interface LoginResult {
    status: number;
    message: string;
    id: number | null;
    data: LoginData;
}

export interface LoginResponse {
    msg: string;
    result: LoginResult;
}