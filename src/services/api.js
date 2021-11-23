import chRequest from './request';
import * as URL from './options';

export function login(data) {
  return chRequest({
    url: URL.LOGIN,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function register(data) {
  return chRequest({
    url: URL.REGISTER,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function checkUserName(data) {
  return chRequest({
    url: URL.CHECKUSERNAME,
    params: data
  })
}

export function getQuestion(data) {
  return chRequest({
    url: URL.GETQUESTION,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function questionJudge(data) {
  return chRequest({
    url: URL.QUESTIONJUDGE,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function starQuestions(data) {
  return chRequest({
    url: URL.STARQUESTIONS,
    params: data
  })
}

export function star(data) {
  return chRequest({
    url: URL.STAR,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function deleteStar(data) {
  return chRequest({
    url: URL.DELETESTAR,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function woringQuestion(data) {
  return chRequest({
    url: URL.WORINGQUESTION,
    params: data
  })
}

export function getUserInfo() {
  return chRequest({
    url: URL.GETUSERINFO
  })
}