import { PrismaService } from "@/lib/prisma";
import { User } from "@prisma/client";

export class UserService {
  constructor(private readonly prisma: typeof PrismaService) {}

  async me(body: User) {
    const password = await Bun.password.hash(body.password, {
      algorithm: "bcrypt",
      cost: 10,
    });
    const user = await this.prisma.user.create({
      data: {
        ...body,
        password,
      },
    });
    return user;
  }
}
