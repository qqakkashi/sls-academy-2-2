import bcrypt from "bcrypt";
import { pool } from "../config/db.config";
import TokenService from "./token.service";
import ApiError from "../exeptions/api.errors";

class AuthService {
  async singUpUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 3);
    const newUser = await pool.query(
      "INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *",
      [email, hashedPassword]
    );
    const tokens = TokenService.generateTokens(newUser.rows[0].id);
    const insertTokens = await pool.query(
      "INSERT INTO tokens (id,access_token,refresh_token) VALUES ($1,$2,$3) RETURNING *",
      [tokens.user_id, tokens.access_token, tokens.refresh_token]
    );
    return {
      success: true,
      data: {
        id: insertTokens.rows[0].id,
        access_token: insertTokens.rows[0].access_token,
        reshresh_token: insertTokens.rows[0].refresh_token,
      },
    };
  }

  async signInUser(email: string, password: string) {
    const findUser = await pool.query(
      "SELECT id,password FROM users WHERE email=$1",
      [email]
    );
    if (findUser.rows.length === 0) {
      throw ApiError.UserNotFound(`User with email:${email} not found`);
    }
    const comparePasswords = bcrypt.compare(
      password,
      findUser.rows[0].password
    );
    if (!comparePasswords) {
      throw ApiError.Conflict(`Wrong password for user with email:${email}`);
    }
    const tokens = await pool.query(
      "SELECT id,access_token,refresh_token FROM tokens WHERE id=$1",
      [findUser.rows[0].id]
    );
    return {
      success: true,
      data: {
        id: findUser.rows[0].id,
        access_token: tokens.rows[0].access_token,
        refresh_token: tokens.rows[0].refresh_token,
      },
    };
  }
}

export default new AuthService();
