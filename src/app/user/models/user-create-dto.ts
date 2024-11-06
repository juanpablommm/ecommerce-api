export class UserCreateDto {
    names: string;
    surnames: string;
    username: string;
    password: string;
    email: string;
    roles: string[];
  
    constructor(names: string, surnames: string, username: string, password: string, email: string, roles: string[]) {
      this.names = names;
      this.surnames = surnames;
      this.username = username;
      this.password = password;
      this.email = email;
      this.roles = roles;
    }
  }