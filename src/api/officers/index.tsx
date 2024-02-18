import { http } from '../../utils/http';

export const GetOfficers = ({
  page,
  limit,
  username,
  userId,
}: {
  page: number;
  limit: number;
  username?: string;
  userId?: number;
}) => {
  const params = {
    page: page ?? 1,
    limit: limit ?? 10,
    userId: userId,
    username: username,
  };
  return http.get(`/admin/get-admin-paginate`, params, true);
};
