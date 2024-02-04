import { http } from '../../utils/http';

export type ParamsType = {
  page: number;
  limit: number;
  conversationId?: number;
  startDate?: string;
  endDate?: string;
};
export const chatbotHistoryAPI = (params: ParamsType) => {
  const param = {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
    conversationId: params.conversationId,
    startDate: params.startDate,
    endDate: params.endDate,
  };
  return http.get(`/history-chat`, param, true);
};
