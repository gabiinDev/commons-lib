<template>
  <div class="row">
    <div class="col-md-12">
      <h2>ExampleButton</h2>

      <div class="description">
        <p>
          Un componente de botón personalizable con diferentes estilos y
          eventos.
        </p>
      </div>

      <div class="examples">
        <h3>Ejemplos básicos</h3>
        <div class="panel panel-default">
          <div class="panel-body">
            <h4>Botón estándar</h4>
            <example-button @click="handleClick"> Botón Normal </example-button>
            <div style="margin-top: 10px">
              <pre>
&lt;example-button&gt;Botón Normal&lt;/example-button&gt;</pre
              >
            </div>
          </div>
        </div>

        <div class="panel panel-default">
          <div class="panel-body">
            <h4>Botón primario</h4>
            <example-button primary @click="handleClick">
              Botón Primario
            </example-button>
            <div style="margin-top: 10px">
              <pre>
&lt;example-button primary&gt;Botón Primario&lt;/example-button&gt;</pre
              >
            </div>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="panel-body">
            <h4>Botón deshabilitado</h4>
            <example-button disabled @click="handleClick">
              Botón Deshabilitado
            </example-button>
            <div style="margin-top: 10px">
              <pre>
&lt;example-button disabled&gt;Botón Deshabilitado&lt;/example-button&gt;</pre
              >
            </div>
          </div>
        </div>
      </div>

      <div class="panel panel-primary">
        <div class="panel-body">
          <h3>Eventos</h3>

          <div class="event-log">
            <h4>Log de eventos</h4>
            <div
              class="log-container"
              style="max-height: 300px; overflow-y: auto"
            >
              <ul
                v-for="(event, index) in eventLog"
                :key="index"
                class="list-unstyled"
              >
                <li>{{ event }}</li>
              </ul>
              <div v-if="eventLog.length === 0" class="empty-log">
                Haz clic en algún botón para ver los eventos
              </div>
            </div>
            <button
              class="margin-top-half btn btn-sm btn-default"
              @click="clearLog"
            >
              Limpiar log
            </button>
          </div>
        </div>
      </div>
      <div class="panel panel-primary">
        <div class="panel-body">
          <h3>Props disponibles</h3>

          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Tipo</th>
                <th>Default</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>primary</td>
                <td>Boolean</td>
                <td>false</td>
                <td>Aplica estilo primario al botón</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>Boolean</td>
                <td>false</td>
                <td>Deshabilita el botón</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel panel-primary">
        <div class="panel-body">
          <h3>Eventos emitidos</h3>

          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Evento</th>
                <th>Parámetros</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>click</td>
                <td>{ event, count }</td>
                <td>
                  Se emite al hacer clic en el botón. <code>event</code> es el
                  evento original y <code>count</code> es el contador de clics
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ExampleButton from "@/components/ExampleButton.vue";

export default defineComponent({
  name: "ButtonDemo",
  components: {
    ExampleButton,
  },
  setup() {
    const eventLog = ref<string[]>([]);

    const handleClick = (data: { event: MouseEvent; count: number }) => {
      eventLog.value.unshift(
        `Click #${data.count} - ${new Date().toLocaleTimeString()}`
      );
    };

    const clearLog = () => {
      eventLog.value = [];
    };

    return {
      eventLog,
      handleClick,
      clearLog,
    };
  },
});
</script>
