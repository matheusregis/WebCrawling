const puppeteer = require('puppeteer');
const fs = require('fs');

const centennial = (async function centennial() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.centennialcollege.ca/admissions/tuition-and-fees/tuition-information/');

  const centennialData = await page.evaluate(() => {

    const nodeList = document.querySelectorAll('div .data')
    const h2List = document.querySelectorAll('h2')
    const h2Array = [...h2List]
    const tbodyArray = [...nodeList];
    const valuesList = tbodyArray.map((td) => ({
      values: td.innerHTML
    }));

    const programList = h2Array.map(function (h2) {
      return {
      program: h2.innerHTML
      }
    });

    function removes() {
      valuesList.splice(0,3);
      valuesList.splice(6,4);
      valuesList.splice(10,4);
      valuesList.splice(14,2);
      valuesList.splice(16,28);
      programList.splice(0,3);
      programList.splice(5,2);
    }
    removes();

    const values1 = [valuesList[0], valuesList[1], valuesList[2]];
    const values2 = [valuesList[3], valuesList[4], valuesList[5]];
    const values3 = [valuesList[6], valuesList[7], valuesList[8], valuesList[9]];
    const values4 = [valuesList[10], valuesList[11], valuesList[12], valuesList[13]];
    const values5 = [valuesList[14], valuesList[15]];
    const obj = [values1, values2, values3, values4, values5]

    const centennial = obj.map((obj, index) => {
      return {
        id: index + 1,
        ...programList[index],
        values: {...obj},
        institution: 'Centennial College',
        city: 'Toronto',
      }
    })

    return centennial;
  });

  fs.writeFile('centennial.json', JSON.stringify(centennialData, null, 2), err => {
    if(err) throw new Error('something went wrong')

  })

  await browser.close();
});

module.exports = centennial;
