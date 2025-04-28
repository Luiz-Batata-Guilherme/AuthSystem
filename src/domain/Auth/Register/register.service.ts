import { PrismaService } from "@/lib/prisma";
import { RegisterDTO } from "@/models/User/register.dto";
import { password } from "bun";

export class RegisterService {
  constructor(private readonly prisma: typeof PrismaService) {}

  async register(body: RegisterDTO) {
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

  async update(id: string, body: RegisterDTO) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...body,
      },
    });
    return user;
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
