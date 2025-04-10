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

<script lang="ts">
import { defineComponent, ref, computed, SetupContext } from "vue";

export interface ButtonProps {
  primary?: boolean;
  disabled?: boolean;
}

export default defineComponent({
  name: "ExampleButton",
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup(props: ButtonProps, context: SetupContext) {
    const isPrimary = computed(() => props.primary);
    const disabled = computed(() => props.disabled);

    const clickCount = ref(0);

    const handleClick = (event: MouseEvent) => {
      if (props.disabled) return;

      clickCount.value++;
      context.emit("click", { event, count: clickCount.value });
    };

    return {
      isPrimary,
      disabled,
      clickCount,
      handleClick,
    };
  },
});
</script>
