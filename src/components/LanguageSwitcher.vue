<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { trackLanguageChange } from '../utils/analytics'

const { locale } = useI18n()

const switchLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
  trackLanguageChange(lang)
}
</script>

<template>
  <div class="flex items-center gap-3">
    <button
      @click="switchLanguage('en')"
      :class="[
        'px-4 py-2 rounded-lg font-semibold transition-all duration-300',
        locale === 'en'
          ? 'bg-brand-green text-white shadow-lg'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      ]"
    >
      🇬🇧 EN
    </button>
    <button
      @click="switchLanguage('fr')"
      :class="[
        'px-4 py-2 rounded-lg font-semibold transition-all duration-300',
        locale === 'fr'
          ? 'bg-brand-green text-white shadow-lg'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      ]"
    >
      🇫🇷 FR
    </button>
  </div>
</template>

<style scoped></style>
