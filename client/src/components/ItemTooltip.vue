<script setup lang="ts">
import type { IItem } from '@/interfaces/ItemsInterfaces';
import type { PropType } from 'vue';

const props = defineProps({
    item: {
        type: Object as PropType<IItem>,
        required: true
    }
})
</script>

<template>
    <q-tooltip>
        {{ item?.textName }}
        <q-separator class="q-my-xs" />
        {{ item?.description }}
    </q-tooltip>
</template>

<style lang="scss">

</style>