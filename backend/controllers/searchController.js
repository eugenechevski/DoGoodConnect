const searchService = require('../services/searchService');

exports.getSearchResource = async (req, res) => {
  const query = req.query.q;
  if (!query) { res.status(400).send('You didn\'t include the the search query'); }

  try {
    const results = await searchService.getEvents(query);
    res.status(200).json({ message: 'Success', data: results });
  }
  catch (error) {
    res.status(500).send(`Error fetching search results ${error}`);
  }
};
