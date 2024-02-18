import { http } from '../../utils/http';

export const GetOfficers = ({
  page,
  limit,
  keywords,
}: {
  page: number;
  limit: number;
  keywords?: string;
}) => {
  const params = {
    page: page ?? 1,
    limit: limit ?? 10,
    username: keywords,
  };
  return http.get(`/admin/get-admin-paginate`, params, true);
};
export const GetLogs = ({
  page,
  limit,
  keywords,
}: {
  page: number;
  limit: number;
  keywords?: string;
}) => {
  const params = {
    page: page ?? 1,
    limit: limit ?? 10,
    searchDetail: keywords,
  };
  return http.get(`/logs/admin-log`, params, true);
};
export const ActiveAdmin = () => {
  return http.get('/get/adminIntercom', {}, true);
};

export const AssignmentAdmin = (id: string) => {
  return http.get(`/assign/adminIntercom/${id}`, {}, true);
};
