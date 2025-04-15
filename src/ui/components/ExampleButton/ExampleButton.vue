<template>
  <button
    class="btn"
    :class="{ 'btn-primary': isPrimary, 'btn-default': !isPrimary }"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

export interface ButtonProps {
  primary?: boolean;
  disabled?: boolean;
}

const props = defineProps({
  primary: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const isPrimary = computed(() => props.primary);
const disabled = computed(() => props.disabled);

const clickCount = ref(0);

const handleClick = (event: MouseEvent) => {
  if (props.disabled) return;

  clickCount.value++;
  emit("click", { event, count: clickCount.value });
};
</script>
