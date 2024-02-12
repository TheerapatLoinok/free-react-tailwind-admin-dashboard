import { http } from '../../utils/http';

export type ParamsType = {
  page?: number;
  limit?: number;
  conversationId?: number;
  conversationGroupId?: number;
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
    conversationGroupId: params.conversationGroupId,
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

export const setKeyPromptAPI = (prompt: string, model: string) => {
  const body = {
    prompt: prompt,
    model: model,
  };
  return http.post('/set/promt-model/test', body, {
    withAuth: true,
    withFromData: false,
  });
};

export const chatAPI = (question: string, uuid: string) => {
  const body = {
    question: question,
    uuid: uuid,
  };
  return http.post('/test/chat', body, { withAuth: true, withFromData: false });
};

export const searchContext = (question: string) => {
  const boddy = {
    question: question,
  };
  return http.post('/test/search-context-v2', boddy, {
    withAuth: true,
    withFromData: false,
  });
};

export const getSettingsModel = () => {
  return http.get('/get/setting-model-test-server', {}, true);
};
