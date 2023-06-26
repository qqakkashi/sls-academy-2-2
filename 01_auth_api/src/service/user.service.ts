import { pool } from "../config/db.config";

class UserService {
  async getCurrentUser(access_token: string) {
    const userId = await pool.query(
      "SELECT id FROM tokens WHERE access_token=$1",
      [access_token]
    );
    const userEmail = await pool.query("SELECT email FROM users WHERE id=$1", [
      userId.rows[0].id,
    ]);
    return {
      success: true,
      data: {
        id: userId.rows[0].id,
        email: userEmail.rows[0].email,
      },
    };
  }
}

export default new UserService();
