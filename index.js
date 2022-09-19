#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title USD to RUB
// @raycast.mode inline
// @raycast.refreshTime 1h

// Optional parameters:
// @raycast.icon 🤑

// Documentation:
// @raycast.description USD to RUB exchange rate
// @raycast.author Denis Marushchak
// @raycast.authorURL https://github.com/nova4u

const fetch = require("node-fetch");
const cheerio = require("cheerio");

(async () => {
  try {
    const response = await fetch(
      `https://www.moex.com/en/derivatives/currency-rate.aspx?currency=USD_RUB`
    );
    const data = await response.text();
    const $ = cheerio.load(data);

    const outputArr = $("#ctl00_PageContent_tbxCurrentRate")
      .text()
      .split("as of");

    outputArr[1] = "Updated:" + outputArr[1];

    console.log(outputArr.join("").replace("Current rate:  ", ""));
  } catch (error) {
    console.log(error.message);
  }
})();
