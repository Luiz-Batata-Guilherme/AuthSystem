import { UserCreate, UserDelete, UserUpdate } from "@/models/User/user.model";

import { PrismaService } from "@/lib/prisma";

export class RegisterService {
  constructor(private readonly prisma: typeof PrismaService) {}

  async register(body: UserCreate) {
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

  async update(id: string, body: UserUpdate) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...body,
      },
    });
    return user;
  }

  async delete(body: UserDelete) {
    await this.prisma.user.delete({
      where: { id: body.id },
    });
  }
}
