const axios = require('axios')

const APITokenMonkey = process.env.MONKEYLEARNAPITOKEN

async function fetchSentimentAnalysis(text) {
  // API from here https://app.monkeylearn.com/
  const headers = {
    'Content-Type': 'application/json',
    Authorization: APITokenMonkey,
  }
  const data = {
    data: [text],
  }

  return await axios({
    method: 'post',
    headers: headers,
    url: 'https://api.monkeylearn.com/v3/classifiers/cl_pi3C7JiL/classify/',
    data,
  }).then(
    response => {
      console.log(response)
      return response.data[0].classifications[0]
    },
    error => {
      console.log(error)
    }
  )
}

module.exports = async function sentimentAnalysis(comment) {
  if (APITokenMonkey) {
    fetchClassification = await fetchSentimentAnalysis(comment)
    const classification = {
      tag_name: fetchClassification.tag_name,
      tag_id: fetchClassification.tag_id,
      confidence: fetchClassification.confidence,
    }
    return classification
  }
  return {
    tag_name: 'neutral',
    tag_id: 0,
    confidence: 0,
  }
}
