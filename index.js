const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; 
app.use(express.json());

app.get('/gpt4o', async (req, res) => {
  try {
    const { query } = req.query; // Use req.query for GET request

    if (!query) {
      return res.status(400).send({ error: 'Query is required' });
    }

    const data = {
      chatSessionId: "acab4b36-51b8-4320-bcb4-cacc1b45aa70",
      messages: [
        { role: 'user', content: query }
      ]
    };

    const config = {
      method: 'POST',
      url: 'https://copyofgeneralassistant-27005.chipp.ai/api/chat',
      headers: {
        'authority': 'copyofgeneralassistant-27005.chipp.ai',
        'method': 'POST',
        'path': '/api/chat',
        'scheme': 'https',
        'accept': '/',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'cookie': 'GAESA=Co4BMDBjYTM2OTVkMmY2ZDZhNWM4MWE4NWQzODk0NjE3YjE1ZGY0YmM3N2JkNTkyZDJjNDU4NmFmY2QyYzJmZmU1NWY0MzM1MjQzYzZhMGRkNTlmMjE3NTM5NDM2OTM4Y2VjMDY1OGMyMDBmYzVjZWI0NjQ0MmNkOTA5ZGNkZj72MTRiYzIyZTdiOTAxNGFhZhDcvv_FxzI; ph_phc_58R4nRj6BbHvFBIwUiMlHyD8X7B5xrup5HMX1EDFsFw_posthog=%7B%22distinct_id%22%3A%2201940c48-8dc5-7fbd-88df-b4c0918de7e9%22%2C%22%24sesid%22%3A%5B1737192630826%2C%22019478bf-ea2a-7122-9f7c-308c9880319b%22%2C1737192630826%5D%7D',
        'origin': 'https://copyofgeneralassistant-27005.chipp.ai',
        'priority': 'u=1, i',
        'referer': 'https://copyofgeneralassistant-27005.chipp.ai/w/chat',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
      },
      data: data
    };

    const response = await axios.request(config);

    // Clean the response data
    const cleanResponse = Object.values(response.data)
      .filter(value => typeof value === 'string')
      .map(str => {
        str = str.replace(/0:|"/g, '').replace(/\n/g, ' ');
        str = str.replace(/0:/g, '');
        return str;
      })
      .join('')
      .trim();

    // Send cleaned response back
    res.send({ response: cleanResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
