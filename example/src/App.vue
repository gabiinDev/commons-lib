<template>
  <div class="container">
    <header class="header">
      <h1>Vue Commons Library - Demo</h1>
    </header>

    <main class="row margin-top">
      <section class="col-md-12">
        <h2>Componentes</h2>
        <ul>
          <li>
            <button
              @click="currentView = 'button-demo'"
              class="btn btn-primary"
              :class="{ active: currentView === 'button-demo' }"
            >
              ExampleButton
            </button>
          </li>
          <!-- Aquí puedes agregar más componentes en el futuro -->
        </ul>

        <h2>Utilidades</h2>
        <ul>
          <li>
            <button
              @click="currentView = 'date-utils-demo'"
              class="btn btn-primary"
              :class="{ active: currentView === 'date-utils-demo' }"
            >
              Date Utils
            </button>
          </li>
          <!-- Aquí puedes agregar más utilidades en el futuro -->
        </ul>
      </section>

      <component :is="currentComponent"></component>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import ButtonDemo from "@exa/demos/ButtonDemo.vue";
import DateUtilsDemo from "@exa/demos/DateUtilsDemo.vue";

export default defineComponent({
  name: "DemoApp",
  components: {
    ButtonDemo,
    DateUtilsDemo,
  },
  setup() {
    const currentView = ref("button-demo");

    const currentComponent = computed(() => {
      switch (currentView.value) {
        case "button-demo":
          return "ButtonDemo";
        case "date-utils-demo":
          return "DateUtilsDemo";
        default:
          return "ButtonDemo";
      }
    });

    return {
      currentView,
      currentComponent,
    };
  },
});
</script>
