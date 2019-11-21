<template lang="pug">
  .hello
    h1 {{ msg }}
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            };
        }
    };
</script>

<style scoped>
</style>
