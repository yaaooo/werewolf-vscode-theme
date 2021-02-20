<template>
  <div class="list">
    <p v-for="textItem in textItems" :key="textItem">
      {{ textItem }}
    </p>
  </div>
</template>

<script>
import Vue from "vue";

Vue.extend({
  name: "list",
  data() {
    return {
      textItems: ["Foo", "Bar", "Baz"],
    };
  },
});
</script>

<style>
.class {
  margin: auto;
}
</style>