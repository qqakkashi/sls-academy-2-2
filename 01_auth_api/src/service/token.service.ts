import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/./../../../.env" });

class TokenService {
  generateTokens(id: string) {
    const access_token = jwt.sign({ id }, process.env.JWT_ACCESS_WORD!, {
      expiresIn: process.env.JWT_ACCESS_TTL!,
    });
    const refresh_token = jwt.sign({ id }, process.env.JWT_REFRESH_WORD!, {
      expiresIn: process.env.JWT_REFRESH_TTL!,
    });

    return { user_id: id, access_token, refresh_token };
  }
}

export default new TokenService();
