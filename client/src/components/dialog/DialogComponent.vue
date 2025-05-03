<template>
    <q-dialog v-model="isWindowCardOpen" backdrop-filter="brightness(50%)">
        <q-card :dark="true" :bordered="true" style="min-width: 1100px">
            <q-card-section>
                <component
                    :is="currentDialogComponent"
                    :player="player"
                    :feature="dialogParams.dialogFeature"
                >
                </component>
            </q-card-section>
            <q-card-actions v-if="dialogParams.isNeedTrash" align="left">
                <items-trash
                    class="drop_item_delete"
                >
                </items-trash>
            </q-card-actions>

            <q-card-actions align="right">
                <q-btn v-close-popup flat color="primary" label="Закрыть" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import ItemsTrash from '../inventory/ItemsTrash.vue';
import {isWindowCardOpen, currentDialogComponent, dialogParams } from '@/composables/modal';
import type PlayerManager from '@/umbrella/PlayerManager';
import type { PropType } from 'vue';

const props = defineProps({
    player: {
        type: Object as PropType<PlayerManager>,
        required: true
    }
})

</script>

<style lang="scss">
.drop_item_delete{
    font-size: 3em;
}
</style>