export interface RegisterResponse {
    message: string;
    user: {
      first_name: string;
      last_name: string;
      birth_date: Date;
      email: string;
      password: string;
      id: number;
    };
    token: string;
  }