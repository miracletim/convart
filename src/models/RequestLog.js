import { query } from "../config/database.js";
import { supabase } from "../config/superbase.js";
class RequestLog {
  /**
   * Create a request log
   * @param {Object} reqData - Request data (route, region, timestamp)
   * @returns {Object} Created request log
   */
  static async log({ route, region }) {
    const schema = supabase.schema("public");
    const result = await query(
      `INSERT INTO requestlogs (route, region)
       VALUES ($1, $2)
       RETURNING id, route, region, created_at`,
      [route, region],
    );
    return result.rows[0];
  }
}

export default RequestLog;
