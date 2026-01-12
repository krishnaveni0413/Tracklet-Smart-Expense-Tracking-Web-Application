// AI Service for generating insights
export async function generateSpendingHaiku(spendingData: any): Promise<string> {
  // Mock haiku generation - in production, this would call OpenAI API
  const haikus = [
    "Money flows like water,\nQuiet today's spending stream,\nBalance finds the way.",
    "Cloud brings gentle rain,\nYour coins dance with the seasons,\nWisdom in the flow.",
    "Emerald is spent,\nRose petals fall from your purse,\nSilence buys tomorrow.",
    "Coins whisper softly,\nYour choices echo forward,\nWealth grows from within.",
    "Budget like bamboo,\nBending gently with the wind,\nRoots hold you steady.",
  ]

  return haikus[Math.floor(Math.random() * haikus.length)]
}

export async function generateSmartObservations(expenses: any[]): Promise<string[]> {
  // Mock observations - in production, this would call OpenAI API
  const observations: string[] = []

  if (expenses.length > 0) {
    observations.push('✨ Your spending patterns are being tracked.')
  }

  return observations
}

export async function generateMonthlyForecast(expenses: any[]): Promise<any> {
  // Mock forecast - in production, this would use ML models
  return {
    predictedSpending: 2500,
    confidence: 0.85,
    message: 'Based on your patterns, expect ~$2,500 spending this month',
  }
}
