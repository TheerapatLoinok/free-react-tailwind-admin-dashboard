import { http } from '../../utils/http';

export type ParamsType = {
  page: number;
  limit: number;
  conversationId?: number;
  startDate?: string;
  endDate?: string;
};

export type CoverttoVectorType = {
  file: File;
  chunk: string;
  overlap: string;
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

export const convertFiletoVector = (payload: CoverttoVectorType) => {
  return http.post('/learning/upload-data-learning', payload, {
    withAuth: true,
    withFromData: true,
  });
};

export const setNumberofChunckAPI = (chunck: number) => {
  const body = {
    numberChunk: chunck,
  };
  return http.post('/set/number-chunk-test', body, {
    withAuth: true,
    withFromData: false,
  });
};
