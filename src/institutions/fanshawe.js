const puppeteer = require('puppeteer');
const fs = require('fs');

const fanshawe = (async function fanshawe() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.fanshawec.ca/paying-college/tuition-fees/tuition-fees');

  const fanShaweData = await page.evaluate(() => {

    const value = document.querySelectorAll('div .highlight-box');
    const valueArray = [...value];
    const valuesList = valueArray.map((div) => ({
      id: 1,
      program: div.innerHTML.slice(8, 30),
      values: div.innerHTML.slice(132, 143),
      institution: 'Fanshawe Collage',
      city: 'Toronto',
    }));

    function removes() {
      valuesList.splice(0,3);
      valuesList.splice(1,2);
    }
    removes();

    return valuesList;
  });

  fs.writeFile('fanshawe.json', JSON.stringify(fanShaweData, null, 2), err => {
    if(err) throw new Error('something went wrong')

  })

  await browser.close();
});

module.exports = fanshawe;
