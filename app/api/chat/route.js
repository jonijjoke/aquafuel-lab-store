import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import fs from 'fs';
import path from 'path';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const maxDuration = 30;

// Yhteys redis tietokantaan
const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '10 s'),
});

async function getContextFromTextFile() {
  try {
    const filePath = path.join(process.cwd(), 'aquafuel-lab-tiedot.txt');
    
    if (!fs.existsSync(filePath)) {
      console.warn("Tiedostoa ei löytynyt.", filePath);
      return "";
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent;
  } catch (error) {
    console.error("Virhe tiedoston lukemisessa:", error);
    return ""; 
  }
}

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return new Response("Liikaa pyyntöjä. Yritä hetken päästä uudelleen.", { status: 429 });
    }

    const { messages } = await req.json();

    // Otetaan viimeisin viesti ja tarkistetaan sen pituus
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.content.length > 500) {
      return new Response("Viesti on liian pitkä (max 500 merkkiä).", { status: 400 });
    }

    const shopData = await getContextFromTextFile();

    const systemInstruction = `
      Olet AquaFuel Lab Store -verkkokaupan asiantunteva asiakaspalvelija. 
      Tiedät kaiken vitamiinivesistä, nesteytyksestä ja hyvinvointijuomista. 
      Tuotteesi auttavat suorituskyvyssä ja palautumisessa ja maistuvat hyvältä.
      
      Ole energinen ja kohtelias. 
      Jos et tiedä jotain, ohjaa asiakas ottamaan yhteyttä sähköpostitse.
      
      TÄSSÄ ON KAUPAN VIRALLINEN TIETOPANKKI (Lähde: Tiedosto):
      ---------------------------------------------
      ${shopData}
      ---------------------------------------------
      
      OHJEET SINULLE:
      1. Käytä VASTAUKSISSA ensisijaisesti yllä olevaa tietopankkia.
      2. Jos asiakas kysyy tuotteista, hinnoista tai toimituksesta, tarkista faktat tekstistä.
      3. Jos tietoa ei löydy, myönnä se rehellisesti ja ohjaa sähköpostiin (support@aquafuel-lab.fi).
    `;

    // Luodaan vastaus
    const result = await streamText({
      model: google('gemini-2.5-flash', {
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_LOW_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_LOW_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_LOW_AND_ABOVE' },
        ],
      }),
      messages,
      system: systemInstruction,
    });
    
    // Tämää toimii sekä uusilla että vanhoilla kirjastoilla
    if (typeof result.toDataStreamResponse === 'function') {
      return result.toDataStreamResponse();
    } else if (typeof result.toTextStreamResponse === 'function') {
      return result.toTextStreamResponse();
    } else {
      return new Response(result.textStream);
    }

  } catch (error) {
    console.error("Virhe:", error.message);
    
    return new Response(
      JSON.stringify({ 
        error: "Palvelinvirhe.",
        details: error.message 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
