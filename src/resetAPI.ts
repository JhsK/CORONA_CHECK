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

axios.get('http://localhost:3000/reset').then(res => {
  const result: CovidData = res.data;
  console.log(result);

  // STATE_DT.innerText = result.stateDt.toString();
  // ACC_EXAM_CNT.innerText = `${result.accExamCnt.toString()}건`;
  // ACC_DEF_RATE.innerText = `${result.accDefRate.toString()}%`;

  // DECIDE_CNT.innerText = `${result.decideCnt.toString()}명`;
  // DEATH_CNT.innerText = `${result.deathCnt.toString()}명`;
  // CARE_CNT.innerText = `${result.careCnt.toString()}명`;
});
