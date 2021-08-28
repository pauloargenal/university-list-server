import jwt from "jsonwebtoken";
const APP_SECRET = "secret";

const getTokenPayload = (token) => {
  try {
    return jwt.verify(token, APP_SECRET);
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

const getUserId = (req, authToken) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // const token = req.headers["authorization"].replace(/^JWT\s/, '');
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else {
    const { userId } = getTokenPayload(authToken);
    console.log("[VOTE]", userId);
    return userId;
  }
  throw new Error("User not authentitcated");
};

export { APP_SECRET, getUserId };
