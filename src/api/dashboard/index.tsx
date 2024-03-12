import { http } from '../../utils/http';

export const GetStatistics = () => {
  return http.get(`/admin/get-chat-stat`, {}, true);
};
