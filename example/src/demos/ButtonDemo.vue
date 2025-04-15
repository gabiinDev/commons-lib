<template>
  <NfRow>
    <NfCol :md="12">
      <h2>ExampleButton</h2>

      <div class="description">
        <p>
          Un componente de botón personalizable con diferentes estilos y
          eventos.
        </p>
      </div>
      <h1>Ejemplos básicos</h1>
      <div class="examples">
        <NfPanel type="default">
          <template #header>Botón estándar</template>
          <template #body>
            <h4></h4>
            <example-button @click="handleClick"> Botón Normal </example-button>
            <div style="margin-top: 10px">
              <pre>
&lt;example-button&gt;Botón Normal&lt;/example-button&gt;</pre
              >
            </div>
          </template>
        </NfPanel>

        <NfPanel type="primary">
          <template #header>Botón primario</template>
          <template #body>
            <example-button primary @click="handleClick">
              Botón Primario
            </example-button>
            <div style="margin-top: 10px">
              <pre>
&lt;example-button primary&gt;Botón Primario&lt;/example-button&gt;</pre
              >
            </div>
          </template>
        </NfPanel>

        <NfPanel type="danger">
          <template #header>Botón deshabilitado</template>
          <template #body>
            <example-button disabled @click="handleClick">
              Botón Deshabilitado
            </example-button>
            <div style="margin-top: 10px">
              <pre>
&lt;example-button disabled&gt;Botón Deshabilitado&lt;/example-button&gt;</pre
              >
            </div>
          </template>
        </NfPanel>
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
    </NfCol>
  </NfRow>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ExampleButton, NfRow, NfCol, NfPanel } from "@/ui/components";

const eventLog = ref<string[]>([]);

const handleClick = (data: { event: MouseEvent; count: number }) => {
  eventLog.value.unshift(
    `Click #${data.count} - ${new Date().toLocaleTimeString()}`
  );
};

const clearLog = () => {
  eventLog.value = [];
};
</script>
