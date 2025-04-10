/**
 * Formatea una fecha en el formato especificado
 * @param date - Fecha a formatear (Date o timestamp)
 * @param format - Formato deseado (default: 'dd/MM/yyyy')
 * @returns La fecha formateada como string
 */
export const formatDate = (
  date: Date | number,
  format: string = "dd/MM/yyyy"
): string => {
  const dateObject = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObject.getTime())) {
    throw new Error("Fecha inválida");
  }

  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const seconds = dateObject.getSeconds().toString().padStart(2, "0");

  return format
    .replace("dd", day)
    .replace("MM", month)
    .replace("yyyy", year.toString())
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
};

/**
 * Calcula la diferencia entre dos fechas en días
 * @param startDate - Fecha de inicio
 * @param endDate - Fecha de fin
 * @returns Número de días entre las fechas
 */
export const daysDifference = (
  startDate: Date | number,
  endDate: Date | number
): number => {
  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);

  // Eliminar la parte horaria para comparar solo días
  const utcStart = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  // Convertir milisegundos a días
  return Math.floor((utcEnd - utcStart) / (1000 * 60 * 60 * 24));
};
