import type { UrlMetadata } from './url-metadata';

const GEMINI_BASE_URL =
  'https://generativelanguage.googleapis.com/v1beta/models';

// Models to try in order (fallback chain) - updated March 2026
const MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
];

export interface CollectedData {
  name: string;
  companyName: string;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  websiteUrl: string;
  linkedinMeta: UrlMetadata;
  twitterMeta: UrlMetadata;
  instagramMeta: UrlMetadata;
}

async function callGemini(model: string, prompt: string, apiKey: string): Promise<object> {
  const url = `${GEMINI_BASE_URL}/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        topP: 0.8,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini ${model} error ${res.status}: ${errText.slice(0, 200)}`);
  }

  const result = await res.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error(`No response from Gemini ${model}`);

  return JSON.parse(text);
}

export async function generateReport(data: CollectedData): Promise<object> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  const prompt = buildPrompt(data);

  // Try each model in order, fallback on rate limit (429) or server errors
  for (let i = 0; i < MODELS.length; i++) {
    try {
      console.log(`Trying Gemini model: ${MODELS[i]}`);
      const result = await callGemini(MODELS[i], prompt, apiKey);
      console.log(`Success with model: ${MODELS[i]}`);
      return result;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      const isRateLimit = msg.includes('429');
      const isServerError = msg.includes('500') || msg.includes('503');
      const isNotFound = msg.includes('404');
      const isRetryable = isRateLimit || isServerError || isNotFound;
      const isLast = i === MODELS.length - 1;

      if (isLast || !isRetryable) {
        throw error;
      }

      const reason = isRateLimit ? 'rate limited' : isNotFound ? 'model not available' : 'server error';
      console.log(`Model ${MODELS[i]} failed (${reason}), trying next...`);

      // Brief pause before trying next model
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  throw new Error('All Gemini models exhausted');
}

function buildPrompt(data: CollectedData): string {
  // Build profile info from available metadata
  const profileSections: string[] = [];

  if (data.linkedinUrl) {
    profileSections.push(`## LinkedIn Profile
- URL: ${data.linkedinUrl}
- ${data.linkedinMeta.accessible ? `Title: ${data.linkedinMeta.title}\nDescription: ${data.linkedinMeta.description}\nImage: ${data.linkedinMeta.image || 'none'}` : 'Metadata: Could not be fetched (profile may be private or restricted)'}`);
  }

  if (data.twitterUrl) {
    profileSections.push(`## Twitter/X Profile
- URL: ${data.twitterUrl}
- ${data.twitterMeta.accessible ? `Title: ${data.twitterMeta.title}\nDescription: ${data.twitterMeta.description}\nImage: ${data.twitterMeta.image || 'none'}` : 'Metadata: Could not be fetched (profile may be private or restricted)'}`);
  }

  if (data.instagramUrl) {
    profileSections.push(`## Instagram Profile
- URL: ${data.instagramUrl}
- ${data.instagramMeta.accessible ? `Title: ${data.instagramMeta.title}\nDescription: ${data.instagramMeta.description}\nImage: ${data.instagramMeta.image || 'none'}` : 'Metadata: Could not be fetched (profile may be private or restricted)'}`);
  }

  const providedPlatforms = [
    data.linkedinUrl ? 'LinkedIn' : null,
    data.twitterUrl ? 'Twitter/X' : null,
    data.instagramUrl ? 'Instagram' : null,
  ].filter(Boolean);

  const missingPlatforms = [
    !data.linkedinUrl ? 'LinkedIn' : null,
    !data.twitterUrl ? 'Twitter/X' : null,
    !data.instagramUrl ? 'Instagram' : null,
  ].filter(Boolean);

  return `You are an expert digital presence analyst. You specialize in evaluating individuals' and professionals' online footprints, social media strength, influence level, and digital reputation.

## Analysis Request
Analyze the digital presence of the following person based on their provided information and your knowledge.

## Person Details
- **Full Name:** ${data.name}
- **Company/Organization:** ${data.companyName || 'Not provided'}
- **Website:** ${data.websiteUrl || 'Not provided'}
- **Social Platforms Provided:** ${providedPlatforms.length > 0 ? providedPlatforms.join(', ') : 'None'}
- **Social Platforms Missing:** ${missingPlatforms.length > 0 ? missingPlatforms.join(', ') : 'None'}

${profileSections.join('\n\n')}

---

## Your Analysis Task

Using the profile information above AND your knowledge about digital presence best practices, generate a comprehensive Digital Presence Report. You must analyze:

1. **Search Visibility**: Based on the person's name, company, and profiles - how likely is it someone searching for them would find professional, relevant results? Consider name uniqueness, profile completeness, and platform diversity.

2. **Social Media Strength**: Evaluate each platform they provided. Are URLs properly formatted? Do the profiles appear complete based on metadata? What platforms are they missing?

3. **Influencer/Authority Level**: Based on the profiles and platform presence, estimate their influence level. Consider: number of platforms, professional vs personal branding, company association.

4. **Digital Footprint Health**: Identify positive footprints (professional profiles, consistent branding) and potential concerns (missing platforms, incomplete profiles, privacy issues).

5. **Weak Points**: What gaps exist in their digital presence that could hurt their professional reputation or discoverability?

6. **Actionable Recommendations**: Provide specific, prioritized steps they can take to improve.

IMPORTANT: Be realistic and data-driven. If limited information is available, reflect that honestly in lower scores. Don't inflate scores - a person with only 1-2 social profiles and no company website should NOT score above 50-60 overall.

Respond with ONLY valid JSON in this exact structure:

{
  "overallScore": <0-100>,
  "searchVisibility": {
    "score": <0-100>,
    "totalResults": 0,
    "sentiment": "positive" | "neutral" | "negative" | "mixed",
    "topMentions": [
      { "title": "<likely search result title>", "url": "<profile url or likely url>", "snippet": "<what this result would show>" }
    ],
    "summary": "<2-3 sentences: What would someone find when Googling this person? How discoverable are they?>"
  },
  "socialPresence": {
    "score": <0-100>,
    "platforms": [
      {
        "platform": "linkedin" | "twitter" | "instagram",
        "url": "<url or empty>",
        "profileFound": <boolean - true if URL was provided>,
        "indicators": ["<specific observation about this profile>", "..."],
        "analysis": "<1-2 sentences about this platform presence>"
      }
    ],
    "summary": "<2-3 sentences about their overall social media presence>"
  },
  "influencerScore": {
    "score": <0-100>,
    "level": "invisible" | "emerging" | "established" | "influencer" | "thought_leader",
    "reasoning": "<2-3 sentences explaining why they have this influence level>",
    "indicators": ["<evidence point>", "..."]
  },
  "footprintHealth": {
    "score": <0-100>,
    "goodFootprints": ["<positive digital footprint>", "..."],
    "badFootprints": ["<negative or missing digital footprint>", "..."],
    "summary": "<2-3 sentences about overall digital footprint health>"
  },
  "weakPoints": {
    "gaps": [
      {
        "area": "<area name>",
        "severity": "critical" | "moderate" | "minor",
        "description": "<what is weak and why it matters>"
      }
    ]
  },
  "recommendations": [
    {
      "priority": "high" | "medium" | "low",
      "title": "<short action title>",
      "description": "<2-3 sentences explaining what to do and why>",
      "impact": "<1 sentence: expected impact>"
    }
  ]
}

RULES:
- Generate 2-4 topMentions based on likely search results from their profiles
- Include ALL 3 social platforms (linkedin, twitter, instagram) even if not provided - mark unfound as profileFound: false
- Generate 3-5 weak points sorted by severity
- Generate 5-8 recommendations sorted by priority (high first)
- Be SPECIFIC to this person - reference their name, company, and actual profile URLs
- The overallScore = weighted average: Search Visibility (20%) + Social Presence (30%) + Influencer Score (20%) + Footprint Health (30%)
- Missing platforms should count AGAINST scores (e.g., no LinkedIn for a professional is a critical gap)
- If bad footprints are found, clearly flag them
- Be honest but constructive in the analysis
- Scores should reflect REALITY: few profiles = low scores, many complete profiles = higher scores`;
}
