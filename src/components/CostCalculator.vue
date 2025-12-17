<script setup lang="ts">
import { ref, computed } from 'vue'

interface Stage {
  name: string
  value: number
  min: number
  max: number
  step: number
}

const logoPath = '/AFIA-LOGO.jpg'
const logoLoaded = ref(true)

const stages = ref<Stage[]>([
  { name: '1. Gap Analysis', value: 1150, min: 800, max: 1500, step: 50 },
  { name: '2. Documentation Development', value: 1750, min: 1000, max: 2500, step: 50 },
  { name: '3. Staff Training', value: 1000, min: 500, max: 1500, step: 50 },
  { name: '4. Laboratory Testing', value: 2000, min: 1000, max: 3000, step: 50 },
  { name: '5. Facility Upgrades', value: 3500, min: 2000, max: 5000, step: 100 },
  { name: '6. Consultant Support', value: 3000, min: 2000, max: 4000, step: 100 },
  { name: '7. Certification Audit', value: 2250, min: 1500, max: 3000, step: 50 },
  { name: '8. Travel & Logistics', value: 1000, min: 500, max: 1500, step: 50 }
])

const profitInput = ref<number | null>(null)
const showComparisonResult = ref(false)
const percentage = ref(0)
const statusClass = ref('')
const statusText = ref('')

const totalYear1 = computed(() => {
  return stages.value.reduce((sum, stage) => sum + stage.value, 0)
})

const annualRenewal = computed(() => {
  return Math.round(totalYear1.value * 0.25)
})

const formatCurrency = (value: number): string => {
  return '$' + value.toLocaleString()
}

const calculateComparison = () => {
  if (!profitInput.value || profitInput.value <= 0) {
    alert('Please enter a valid annual profit amount.')
    return
  }

  percentage.value = Math.round((totalYear1.value / profitInput.value) * 100)

  if (percentage.value > 100) {
    statusClass.value = 'bg-red-100 text-red-800'
    statusText.value = '❌ IMPOSSIBLE - Certification exceeds your annual profit'
  } else if (percentage.value > 50) {
    statusClass.value = 'bg-yellow-100 text-yellow-800'
    statusText.value = '⚠️ VERY CHALLENGING - Consider phased approach or subsidies'
  } else if (percentage.value > 25) {
    statusClass.value = 'bg-yellow-100 text-yellow-800'
    statusText.value = '⚠️ DIFFICULT BUT FEASIBLE - Requires careful financial planning'
  } else {
    statusClass.value = 'bg-green-100 text-green-800'
    statusText.value = '✓ FEASIBLE - Within reasonable investment range'
  }

  showComparisonResult.value = true
}

const resetCalculator = () => {
  stages.value = [
    { name: '1. Gap Analysis', value: 1150, min: 800, max: 1500, step: 50 },
    { name: '2. Documentation Development', value: 1750, min: 1000, max: 2500, step: 50 },
    { name: '3. Staff Training', value: 1000, min: 500, max: 1500, step: 50 },
    { name: '4. Laboratory Testing', value: 2000, min: 1000, max: 3000, step: 50 },
    { name: '5. Facility Upgrades', value: 3500, min: 2000, max: 5000, step: 100 },
    { name: '6. Consultant Support', value: 3000, min: 2000, max: 4000, step: 100 },
    { name: '7. Certification Audit', value: 2250, min: 1500, max: 3000, step: 50 },
    { name: '8. Travel & Logistics', value: 1000, min: 500, max: 1500, step: 50 }
  ]
  profitInput.value = null
  showComparisonResult.value = false
}

const printResults = () => {
  window.print()
}

const handleLogoError = () => {
  logoLoaded.value = false
}
</script>

<template>
  <div class="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen p-5">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-br from-brand-gray to-brand-gray-dark text-white px-8 py-10 text-center">
        <img 
          v-if="logoLoaded" 
          :src="logoPath" 
          alt="AFI | IAA Logo" 
          class="h-20 mx-auto mb-4 object-contain" 
          @error="handleLogoError"
        >
        <div v-else class="text-4xl font-bold tracking-wider mb-2">AFI | IAA</div>
        <div class="w-48 h-1 bg-brand-green mx-auto my-4"></div>
        <h1 class="text-3xl md:text-4xl font-bold mb-3">🧮 Certification Cost Calculator</h1>
        <p class="text-base opacity-90 text-gray-200">Estimate your food safety certification investment</p>
      </div>

      <!-- Content -->
      <div class="px-8 py-10">
        <div class="text-center mb-10 text-gray-600">
          <p>Adjust each cost component below to match your situation. The calculator will show your total investment required and help you understand what certification really costs.</p>
        </div>

        <!-- Stages -->
        <div class="space-y-6">
          <div 
            v-for="(stage, index) in stages" 
            :key="index" 
            class="p-5 bg-gray-50 rounded-xl border-l-4 border-brand-green"
          >
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
              <span class="text-base font-semibold text-brand-gray">{{ stage.name }}</span>
              <span class="text-xl font-bold text-brand-green">{{ formatCurrency(stage.value) }}</span>
            </div>
            <div>
              <input 
                type="range" 
                v-model.number="stage.value" 
                :min="stage.min" 
                :max="stage.max" 
                :step="stage.step"
                class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              >
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>{{ formatCurrency(stage.min) }}</span>
                <span>{{ formatCurrency(stage.max) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="bg-gradient-to-br from-brand-gray to-brand-gray-dark text-white px-8 py-8 rounded-xl mt-10">
          <h2 class="text-2xl font-bold text-center border-b-2 border-brand-green pb-4 mb-6">📊 Your Estimated Costs</h2>
          <div class="space-y-4">
            <div class="flex justify-between items-center py-4 border-b border-gray-600">
              <span class="text-base opacity-90">Year 1 Total Investment</span>
              <span class="text-2xl font-bold text-green-400">{{ formatCurrency(totalYear1) }}</span>
            </div>
            <div class="flex justify-between items-center py-4">
              <span class="text-base opacity-90">Annual Renewal (estimated)</span>
              <span class="text-2xl font-bold text-green-400">{{ formatCurrency(annualRenewal) }}</span>
            </div>
          </div>
        </div>

        <!-- Comparison -->
        <div class="bg-yellow-50 border-2 border-yellow-400 rounded-xl px-6 py-6 mt-8">
          <h3 class="text-brand-gray font-bold text-lg mb-4">💰 Compare to Your Business</h3>
          <div class="flex flex-col md:flex-row gap-4 mb-4">
            <input 
              type="number" 
              v-model.number="profitInput" 
              placeholder="Enter your annual profit ($)" 
              min="0"
              class="flex-1 min-w-[200px] px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-brand-green"
            >
            <button 
              @click="calculateComparison" 
              class="px-8 py-3 bg-brand-green hover:bg-green-800 text-white rounded-lg font-semibold transition-colors duration-300"
            >
              Calculate
            </button>
          </div>
          <div v-if="showComparisonResult" class="mt-5 p-5 bg-white rounded-lg">
            <p class="mb-3">
              <strong>Result:</strong> Certification costs represent 
              <span class="font-bold text-lg">{{ percentage }}%</span> of your annual profit.
            </p>
            <div :class="statusClass" class="inline-block px-4 py-2 rounded-full font-semibold text-sm mt-2">
              {{ statusText }}
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <button 
            @click="printResults" 
            class="px-6 py-3 bg-brand-green hover:bg-green-800 text-white rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            📄 Download Results (PDF)
          </button>
          <button 
            @click="resetCalculator" 
            class="px-6 py-3 bg-white hover:bg-brand-gray text-brand-gray hover:text-white border-2 border-brand-gray rounded-lg font-semibold transition-colors duration-300"
          >
            🔄 Reset Calculator
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center px-8 py-8 bg-gray-50 text-gray-600 text-sm">
        <p class="font-bold">AFI | IAA</p>
        <p class="mb-0">African Food Industry | Industrie Alimentaire Africaine</p>
        <p class="mt-2 text-xs">This calculator provides estimates only. Actual certification costs may vary based on your specific situation, location, and certification body chosen.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>
