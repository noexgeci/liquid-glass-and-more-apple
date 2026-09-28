<script setup>
import { ref } from 'vue';
import { alert, toast } from 'liquid-glass-kit';

const wifi = ref(true);
const volume = ref(60);
const period = ref('week');

async function reset() {
  const choice = await alert({
    title: 'Reset settings?',
    actions: [
      { label: 'Cancel', role: 'cancel' },
      { label: 'Reset', prominent: true },
    ],
  });
  if (choice === 'Reset') {
    wifi.value = true;
    volume.value = 60;
    period.value = 'week';
    toast({ title: 'Settings reset', time: 'now' });
  }
}
</script>

<template>
  <main class="page">
    <h1 class="lg-large-title lg-emphasized">Vue + Liquid Glass</h1>
    <div class="lg-glass card">
      <div class="row">
        <span>Wi-Fi</span>
        <label class="lg-switch"><input v-model="wifi" type="checkbox" aria-label="Wi-Fi" /></label>
      </div>
      <div class="lg-slider" data-lg-ticks="5">
        <span data-lg-icon="speaker.slash"></span>
        <input v-model.number="volume" type="range" min="0" max="100" aria-label="Volume" />
        <span data-lg-icon="speaker.wave.2"></span>
      </div>
      <div class="lg-segmented lg-segmented--block" role="radiogroup" aria-label="Period">
        <label><input v-model="period" type="radio" value="day" />Day</label>
        <label><input v-model="period" type="radio" value="week" />Week</label>
        <label><input v-model="period" type="radio" value="month" />Month</label>
      </div>
      <p class="lg-footnote">Wi-Fi {{ wifi ? 'on' : 'off' }} · volume {{ volume }} · {{ period }}</p>
      <button class="lg-button lg-button--prominent" @click="reset">Reset</button>
    </div>
  </main>
</template>

<style>
body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(160deg, #42d392, #647eff) fixed;
}
.page {
  display: grid;
  gap: 20px;
  max-width: 520px;
  margin: 0 auto;
  padding: 56px 16px;
  color: #fff;
}
.card {
  display: grid;
  gap: 16px;
  padding: 22px;
  border-radius: 30px;
  color: var(--lg-label);
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
