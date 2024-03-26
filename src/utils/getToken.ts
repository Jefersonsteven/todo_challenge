interface Token {
  access_token: string;
  token_type: string;
  user: string;
}

const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return JSON.parse(token) as Token;
  }
};

export default getToken;
