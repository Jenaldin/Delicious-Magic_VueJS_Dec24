<script setup>
</script>

<template>
  <main>
    <div class="centered-content">
      <h1>Oops! Dark Magics!</h1>
      <h3>The recipe scroll you are looking for has vanished!</h3>
    </div>
    <div class="centered-content">
      <p>We tried to find the page you navigated to, but it does not exist. </p>
      <p>The link you tried to follow might be broken, the page might have been removed or might not exist yet.</p>
      <p>Try navigating back <router-link to="/home">Home</router-link> and go from there.</p>
    </div>
    <div class="centered-content">
      <h4>Thank you for visiting!</h4>
    </div>
  </main>
</template>

<style scoped>
.centered-content {
  margin: 3rem;
}
p {
  padding: 0.5rem;
}
h4 {
  padding: 0.1rem 0.5rem;
}
</style>
