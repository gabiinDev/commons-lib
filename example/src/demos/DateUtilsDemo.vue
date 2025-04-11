<template>
  <div class="row">
    <div class="col-md-12">
      <h2>Date Utils</h2>

      <div class="description">
        <p>Utilidades para trabajar con fechas y cálculos de tiempo.</p>
      </div>

      <form action="" class="form-vertical">
        <h3>formatDate()</h3>
        <div class="form-group">
          <label class="control-label" for="dummyDate">Fecha:</label>
          <input
            class="form-control"
            id="dummyDate"
            name="dummyDate"
            type="date"
            v-model="dateToFormat"
          />
          <!-- <nf-datepicker
            id="dummyDate"
            name="dummy"
            v-model="dateToFormat"
            placeholder="Ejemplo: dd/MM/yyyy HH:mm"
          ></nf-datepicker> -->
        </div>
        <div class="form-group">
          <label class="control-label" for="format">Formato:</label>
          <input
            class="form-control"
            id="format"
            name="format"
            type="text"
            v-model="format"
            placeholder="Ejemplo: dd/MM/yyyy HH:mm"
          />
        </div>

        <div class="form-group">
          <pre><code>{{ formatDateCode }}</code></pre>

          <div class="panel panel-primary">
            <div class="panel-body">Resultado: {{ formattedDate }}</div>
          </div>
        </div>
      </form>

      <section class="col-md-12">
        <h4>Parámetros</h4>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>date</td>
              <td>Date | number</td>
              <td>La fecha a formatear</td>
            </tr>
            <tr>
              <td>format</td>
              <td>string</td>
              <td>
                Formato deseado. Opciones: <br />
                dd: día, MM: mes, yyyy: año, <br />
                HH: hora, mm: minutos, ss: segundos
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>

    <div class="col-md-12">
      <h3>daysDifference()</h3>

      <form action="" class="form-vertical">
        <div class="form-group">
          <label class="control-label" for="startDate">Fecha inicio:</label>
          <input
            class="form-control"
            id="startDate"
            name="startDate"
            type="date"
            v-model="startDate"
          />
        </div>
        <div class="form-group">
          <label class="control-label" for="endDate">Fecha fin:</label>
          <input
            class="form-control"
            id="endDate"
            name="endDate"
            type="date"
            v-model="endDate"
          />
        </div>

        <div class="form-group">
          <pre><code>{{ daysDifferenceCode }}</code></pre>
          <div class="panel panel-primary">
            <div class="panel-body">Resultado: {{ daysDiff }} días</div>
          </div>
        </div>
      </form>

      <section class="col-md-12">
        <h4>Parámetros</h4>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>startDate</td>
              <td>Date | number</td>
              <td>La fecha de inicio</td>
            </tr>
            <tr>
              <td>endDate</td>
              <td>Date | number</td>
              <td>La fecha de fin</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { formatDate, daysDifference } from "@/utils/dateUtils";

export default defineComponent({
  name: "DateUtilsDemo",
  setup() {
    // formatDate demo
    const today = new Date();
    const dateToFormat = ref(today.toISOString().split("T")[0]); // formato 'yyyy-MM-dd'
    const format = ref("dd/MM/yyyy HH:mm");

    const formattedDate = computed(() => {
      try {
        const date = new Date(dateToFormat.value + "T00:00:00");
        return formatDate(date, format.value);
      } catch (error) {
        return "Error: Fecha o formato inválido";
      }
    });

    const formatDateCode = computed(() => {
      return `import { formatDate } from 'vue-commons-lib';

// Formatear una fecha
const date = new Date('${dateToFormat.value}T00:00:00');
const result = formatDate(date, '${format.value}');
console.log(result); // ${formattedDate.value}`;
    });

    // daysDifference demo
    const startDate = ref(new Date().toISOString().split("T")[0]);
    const endDate = ref(
      new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    );

    const daysDiff = computed(() => {
      try {
        const start = new Date(startDate.value + "T00:00:00");
        const end = new Date(endDate.value + "T00:00:00");
        return daysDifference(start, end);
      } catch (error) {
        return "Error: Fechas inválidas";
      }
    });

    const daysDifferenceCode = computed(() => {
      return `import { daysDifference } from 'vue-commons-lib';

// Calcular diferencia entre dos fechas
const start = new Date('${startDate.value}T00:00:00');
const end = new Date('${endDate.value}T00:00:00');
const days = daysDifference(start, end);
console.log(days); // ${daysDiff.value}`;
    });

    return {
      dateToFormat,
      format,
      formattedDate,
      formatDateCode,
      startDate,
      endDate,
      daysDiff,
      daysDifferenceCode,
    };
  },
});
</script>
