import { RegisterService } from "./register.service";

export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  register() {
    return {
      message: "Register endpoint",
    };
  }

  login() {
    return {
      message: "Login endpoint",
    };
  }

  update() {
    return {
      message: "Update endpoint",
    };
  }

  delete() {
    return {
      message: "Delete endpoint",
    };
  }
}
