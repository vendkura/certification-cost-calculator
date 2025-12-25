<script setup lang="ts">
import { onMounted } from 'vue'
import { track } from '@vercel/analytics'
import CostCalculator from './components/CostCalculator.vue'

// Track page view on component mount
onMounted(() => {
  track('page_view', {
    page_title: document.title,
    page_location: window.location.href
  })
})
</script>

<template>
  <CostCalculator />
</template>

<style scoped></style>
