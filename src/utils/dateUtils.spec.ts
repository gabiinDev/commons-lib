import { describe, it, expect } from "vitest";
import { formatDate, daysDifference } from "./dateUtils";

/**
 * Suite de pruebas para las utilidades de fechas (dateUtils)
 * Estas pruebas verifican el correcto funcionamiento de las funciones
 * formatDate y daysDifference en diferentes escenarios
 */
describe("dateUtils", () => {
  /**
   * Pruebas para la función formatDate
   * Esta función convierte un objeto Date o timestamp a un string formateado
   */
  describe("formatDate", () => {
    /**
     * Verifica el formato estándar dd/MM/yyyy
     * Entrada: 15 de mayo de 2023
     * Salida esperada: "15/05/2023"
     */
    it("formatea una fecha en el formato dd/MM/yyyy", () => {
      const date = new Date("2023-05-15T00:00:00");
      expect(formatDate(date, "dd/MM/yyyy")).toBe("15/05/2023");
    });

    /**
     * Verifica un formato con guiones y hora incluida
     * Entrada: 15 de mayo de 2023, 14:30
     * Salida esperada: "15-05-2023 14:30"
     */
    it("formatea una fecha en el formato dd-MM-yyyy HH:mm", () => {
      const date = new Date("2023-05-15T14:30:00");
      expect(formatDate(date, "dd-MM-yyyy HH:mm")).toBe("15-05-2023 14:30");
    });

    /**
     * Verifica que la función funcione correctamente con timestamps
     * Entrada: timestamp equivalente al 15 de mayo de 2023
     * Salida esperada: "15/05/2023"
     */
    it("maneja timestamps correctamente", () => {
      const timestamp = new Date("2023-05-15T00:00:00").getTime();
      expect(formatDate(timestamp, "dd/MM/yyyy")).toBe("15/05/2023");
    });

    /**
     * Verifica que la función lance un error con fechas inválidas
     * Debe lanzar una excepción con el mensaje "Fecha inválida"
     */
    it("lanza un error para fechas inválidas", () => {
      expect(() => formatDate(new Date("invalid date"), "dd/MM/yyyy")).toThrow(
        "Fecha inválida"
      );
    });
  });

  /**
   * Pruebas para la función daysDifference
   * Esta función calcula la diferencia en días entre dos fechas
   */
  describe("daysDifference", () => {
    /**
     * Verifica el cálculo de diferencia entre dos fechas separadas por 14 días
     * Entrada: 1 de enero de 2023 y 15 de enero de 2023
     * Salida esperada: 14 días
     */
    it("calcula la diferencia en días entre dos fechas", () => {
      const startDate = new Date("2023-01-01T00:00:00");
      const endDate = new Date("2023-01-15T00:00:00");
      expect(daysDifference(startDate, endDate)).toBe(14);
    });

    /**
     * Verifica que la diferencia sea cero cuando las fechas son iguales
     * Entrada: dos veces la misma fecha (1 de enero de 2023)
     * Salida esperada: 0 días
     */
    it("devuelve cero cuando las fechas son iguales", () => {
      const date = new Date("2023-01-01T00:00:00");
      expect(daysDifference(date, date)).toBe(0);
    });

    /**
     * Verifica que la función devuelva un valor negativo si la fecha de inicio
     * es posterior a la fecha de fin
     * Entrada: 15 de enero de 2023 (inicio) y 1 de enero de 2023 (fin)
     * Salida esperada: -14 días
     */
    it("devuelve un valor negativo cuando la fecha de inicio es posterior a la fecha de fin", () => {
      const startDate = new Date("2023-01-15T00:00:00");
      const endDate = new Date("2023-01-01T00:00:00");
      expect(daysDifference(startDate, endDate)).toBe(-14);
    });

    /**
     * Verifica que la función ignore la parte horaria de las fechas
     * Entrada: 1 de enero a las 10:00 y 2 de enero a las 5:00
     * Salida esperada: 1 día (solo cuenta días completos)
     */
    it("ignora la parte horaria de las fechas", () => {
      const startDate = new Date("2023-01-01T10:00:00");
      const endDate = new Date("2023-01-02T05:00:00");
      expect(daysDifference(startDate, endDate)).toBe(1);
    });

    /**
     * Verifica que la función funcione correctamente con timestamps
     * Entrada: timestamps equivalentes al 1 y 15 de enero de 2023
     * Salida esperada: 14 días
     */
    it("maneja timestamps correctamente", () => {
      const startTimestamp = new Date("2023-01-01T00:00:00").getTime();
      const endTimestamp = new Date("2023-01-15T00:00:00").getTime();
      expect(daysDifference(startTimestamp, endTimestamp)).toBe(14);
    });
  });
});
