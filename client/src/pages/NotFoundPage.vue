<script setup>
</script>

<template>
  <main>
    <div class="centered-content">
      <h1>Oops! Dark Magics!</h1>
      <h3>The recipe scroll you are looking for has vanished!</h3>
      <h3>(Or you are not authorized to use it...)</h3>
    </div>
    <div class="centered-content">
      <p>We tried to show the page you navigated to, but it does not exist or you do not have permissions to see it. </p>
      <p>Check the link you tried to follow as it might be broken, or the page might have been removed/restricted, or it might not exist yet.</p>
      <h4>For best results, go back to the <router-link to="/">Home page</router-link> and start from there.</h4>
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