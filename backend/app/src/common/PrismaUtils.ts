import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HttpsError } from "./http-error";

export default class PrismaUtils {
  static getHttpException(e: any) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return new HttpsError("already-exists", "already-exists", e);
      }
      if (e.code === "P2025") {
        return new HttpsError("invalid-argument", "not found", e);
      }
    }

    return new HttpsError("internal", "internal server error", e);
  }
}
