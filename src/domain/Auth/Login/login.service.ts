import { PrismaService } from "@/lib/prisma";
import { UserLogin } from "@/models/User/user.model";

export class LoginService {
  constructor(private readonly prisma: typeof PrismaService) {}

  async findUser(body: UserLogin) {
    const user = await this.prisma.user.findUnique({
      where: {
        whatsapp: body.whatsapp,
      },
      select: {
        id: true,
        role: true,
        name: true,
        whatsapp: true,
        password: true,
      },
    });
    return user;
  }

  async updateUserRefreshToken(id: string, refreshToken: string) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
    return user;
  }
}
