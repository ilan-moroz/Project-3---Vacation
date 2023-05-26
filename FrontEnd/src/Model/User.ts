export class User {
  public firstName: string;
  public lastName: string;
  public email?: string;
  public password?: string;
  public role: string;
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
