const axios = require('axios');
const puppeteer = require('puppeteer');
const language = require('@google-cloud/language');

const client = new language.LanguageServiceClient();
// Example usage

const getEvents = async (query) => {
  const searchResults = await fetchSearchLinks(query);
  const links = await extractLinks(searchResults);
  const text = await extractHtml(links);
  const entities = await extractEntities(text);
  const shrinkedEntities = await shrinkEntities(entities);

  return shrinkedEntities;
};

const fetchSearchLinks = async (query) => {
  const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
    params: {
      key: process.env.GOOGLE_SEARCH_API_KEY,
      cx: process.env.GOOGLE_SEARCH_CX,
      q: query,
    },
  });
  return response.data;
};

const extractLinks = async (results) => {
  const links = results.items.map(item => ({ link: item.link, title: item.title, image: item.pagemap.cse_thumbnail[0].src }));
  return links;
};

const extractHtml = async (links) => {
  const textArray = [];
  for (const link of links) {
    const text = await extractTextFromUrl(link.link);
    const emailList = extractUniqueEmailPatterns(text);
    textArray.push({ text: text, link: link.link, title: link.title, image: link.image, emails: emailList });
  }
  return textArray;
};

const extractTextFromUrl = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  console.log('EVAL Start: ', );
  const extractedText = await page.$$eval('p', elements =>
    elements.map(el => el.innerText)
  );
  console.log('EVAL End: ', );
  await browser.close();
  return extractedText.join(" ");
};

const chunkHtml = (text, maxChunkSize = 900000) => {
  return text.slice(0, maxChunkSize);
};

const extractEntities = async (texts) => {
  const results = [];
  for (const text of texts) {
    console.log('Processing document!');
    const result = await analyzeEntitiesFromHtml(text.text);
    if (result) {
      results.push({ link: text.link, entities: result, title: text.title, image: text.image, emails: text.emails });
    }
  }
  return results;
};

const analyzeEntitiesFromHtml = async (text) => {
  try {
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    const [result] = await client.analyzeEntities({ document });
    return result.entities;
  }
  catch (error) {
    console.warn('Skipping analysis due.');
    return null;
  }
};

const extractUniqueEmailPatterns = (text) => {
  const emailPattern = /\b\w+@\w+\.\w+\b/g;
  const matches = text.match(emailPattern);
  const uniqueEmails = new Set(matches);
  return Array.from(uniqueEmails);
}

const shrinkEntities = async (entities) => {
  const result = [];
  for (const file of entities) {
    const newEntities = [];
    const phones = [];
    const addresses = [];
    for (const entity of file.entities) {
      if (entity.type === 'LOCATION') {
        if (/\d/.test(entity.name)) {
          addresses.push(entity.name);
        }
      }
      else if (entity.type === 'ADDRESS') {
        if (/\d/.test(entity.name)) {
          addresses.push(entity.name);
        }
      } else if (entity.type === 'PHONE_NUMBER') {
        phones.push(entity.name);
      }
    }
    result.push({ title: file.title, link: file.link, location: addresses, phone: phones, email: file.emails, image: file.image });
  }
  return result;
};

module.exports = {
  getEvents,
};
