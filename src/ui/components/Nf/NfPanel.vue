<template>
  <div class="panel" :class="generateClasses" v-bind="$attrs">
    <!-- Panel header con slot para título -->
    <header v-if="hasHeaderSlot || title" class="panel-heading">
      <slot name="header">
        <h3 v-if="title">{{ title }}</h3>
      </slot>
    </header>

    <!-- Panel body con contenido principal -->
    <div class="panel-body">
      <slot name="body"></slot>
    </div>

    <!-- Panel footer opcional -->
    <footer v-if="hasFooterSlot" class="panel-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

// Tipos de panel disponibles
type PanelType =
  | "default"
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "danger";

/**
 * Props para el componente NfPanel
 */
export interface NfPanelProps {
  /**
   * Clase CSS adicional para el componente
   */
  class?: string | string[] | Record<string, boolean>;

  /**
   * Tipo de panel (afecta al estilo)
   */
  type?: PanelType;

  /**
   * Título del panel (si no se usa el slot header)
   */
  title?: string;
}

const props = defineProps<NfPanelProps>();
const slots = useSlots();

// Verifica si hay slots específicos para mostrar ciertas secciones
const hasHeaderSlot = computed(() => !!slots.header);
const hasFooterSlot = computed(() => !!slots.footer);

// Genera las clases del panel basadas en las props
const generateClasses = computed(() => {
  const classes: Record<string, boolean> = {};
  const userClass = props.class || {};

  // Clase de tipo de panel por defecto es 'default' si no se proporciona
  const panelType = props.type || "default";
  classes[`panel-${panelType}`] = true;

  // Combinar con clases del usuario
  return [classes, userClass];
});
</script>
