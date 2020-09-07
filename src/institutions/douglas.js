const puppeteer = require('puppeteer');

const fs = require('fs');

const douglas = (async function douglas() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.douglascollege.ca/international-students/prospective-students/tuition-and-fees');

  const douglasData = await page.evaluate(() => {

    const value = document.querySelectorAll('p');
    const valueArray = [...value];

    const valuesList = valueArray.map(p => ({
      id: 1,
      values: p.innerHTML.slice(167, 175).concat(' CAD'),
      program: 'International Students',
      institution: 'Douglas College',
      city: 'Vancouver',
    }));

    function removes() {
      valuesList.splice(0,1);
      valuesList.splice(1,8);
    }
    removes();

    console.log(valuesList);

    return valuesList;

  });

  fs.writeFile('douglas.json', JSON.stringify(douglasData, null, 2), err => {
    if(err) throw new Error('something went wrong')

    console.log('Done!');
  })

  await browser.close();
});

module.exports = douglas;
