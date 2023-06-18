export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  name: string;
  password: string;
  // dateOfBirth: Date;
  // gender: string;
  confirmPassword?: string
}

export interface IForgotPassword {
  email: string;
}

export interface IChangePassword {
  password: string;
  token: string;
}