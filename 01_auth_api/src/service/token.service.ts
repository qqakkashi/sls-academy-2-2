import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/./../../../.env" });

class TokenService {
  generateTokens(id: string) {
    const access_token = jwt.sign({ id }, process.env.JWT_ACCESS_WORD!, {
      expiresIn: "20s" || process.env.JWT_ACCESS_TTL!,
    });
    const refresh_token = jwt.sign({ id }, process.env.JWT_REFRESH_WORD!, {
      expiresIn: process.env.JWT_REFRESH_TTL!,
    });

    return { user_id: id, access_token, refresh_token };
  }

  verifyToken(token: string) {
    try {
      const verifyToken = jwt.verify(token, process.env.JWT_ACCESS_WORD!);
      return true;
    } catch (error: any) {
      return false;
    }
  }
}

export default new TokenService();
