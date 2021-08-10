const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

function CalDate() {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();

  let result = [];
  if (todayMonth < 10) {
    result.push(`${todayYear}0${todayMonth}${todayDate - 3}`);
    result.push(`${todayYear}0${todayMonth}${todayDate}`);
  } else {
    result.push(`${todayYear}${todayMonth}${todayDate - 3}`);
    result.push(`${todayYear}${todayMonth}${todayDate}`);
  }

  return result;
}

const urlDate = CalDate();

const url = `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=Q3CYAtHS7fxCOqd8Kns3aZJmrmuioRJoSSKZv7GeVPhoVgX8oKevWlLyBT0NGMkHaVWihIRaOwEM2v5CKVqtGA%3D%3D&pageNo=1&numOfRows=10&startCreateDt=20210808&endCreateDt=${urlDate[1]}`;

const covidFetch = (req, res) => {
  axios
    .get(url)
    .then(result => {
      const fetchData = result.data.response.body.items.item;
      return fetchData;
    })
    .then(fetchData => {
      res.json(fetchData);
    });
};

app.get('/reset', (req, res) => {
  covidFetch(req, res);
});

app.listen(3000, () => {
  console.log('서버 실행 중');
});
