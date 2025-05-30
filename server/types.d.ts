// Custom type definitions for Express
import { UserPayload } from "../api/auth";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
