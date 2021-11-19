import chRequest from './request';
import * as URL from './options';

export function login(data) {
  return chRequest({
    url: URL.LOGIN,
    method: 'POST',
    data: data
  })
}