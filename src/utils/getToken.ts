import { Token } from "@/types";
import Cookies from "js-cookie";

const getToken = () => {
  const data = Cookies.get("token");
  const token: Token | undefined = data ? JSON.parse(data) : undefined;

  if (token) return token;
  return null;
};

export default getToken;
