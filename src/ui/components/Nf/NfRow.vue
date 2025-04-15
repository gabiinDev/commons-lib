<template>
  <section class="row" :class="props.class" v-bind="$attrs">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
/**
 * Componente que renderiza una sección con clase "row"
 * Permite añadir clases adicionales y heredar cualquier atributo HTML
 */

// Definición de props
export interface NfRowProps {
  /**
   * Clase CSS adicional para el componente
   */
  class?: string | string[] | Record<string, boolean>;
}

const props = defineProps<NfRowProps>();
</script>
