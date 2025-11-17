import axios from "axios"
const geminiResponse=async (command,assistantName,userName)=>{
try {
    const apiUrl=process.env.GEMINI_API_URL
    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. 
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month"|"calculator-open" | "instagram-open" |"facebook-open" |"weather-show" | "app-open",
  "userInput": "<original user input>" {only remove your name from userinput if exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userInput me only bo search baala text jaye,
  "appName": "<name of app/website to open>" (REQUIRED for app-open type - MUST be included),
  "response": "<a short spoken response to read out loud to the user>"
}

IMPORTANT: When type is "app-open", you MUST include the "appName" field with the clean app name (lowercase, no "open" word).

Instructions:
- "type": determine the intent of the user.
- "userinput": original sentence the user spoke.
- "response": A short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc.

Type meanings:
- "general": if it's a factual or informational question. aur agar koi aisa question puchta hai jiska answer tume pata hai usko bhi general ki category me rakho bas short answer dena
- "google-search": if user wants to search something on Google .
- "youtube-search": if user wants to search something on YouTube.
- "youtube-play": if user wants to directly play a video or song.
- "calculator-open": if user wants to  open a calculator .
- "instagram-open": if user wants to  open instagram .
- "facebook-open": if user wants to open facebook.
-"weather-show": if user wants to know weather
- "app-open": if user says "open [app name]" or "open [website name]" like "open twitter", "open github", "open youtube", "open netflix", etc. When using this type:
  * ALWAYS include "appName" field in your response
  * In appName field, put ONLY the app/website name without the word "open" 
  * Examples: "open youtube" -> appName: "youtube", "open twitter" -> appName: "twitter", "open netflix" -> appName: "netflix"
  * Make sure appName is lowercase and clean (no spaces, no special characters)
  * Common apps: youtube, twitter, instagram, facebook, netflix, github, linkedin, gmail, amazon, whatsapp, reddit, spotify, discord, zoom, etc.
- "get-time": if user asks for current time.
- "get-date": if user asks for today's date.
- "get-day": if user asks what day it is.
- "get-month": if user asks for the current month.

Important:
- Use ${userName} agar koi puche tume kisne banaya 
- Only respond with the JSON object, nothing else.


now your userInput- ${command}
`;





    const result=await axios.post(apiUrl,{
    "contents": [{
    "parts":[{"text": prompt}]
    }]
    })
return result.data.candidates[0].content.parts[0].text
} catch (error) {
    console.log("Gemini API Error:", error.response?.data || error.message)
    throw new Error(error.response?.data?.error?.message || "Failed to get response from Gemini API")
}
}

export default geminiResponse