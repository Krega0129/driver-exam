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

export function autoCreateExam(data) {
  return chRequest({
    url: URL.AUTOCREATEEXAM,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function examJudge(data) {
  return chRequest({
    url: URL.EXAMJUDGE,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getHistory() {
  return chRequest({
    url: URL.GETHISTORY
  })
}

export function analysisExam() {
  return chRequest({
    url: URL.ANALYSISEXAM
  })
}

export function analysis() {
  return chRequest({
    url: URL.ANALYSIS
  })
}

export function getExamRank(data) {
  return chRequest({
    url: URL.GETEXAMRANK,
    params: data
  })
}