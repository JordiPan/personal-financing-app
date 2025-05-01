interface RegisterResponse {
    message: string;
    user: {
      id: number;
      fName: string;
      lName: string;
      date: Date;
      
    };
    token: string;
  }