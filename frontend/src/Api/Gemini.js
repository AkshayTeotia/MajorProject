const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCByMoAiwx9YBeqmWSTqG2ypWY99R8WtgQ`;

async function Gemini(diseaseName) {
  const prompt = `Suggest 2 to 3 treatments and precautions for the plant disease : "${diseaseName}".`;

  const requestData = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    })
  };

  try {
    const response = await fetch(URL, requestData);
    const data = await response.json();
    let apiResponse=data.candidates[0].content.parts[0].text;
    // let apiResponse=data.candidates[0].content.parts[0].text.replace(/\\(.?)\\*/g,"$1").trim();  
            
    console.log(data);
    return apiResponse;
  } catch (e) {
    console.error("Gemini API Error:", e);
    return "Failed to get AI suggestions.";
  }
}

export default Gemini;