import { SignInInputs } from '../../pages/Authentication/SignIn';
import { http } from '../../utils/http';

export const SignInAPI = async ({ userName, password }: SignInInputs) => {
  const body = {
    username: userName,
    password: password,
  };
  return await http.post(`/signin`, body, {
    withAuth: false,
    withFromData: false,
  });
};
