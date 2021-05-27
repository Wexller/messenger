<template>
  <div class="layout">
    <m-navigation />
    <m-sidebar />
  </div>
</template>

<script>
import MNavigation from '@/components/m-navigation';
import MSidebar from '@/components/sidebar/m-sidebar';

export default {
  name: 'm-main',
  components: { MSidebar, MNavigation },
};
</script>
