import axios from 'axios';
import { CovidData } from './util';

function $<T extends HTMLElement>(selector: string) {
  const element = document.querySelector(selector);
  return element as T;
}

const STATE_DT = $('.covid-state-dt'); // 기준일
const ACC_EXAM_CNT = $('.covid-acc_exam_cnt'); // 누적 검사 수
const ACC_DEF_RATE = $('.covid-acc-def_rate'); // 누적 확진률

const DECIDE_CNT = $('.covid-decide-cnt'); // 누적 확진자 수
const EXAM_CNT = $('.covid-exam-cnt'); // 검사진행 수
const DEATH_CNT = $('.covid-death-cnt'); // 사망자 수
const CARE_CNT = $('.covid-care-cnt'); // 치료중 환자 수

const ONE_STATE_DT = $('.covid-one-state-dt'); // 가장 최근 날
const TWO_STATE_DT = $('.covid-two-state-dt'); // 2번째 최근 날
const THREE_STATE_DT = $('.covid-three-state-dt'); // 3번째 최근 날

const ONE_DECIDE_CNT = $('.covid-one-decide-cnt');
const ONE_DEATH_CNT = $('.covid-one-death-cnt');

const TWO_DECIDE_CNT = $('.covid-two-decide-cnt');
const TWO_DEATH_CNT = $('.covid-two-death-cnt');

const THREE_DECIDE_CNT = $('.covid-three-decide-cnt');
const THREE_DEATH_CNT = $('.covid-three-death-cnt');

function stackRate(rate: CovidData) {
  STATE_DT.innerText = rate.stateDt.toString();
  ACC_EXAM_CNT.innerText = `${rate.accExamCnt.toString()}건`;
  ACC_DEF_RATE.innerText = `${rate.accDefRate.toString()}%`;
  DECIDE_CNT.innerText = `${rate.decideCnt.toString()}명`;
  DEATH_CNT.innerText = `${rate.deathCnt.toString()}명`;
  CARE_CNT.innerText = `${rate.careCnt.toString()}명`;
}

function todayOneRate(pastRate: CovidData, todayRate: CovidData) {
  ONE_DECIDE_CNT.innerText = String(todayRate.decideCnt - pastRate.decideCnt);
  ONE_DEATH_CNT.innerText = String(todayRate.deathCnt - pastRate.deathCnt);
}

function todayTwoRate(pastRate: CovidData, todayRate: CovidData) {
  TWO_DECIDE_CNT.innerText = String(todayRate.decideCnt - pastRate.decideCnt);
  TWO_DEATH_CNT.innerText = String(todayRate.deathCnt - pastRate.deathCnt);
}

function todayThreeRate(pastRate: CovidData, todayRate: CovidData) {
  THREE_DECIDE_CNT.innerText = String(todayRate.decideCnt - pastRate.decideCnt);
  THREE_DEATH_CNT.innerText = String(todayRate.deathCnt - pastRate.deathCnt);
}

axios.get('http://localhost:3000/reset').then(res => {
  const result: CovidData[] = res.data;
  console.log(result);

  stackRate(result[0]);
  todayOneRate(result[1], result[0]);
  todayTwoRate(result[2], result[1]);
  todayThreeRate(result[3], result[2]);

  ONE_STATE_DT.innerText = result[0].stateDt.toString();
  TWO_STATE_DT.innerText = result[1].stateDt.toString();
  THREE_STATE_DT.innerText = result[2].stateDt.toString();
});
