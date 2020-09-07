const puppeteer = require('puppeteer');

const fs = require('fs');

const capilano = (async function capilano() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.capilanou.ca/admissions/fees--finances/tuition--fees/tuition--fee-estimator/index.php');

  const capilanoData = await page.evaluate(() => {

    const value = document.querySelectorAll('div p');
    const program = document.querySelectorAll('h3');
    const valueArray = [...value];
    const programArray = [...program];

    const valuesList = valueArray.map(p => ({
      values: p.innerHTML
    }));
    const programList = programArray.map(h3 => ({
      program: h3.innerHTML
    }));

  function removes() {
    valuesList.splice(0,12);
    valuesList.splice(1,1);
    valuesList.splice(1,1);
    valuesList.splice(2,2);
    valuesList.splice(3,2);
    valuesList.splice(4,6);
    programList.splice(4,2);
  }
  removes();
  const values1 = valuesList[0].values.slice(65,75);
  const values2 = valuesList[1].values.slice(79,89);
  const values3 = valuesList[2].values.slice(56,66);
  const values4 = valuesList[3].values.slice(58,68);
  const obj = [values1, values2, values3, values4];
    
  const capilano = obj.map((obj, index) => {
    return {
      id: index + 1,
      ...programList[index],
      values: obj,
      institution: 'Capilano University',
      city: 'Vancouver',
    }
  })

  return capilano;
  });

  fs.writeFile('capilano.json', JSON.stringify(capilanoData, null, 2), err => {
    if(err) throw new Error('something went wrong')

  })

  await browser.close();
});

module.exports = capilano;
