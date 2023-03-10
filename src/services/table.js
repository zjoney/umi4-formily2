import Request from '@/utils/request';

export function query(params) {
  return Request.post('/api/getPatList', params);
}