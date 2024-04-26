<template>
  <div>
    <div
      v-for="(item, index) in Array(3).fill('')"
      :key="index"
      class="p-3 shadow bg-white mb-2"
    >
      <div class="skeleton-circle" />
      <div class="mt-4">
        <div
          v-for="i in 4"
          :key="i"
          class="skeleton-text"
        />
      </div>
    </div>
  </div>
</template>
    
    <script>
    export default {
      name: "FaqComponent"
    };
    
    </script>
    
    <style scoped>
    .skeleton-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #ddd;
    }
    
    .skeleton-text {
      height: 20px;
      background: #ddd;
      margin-bottom: 4px;
    }
    </style>
    