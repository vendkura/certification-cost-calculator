import { track } from '@vercel/analytics'

export const trackCalculatorEvent = (action: string, value?: number) => {
  track('calculator_interaction', {
    action,
    value,
    timestamp: new Date().toISOString()
  })
}

export const trackLanguageChange = (language: string) => {
  track('language_changed', {
    language,
    timestamp: new Date().toISOString()
  })
}

export const trackCalculation = (totalCost: number, profit: number, percentage: number) => {
  track('profit_comparison', {
    total_cost: totalCost,
    annual_profit: profit,
    percentage_of_profit: percentage,
    timestamp: new Date().toISOString()
  })
}
