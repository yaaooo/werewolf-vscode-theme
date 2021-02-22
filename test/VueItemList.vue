<template>
  <div class="list">
    <p v-for="item in items" :key="item">
      {{ item }}
    </p>
  </div>
</template>

<script>
import Vue from "vue";

Vue.extend({
  name: "item-list",
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      placeholders: ["foo", "bar", "baz"]
    };
  },
  mounted() {
    console.log("ItemList was mounted.");
  }
});
</script>

<style>
.list {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>