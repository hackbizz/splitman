import { getUserFromUsernameDb,getUserNameFromRegexDb } from "../db/user.db.js";
import { ErrorHandler } from "../middlewares/error.js";

class UserService {
  static getUserFromUsername = async (data) => {
    try {
      return await getUserFromUsernameDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };
  static getUserNameFromRegex = async (data) => {
    try {
      return await getUserNameFromRegexDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };
}

export default UserService;
