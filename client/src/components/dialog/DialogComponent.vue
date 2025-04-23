<template>
    <q-dialog v-model="isWindowCardOpen" backdrop-filter="brightness(80%)">
        <q-card :dark="true" :bordered="true" style="min-width: 1000px">
            <q-card-section>
                <component
                    :is="currentDialogComponent"
                    :player="player"
                    :feature="dialogParams.dialogFeature"
                >
                </component>
            </q-card-section>
            <q-separator />
            <q-card-actions v-if="dialogParams.isNeedTrash" align="left">
                <span class="drop_item_delete"
                v-html="'&#128465;'"
                @drop.stop="dropItem($event)"
                @dragenter.prevent=""
                @dragover.prevent=""
                data-dnd_entity="trash"
            ></span>
            </q-card-actions>

            <q-card-actions align="right">
                <q-btn v-close-popup flat color="primary" label="Закрыть" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { dropItem } from '@/composables/dnd'
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