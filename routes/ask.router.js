const { default: axios } = require("axios")
const express = require("express")
const askRouter = express.Router()
require("dotenv").config()
const apiKey = process.env.chatGPTkey

askRouter.post("/", async (req, res) => {
    try {
        const keyword = req.body.keyword
        if (!keyword) {
            return res.status(400).json({ error: 'Please add your question.' })
        }
        //using chatgpt to generate quote
        const ans = await generateQuote(keyword)
        res.status(200).json({ans})

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
async function generateQuote(keyword) {
    let prompt = `Act as an islamic scholar and give me the answer of this keyword "${keyword}" on the basis of Quran and hadith with reference 'strictly in just 200 words or less.'`;
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const response=await axios.post(apiUrl, {
        prompt,
        max_tokens: 500,
        temperature: 0.7,
        n: 1, // Number of responses to return
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    })
    return response.data.choices[0].text.trim();
}

module.exports = {
    askRouter
}