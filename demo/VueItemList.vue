<template>
  <div class="list">
    <p v-for="item in items" :key="item">
      {{ item }}
    </p>
  </div>
</template>

<script>
export default {
  name: "item-list",
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    // This is a comment.
    return {
      placeholders: ["foo", "bar", "baz"]
    };
  },
  mounted() {
    // This is another comment.
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