const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const API_KEY = process.env.GEMINI_API_KEY;
app.post('/generate-video', async (req, res) => {
  const { story, animal, dance, duration } = req.body;
  const prompt = `Cute 3D ${animal} doing ${dance} dance. Story: ${story}. Real moving animal, full body dancing, hands legs head moving, vertical 9:16, funny, colorful`;
  let op = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-generate-preview:predictLongRunning?key=${API_KEY}`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ instances: [{ prompt: prompt }], parameters: { aspectRatio: '9:16', durationSeconds: duration, sampleCount: 1 } })
  }).then(r=>r.json());
  let name = op.name;
  let done = false;
  let videoUri = null;
  while(!done){
    await new Promise(r=>setTimeout(r, 5000));
    let check = await fetch(`https://generativelanguage.googleapis.com/v1beta/${name}?key=${API_KEY}`).then(r=>r.json());
    if(check.done){ done=true; videoUri = check.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri; }
  }
  res.json({ videoUrl: videoUri });
});
app.get('/health', (req,res)=> res.json({ok:true}));
app.listen(8080, ()=> console.log('Masti Maker Backend Running'));
