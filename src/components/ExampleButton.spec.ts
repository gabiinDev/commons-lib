import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ExampleButton from "./ExampleButton.vue";

/**
 * Suite de pruebas para el componente ExampleButton
 * Estas pruebas verifican la renderización, props, atributos y eventos del componente
 */
describe("ExampleButton", () => {
  /**
   * Verifica que el componente se renderice correctamente
   * - El slot default debe mostrarse dentro del botón
   * - El botón debe tener la clase example-button
   */
  it("renderiza correctamente", () => {
    const wrapper = mount(ExampleButton as any, {
      slots: {
        default: "Botón de test",
      },
    });

    expect(wrapper.text()).toBe("Botón de test");
    expect(wrapper.classes()).toContain("btn");
  });

  /**
   * Verifica que se aplique la clase is-primary cuando la prop primary es true
   * - El botón debe tener la clase is-primary
   */
  it("aplica la clase btn-primary cuando se pasa la prop primary", () => {
    const wrapper = mount(ExampleButton as any, {
      propsData: {
        primary: true,
      },
    });

    expect(wrapper.classes()).toContain("btn-primary");
  });

  /**
   * Verifica que NO se aplique la clase is-primary cuando primary es false
   * - El botón NO debe tener la clase is-primary
   */
  it("no aplica la clase btn-primary cuando primary es false", () => {
    const wrapper = mount(ExampleButton as any, {
      propsData: {
        primary: false,
      },
    });

    expect(wrapper.classes()).not.toContain("btn-primary");
  });

  /**
   * Verifica que se aplique el atributo disabled cuando la prop disabled es true
   * - El botón debe tener el atributo HTML disabled
   */
  it("aplica el atributo disabled cuando se pasa la prop disabled", () => {
    const wrapper = mount(ExampleButton as any, {
      propsData: {
        disabled: true,
      },
    });

    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  /**
   * Verifica que el componente emita el evento click con la información correcta
   * - Debe emitir un evento 'click'
   * - El evento debe incluir la propiedad event (el evento original)
   * - El evento debe incluir un contador (count) que se incrementa con cada clic
   */
  it("emite el evento click con la información correcta", async () => {
    const wrapper = mount(ExampleButton as any);

    // Primer clic
    await wrapper.trigger("click");

    const emitted = wrapper.emitted("click");
    expect(emitted).toBeTruthy();
    expect(emitted?.length).toBe(1);
    expect(emitted?.[0][0]).toHaveProperty("count", 1);
    expect(emitted?.[0][0]).toHaveProperty("event");

    // Segundo clic - debería incrementar el contador
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")?.length).toBe(2);
    expect(wrapper.emitted("click")?.[1][0]).toHaveProperty("count", 2);
  });

  /**
   * Verifica que NO se emita el evento click cuando el botón está deshabilitado
   * - No debería emitir ningún evento cuando se hace clic en un botón deshabilitado
   */
  it("no emite el evento click cuando está deshabilitado", async () => {
    const wrapper = mount(ExampleButton as any, {
      propsData: {
        disabled: true,
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeFalsy();
  });
});
