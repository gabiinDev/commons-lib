<template>
  <div :class="generateClasses" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Tamaños de grid disponibles
type ColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ColAlignment = "start" | "center" | "end";
type ColOffset = 0 | ColumnSize;
type ColOrder = "first" | "last" | 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Props para el componente NfCol
 */
export interface NfColProps {
  /**
   * Clase CSS adicional para el componente
   */
  class?: string | string[] | Record<string, boolean>;

  /**
   * Tamaño base para todas las pantallas (col-N)
   */
  xs?: ColumnSize;

  /**
   * Tamaño para pantallas pequeñas (col-sm-N)
   */
  sm?: ColumnSize;

  /**
   * Tamaño para pantallas medianas (col-md-N)
   */
  md?: ColumnSize;

  /**
   * Tamaño para pantallas grandes (col-lg-N)
   */
  lg?: ColumnSize;

  /**
   * Tamaño para pantallas extra grandes (col-xl-N)
   */
  xl?: ColumnSize;

  /**
   * Tamaño para pantallas extra extra grandes (col-xxl-N)
   */
  xxl?: ColumnSize;

  /**
   * Offset para todas las pantallas (offset-N)
   */
  offset?: ColOffset;

  /**
   * Offset para pantallas pequeñas (offset-sm-N)
   */
  offsetSm?: ColOffset;

  /**
   * Offset para pantallas medianas (offset-md-N)
   */
  offsetMd?: ColOffset;

  /**
   * Offset para pantallas grandes (offset-lg-N)
   */
  offsetLg?: ColOffset;

  /**
   * Offset para pantallas extra grandes (offset-xl-N)
   */
  offsetXl?: ColOffset;

  /**
   * Orden de la columna (order-N)
   */
  order?: ColOrder;

  /**
   * Alineación vertical (align-self-X)
   */
  alignSelf?: ColAlignment;
}

const props = defineProps<NfColProps>();

// Genera las clases de columna basadas en las props
const generateClasses = computed(() => {
  const classes: Record<string, boolean> = {};
  const userClass = props.class || {};

  // Clase por defecto si no se proporciona ninguna otra
  if (
    !props.xs &&
    !props.sm &&
    !props.md &&
    !props.lg &&
    !props.xl &&
    !props.xxl
  ) {
    classes["col-md-12"] = true;
  }

  // Tamaños de columna
  if (props.xs) classes[`col-${props.xs}`] = true;
  if (props.sm) classes[`col-sm-${props.sm}`] = true;
  if (props.md) classes[`col-md-${props.md}`] = true;
  if (props.lg) classes[`col-lg-${props.lg}`] = true;
  if (props.xl) classes[`col-xl-${props.xl}`] = true;
  if (props.xxl) classes[`col-xxl-${props.xxl}`] = true;

  // Offsets
  if (props.offset) classes[`offset-${props.offset}`] = true;
  if (props.offsetSm) classes[`offset-sm-${props.offsetSm}`] = true;
  if (props.offsetMd) classes[`offset-md-${props.offsetMd}`] = true;
  if (props.offsetLg) classes[`offset-lg-${props.offsetLg}`] = true;
  if (props.offsetXl) classes[`offset-xl-${props.offsetXl}`] = true;

  // Orden
  if (props.order) classes[`order-${props.order}`] = true;

  // Alineación
  if (props.alignSelf) classes[`align-self-${props.alignSelf}`] = true;

  // Combinar con clases del usuario
  return [classes, userClass];
});
</script>
