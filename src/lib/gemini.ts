import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('');

function formatAnalysis(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .split('\n')
    .filter(line => line.trim())
    .join('\n');
}

export async function analyzeBalanceSheet(fileContent: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Analyze this balance sheet data and provide insights on:
1. Overall financial health
2. Key areas of concern
3. Specific recommendations for improvement
4. Savings opportunities
5. Debt management strategies

Balance sheet data:
${fileContent}

Please provide a detailed but concise analysis in a clear, friendly tone that's easy for non-financial experts to understand. Do not use markdown formatting.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return formatAnalysis(response.text());
  } catch (error) {
    console.error('Error analyzing balance sheet:', error);
    throw new Error('Failed to analyze balance sheet. Please try again.');
  }
}

export async function analyzeDebtManagement(fileContent: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Based on this balance sheet data, provide a detailed debt management analysis focusing on:

1. Debt Overview:
   - List and categorize all debts (credit cards, loans, etc.)
   - Calculate total debt burden
   - Identify highest interest rates

2. Repayment Strategy:
   - Recommend best repayment method (debt snowball vs. avalanche)
   - Provide monthly payment recommendations
   - Estimate debt-free timeline

3. Interest Savings:
   - Calculate potential interest savings
   - Suggest debt consolidation opportunities
   - Identify quick-win opportunities

4. Action Steps:
   - List specific, actionable steps to reduce debt
   - Prioritize which debts to tackle first
   - Suggest lifestyle adjustments to accelerate repayment

Balance sheet data:
${fileContent}

Please provide practical, actionable advice in a clear, encouraging tone. Avoid technical jargon and focus on realistic strategies. Do not use markdown formatting.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return formatAnalysis(response.text());
  } catch (error) {
    console.error('Error analyzing debt management:', error);
    throw new Error('Failed to analyze debt management strategy. Please try again.');
  }
}

export async function getChatResponse(message: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const context = `You are a helpful and knowledgeable financial advisor assistant. Your goal is to provide clear, practical advice about personal finance, budgeting, saving, and debt management. Keep responses concise but informative. Focus on actionable advice that's easy to understand for people who might not be financial experts.

Current user message: ${message}

Please provide a response that:
1. Directly addresses the user's question or concern
2. Offers practical, actionable advice
3. Uses simple language and explains any financial terms
4. Maintains a supportive and encouraging tone
5. Focuses on realistic solutions for low to middle-income individuals`;

  try {
    const result = await model.generateContent(context);
    const response = await result.response;
    return formatAnalysis(response.text());
  } catch (error) {
    console.error('Error getting chat response:', error);
    throw new Error('Failed to get response. Please try again.');
  }
}