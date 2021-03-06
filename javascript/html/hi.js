const fetch = require("node-fetch");

let part_url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getUltraSrtNcst?';
let serviceKey = 'MZVaUPWHOFbsrQMtZXU8n5rCRvizs2l%2FkejesIzGvC%2FTdgCs8iRrgK%2B5%2FgMoCKrH9%2BZzIiPO5S0WlGnNAdki4A%3D%3D';

var D = new Date();
var Year = D.getFullYear();
var Month = D.getMonth() + 1;
var Day = D.getDate();
var Hour = D.getHours();
let Time;
if (Hour == 0) { //시간이 00시일 때
    Time = "2300";
    if (Day == 1) {
        if (Month == 1) {
            Month = 12;
            Year -= 1;
            Day = 31;
        }
        else if (Month == 5 || Month == 7 || Month == 10 || Month == 12) {
            Month -= 1;
            Day = 30;
        }
        else if (Month == 2 || Month == 4 || Month == 6 || Month == 8 || Month == 9 || Month == 11) {
            Month -= 1;
            Day = 31;
        }
        else if (Month == 3) {
            Month -= 1;
            Day = 28;
        }
    }
    else
        Day -= 1;
}
else {
    if (Hour < 10)
        Time = "0"+ String(Hour - 1) + "00";
    else
        Time = String(Hour - 1) + "00";
}
if (Month < 10)
    Month = "0" + Month;
if (Day < 10)
    Day = "0" + Day;
var YYYYMMDD = String(Year) + String(Month) + String(Day);

var queryParams = encodeURIComponent('ServiceKey') + '=' + serviceKey
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('8');
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(String(YYYYMMDD));
queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(String(Time));
queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('88');
queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('89');

const url = part_url + queryParams;

//document.getElementById("demo2").innerHTML = url;
console.log(url);


//JSON
fetch(url)
    .then(res => res.json())
    .then(json => json.response.body.items.item)
    .then(item => {
        for (i in item) {
            let cat = item[i].category;
            let obser_V = item[i].obsrValue;
            if (cat == "PTY") {
                if (obser_V == 0) {
                    //document.getElementById("demo1").innerHTML = "asdf강수형태 : 비 안내림";
                    console.log("강수형태 : 비 안내림");
                }
                else if (obser_V == 1) {
                    //document.getElementById("demo1").innerHTML = "강수형태 : 비";
                    console.log("강수형태 : 비");
                }
                else if (obser_V == 2) {
                    //document.getElementById("demo1").innerHTML = "강수형태 : 강한 진눈깨비";
                    console.log("강수형태 : 강한 진눈깨비");
                }
                else if (obser_V == 3) {
                    //document.getElementById("demo1").innerHTML = "강수형태 : 눈";
                    console.log("강수형태 : 눈");
                }
                else if (obser_V == 4) {
                    //document.getElementById("demo1").innerHTML = "강수형태 : 소나기";
                    console.log("강수형태 : 소나기");
                }
                else if (obser_V == 5) {
                    //document.getElementById("demo1").innerHTML = "강수형태 : 빗방울";
                    console.log("강수형태 : 빗방울");
                }
                else if (obser_V == 6) {
                    //document.getElementById("demo1").innerHTML = "강수형태 : 약한 진눈깨비";
                    console.log("강수형태 : 약한 진눈깨비");
                }
                else if (obser_V == 7) {
                    //document.getElementById("demo1").innerHTML = "강수형태 : 눈날림";
                    console.log("강수형태 : 눈날림");
                }
            }
            else if (cat == "REH") {
                //document.getElementById("demo2").innerHTML = "습도 : " ,obser_V , "%";
                console.log("습도 : " + obser_V + "%");
            }
            else if (cat == "RN1") {
                //document.getElementById("demo3").innerHTML = "1시간 강수량 : " + obser_V + "%";
                console.log("1시간 강수량 : " + obser_V + "mm");
            }
            else if (cat == "T1H") {
                //document.getElementById("demo4").innerHTML = "온도 : " + obser_V + "%";
                console.log("온도 : " + obser_V + "℃");
            }
            else if (cat == "WSD") {
                //document.querySelector('#demo5').innerHTML = "풍속 :  " + obser_V + "m/s";
                console.log("풍속 : " + obser_V + "m/s");
            }
        }
    }
    )
    .catch((error) => console.log("error : ", error, String(YYYYMMDD)));