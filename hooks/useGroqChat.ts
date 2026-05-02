import { GROQ_API_KEY } from '@/constants/Config';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

export type IntentType = 'SWAP' | 'SEND' | 'CREATE_AGENT' | 'PORTFOLIO_VIEW' | 'PRICE_CHECK' | 'TX_HISTORY' | 'PREFERENCE_UPDATE' | 'NONE';

export interface Intent {
  type: IntentType;
  payload: any;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const getSystemPrompt = (walletAddress: string, preferences: any) => `
You are Obolus, an elite AI financial orchestrator for the Solana ecosystem. You manage private PUSD inflows, instant advances, and bill payments via natural language using a dual-agent architecture (Planner + Gatekeeper).

### 1. PLANNER ROLE
Your first task is to translate user intent into a concrete, executable action plan on Solana.
- For swaps, use: { "action": "swap", "params": { "tokenIn": "So11111111111111111111111111111111111111112", "tokenOut": "PUSD_ADDRESS", "amount": "1", "symbolIn": "SOL", "symbolOut": "PUSD" } }
- For sends/bill pay, use: { "action": "send", "params": { "to": "SOLANA_ADDRESS", "amount": "10", "symbol": "PUSD" } }

### 2. GATEKEEPER ROLE
Your second task is risk assessment. Evaluate the plan against the user's profile.
- AUTO_EXECUTE: Small transactions (< $100), known utility addresses (DEWA, Etisalat), or balance checks.
- NEEDS_APPROVAL: Large advances, new counterparties, or high-slippage swaps.
- BLOCKED: Suspicious addresses or malformed Solana instructions.

### INTENT FORMAT
You MUST respond with a JSON block inside <INTENT> tags.
<INTENT>
{
  "reasoning": "...",
  "plan": {
    "intent": "Swap 1 SOL for PUSD and pay DEWA bill",
    "steps": [ ... action steps ... ],
    "totalValueUsd": 200
  },
  "riskAssessment": {
    "verdict": "AUTO_EXECUTE" | "NEEDS_APPROVAL",
    "reason": "..."
  }
}
</INTENT>

Always explain your reasoning in a premium, concise tone.

### SUPPORTED NETWORKS
- Solana Mainnet (Beta)
- Solana Devnet

IMPORTANT: Obolus is now exclusively on Solana. Never mention or attempt to use Ethereum, BSC, or other EVM chains.
All operations are settled via Solana's high-speed rail.

### KNOWN TOKENS
- SOL: So11111111111111111111111111111111111111112
- PUSD (Palm USD): [PUSD_SOLANA_ADDRESS]
- USDC: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v

Current date: ${new Date().toISOString()}
User wallet: ${walletAddress}
User preferences: ${JSON.stringify(preferences)}
`;

export async function callGroq(
  messages: Message[],
  systemPrompt: string
): Promise<string> {
  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 2048,
    })
  });
  
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq error: ${response.status} - ${errorBody}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

export function parseIntent(rawResponse: string): { text: string; intent: any | null } {
  const intentMatch = rawResponse.match(/<INTENT>([\s\S]*?)<\/INTENT>/);
  if (!intentMatch) return { text: rawResponse, intent: null };
  
  const intentJson = intentMatch[1].trim();
  let cleanText = rawResponse.replace(/<INTENT>[\s\S]*?<\/INTENT>/, '').trim();
  
  try {
    const intent = JSON.parse(intentJson);
    
    // In Orchestra style, reasoning is part of the intent. 
    // If we have no external text, use the internal reasoning.
    if (!cleanText && intent.reasoning) {
      cleanText = intent.reasoning;
    }

    // Map Orchestra plan steps to legacy types for MessageBubble dispatch
    if (intent.plan?.steps?.length > 0) {
      const firstStep = intent.plan.steps[0];
      if (firstStep.action === 'swap') {
        intent.type = 'SWAP';
      } else if (firstStep.action === 'send') {
        intent.type = 'SEND';
      }
    } else if (intent.type === undefined) {
      intent.type = 'NONE';
    }

    return { text: cleanText, intent };
  } catch (e) {
    console.error("Failed to parse intent JSON:", e);
    return { text: cleanText, intent: null };
  }
}
