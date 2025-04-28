import { PrismaService } from "@/lib/prisma";
import { UserLogin } from "@/models/User/user.model";

export class LoginService {
  constructor(private readonly prisma: typeof PrismaService) {}

  async login(body: UserLogin) {}
}
