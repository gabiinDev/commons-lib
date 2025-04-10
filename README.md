# Vue Commons Library 📚

Librería de componentes y utilidades para Vue 2.7.16 con TypeScript.

## Instalación

```bash
npm install vue-commons-lib
```

## Requisitos

- Vue 2.7.16
- TypeScript
- Proyecto ESM (con `"type": "module"` en package.json)

## Uso

### Importación de componentes individuales

```typescript
import { ExampleButton } from 'vue-commons-lib';

export default {
  components: {
    ExampleButton
  }
}
```

### Uso de utilidades

```typescript
import { formatDate, daysDifference } from 'vue-commons-lib';

// Formatear una fecha
const formattedDate = formatDate(new Date(), 'dd/MM/yyyy HH:mm');
console.log(formattedDate); // Ejemplo: 15/05/2023 14:30

// Calcular diferencia entre fechas
const days = daysDifference(new Date('2023-01-01'), new Date('2023-01-15'));
console.log(days); // 14
```

## Nota importante ⚠️

Esta librería está diseñada exclusivamente para proyectos TypeScript con ESM. No proporciona soporte para CommonJS.

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar el entorno de desarrollo para pruebas
npm run dev

# Compilar la librería para producción
npm run build

# Este comando también funciona en Windows (ya no es necesario un comando específico)
npm run build
```

## Tests ✅

La librería utiliza Vitest para las pruebas unitarias:

```bash
# Ejecutar tests una vez
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage
```

### Estructura de los Tests 🔍

Los tests siguen una estructura clara y se encuentran junto a los archivos que están probando con la extensión `.spec.ts`:

#### Tests de Utilidades (src/utils/*.spec.ts)

Los tests de utilidades verifican el comportamiento de las funciones:

```typescript
// Ejemplo de test para utils/dateUtils.ts
describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formatea una fecha en el formato dd/MM/yyyy', () => {
      const date = new Date('2023-05-15T00:00:00');
      expect(formatDate(date, 'dd/MM/yyyy')).toBe('15/05/2023');
    });
    
    // Más tests para formatDate...
  });
  
  describe('daysDifference', () => {
    it('calcula la diferencia en días entre dos fechas', () => {
      const startDate = new Date('2023-01-01T00:00:00');
      const endDate = new Date('2023-01-15T00:00:00');
      expect(daysDifference(startDate, endDate)).toBe(14);
    });
    
    // Más tests para daysDifference...
  });
});
```

#### Tests de Componentes (src/components/*.spec.ts)

Los tests de componentes utilizan `@vue/test-utils` para verificar la renderización, props, y eventos:

```typescript
// Ejemplo de test para components/ExampleButton.vue
describe('ExampleButton', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(ExampleButton, {
      slots: { default: 'Botón de test' }
    });
    
    expect(wrapper.text()).toBe('Botón de test');
    expect(wrapper.classes()).toContain('example-button');
  });
  
  it('aplica la clase is-primary cuando se pasa la prop primary', () => {
    const wrapper = mount(ExampleButton, {
      propsData: { primary: true }
    });
    
    expect(wrapper.classes()).toContain('is-primary');
  });
  
  // Más tests para ExampleButton...
});
```

### Guía para crear y documentar tests 📝

#### Paso 1: Crear un nuevo archivo de test

Crea un archivo `.spec.ts` junto al archivo que quieres testear:

```
src/
├── components/
│   ├── MiComponente.vue
│   └── MiComponente.spec.ts
└── utils/
    ├── miUtilidad.ts
    └── miUtilidad.spec.ts
```

#### Paso 2: Estructura básica del test

Sigue esta estructura para los tests:

```typescript
import { describe, it, expect } from 'vitest';
// Importa el código que vas a testear
import { miFuncion } from './miUtilidad';
// Para componentes:
// import { mount } from '@vue/test-utils';
// import MiComponente from './MiComponente.vue';

/**
 * Suite de pruebas para [nombre del módulo]
 * Breve descripción de lo que se está probando
 */
describe('[Nombre del módulo]', () => {
  /**
   * Grupo de tests para una función/característica específica
   */
  describe('[nombre de la función/característica]', () => {
    /**
     * Test individual
     * Descripción clara de lo que se está verificando
     */
    it('debería [comportamiento esperado]', () => {
      // Arrange (Preparar)
      const entrada = 'valor de entrada';
      
      // Act (Actuar)
      const resultado = miFuncion(entrada);
      
      // Assert (Verificar)
      expect(resultado).toBe('valor esperado');
    });
  });
});
```

#### Paso 3: Documentación de los tests

Para documentar adecuadamente los tests, sigue estas pautas:

1. **Comentario principal**: Describe el propósito general de la suite de pruebas
2. **Comentarios de grupo**: Explica qué función o característica se está probando
3. **Comentarios de test**: Para cada test individual:
   - Qué se está verificando específicamente
   - Los datos de entrada que se utilizan
   - El resultado esperado
   - Por qué es importante este test

Ejemplo de un test bien documentado:

```typescript
/**
 * Verifica que la función formatee correctamente fechas con diferentes formatos
 * Entrada: 15 de mayo de 2023, con formato 'dd/MM/yyyy'
 * Salida esperada: "15/05/2023"
 * 
 * Este test es importante porque verifica el formato más común usado en la aplicación
 */
it('formatea una fecha en el formato dd/MM/yyyy', () => {
  const date = new Date('2023-05-15T00:00:00');
  expect(formatDate(date, 'dd/MM/yyyy')).toBe('15/05/2023');
});
```

#### Paso 4: Tipos de assertions comunes ✓

- `expect(valor).toBe(valorEsperado)` - Igualdad estricta
- `expect(valor).toEqual(objetoEsperado)` - Igualdad profunda (para objetos)
- `expect(array).toContain(elemento)` - Verificar si un array contiene un elemento
- `expect(función).toThrow(mensajeError)` - Verificar que una función lance un error
- `expect(objeto).toHaveProperty('propiedad', valor)` - Verificar propiedades de objetos

#### Paso 5: Tests para componentes Vue

Para componentes Vue, utiliza `@vue/test-utils`:

```typescript
it('emite el evento al hacer clic', async () => {
  // Montar el componente
  const wrapper = mount(MiComponente);
  
  // Simular un clic
  await wrapper.find('button').trigger('click');
  
  // Verificar que se emitió el evento
  expect(wrapper.emitted('click')).toBeTruthy();
});
```

Prueba aspectos como:
- Renderización correcta del componente
- Respuesta a props
- Emisión de eventos
- Comportamiento de métodos
- Interacciones de usuario

#### Paso 6: Buenas prácticas ⭐

1. **Tests atómicos**: Cada test debe verificar una sola cosa
2. **Naming claro**: Usa nombres descriptivos que expliquen qué se está probando
3. **Arrange-Act-Assert**: Estructura tus tests en estas tres fases
4. **Independencia**: Los tests no deben depender unos de otros
5. **Cobertura**: Intenta cubrir casos normales, límite y de error

#### Paso 7: Ejecutar los tests ▶️

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests específicos con patrón de nombre
npm test -- -t "nombre del test"

# Ejecutar un archivo específico
npm test -- src/utils/miUtilidad.spec.ts
```

La documentación completa de Vitest está disponible en [vitejs.dev/guide/](https://vitest.dev/guide/).

### Estructura del proyecto

**Librería (`/src`):** El proyecto esta configurado con el alias `@` para referenciar carpetas/archivos que se encuentren bajo esta ruta.

```typescript
// En lugar de ❌ !BAD
import { SomeComponent } from './src/components/SomeComponent.vue';

// Debes usar ✅ !GOOD
import { SomeComponent } from '@/components/SomeComponent.vue';
```
**Example (`/example`):** El proyecto está configurado con el alias `@exa` en la carpeta de ejemplo para referenciar carpetas/archivos que se encuentren bajo esta ruta.
```typescript
// En lugar de ❌ !BAD
import { SomeDemoComponent } from '../example/src/demos/SomeDemoComponent.vue';

// Debes usar ✅ !GOOD
import { SomeDemoComponent } from '@exa/demos/SomeDemoComponent.vue';

// Si deseas import un componente desde LIBRERIA
// En lugar de ❌ !BAD
import { SomeLibComponent } from '../../src/components/SomeLibComponent.vue';

// Debes usar ✅ !GOOD
import { SomeLibComponent } from '@/components/SomeLibComponent.vue';
```

La estructura general del proyecto es:

```
/
├── src/                    # Código fuente de la librería
│   ├── components/         # Componentes Vue
│   │   └── *.spec.ts       # Tests de componentes
│   ├── utils/              # Utilidades y funciones
│   │   └── *.spec.ts       # Tests de utilidades
│   └── index.ts            # Punto de entrada principal
│
├── example/                # Entorno de desarrollo y pruebas
│   ├── src/                # Código fuente del entorno de pruebas
│   │   ├── demos/          # Componentes de demostración
│   │   ├── App.vue         # Componente principal de la app de pruebas
│   │   └── main.ts         # Punto de entrada de la app de pruebas
│   ├── vite.config.ts      # Configuración de Vite para desarrollo
│   └── index.html          # HTML principal
│
├── vitest.config.ts        # Configuración de Vitest para tests
├── vite.config.ts          # Configuración de Vite para producción
└── package.json            # Configuración del proyecto
```

### Entorno de pruebas

El proyecto incluye un entorno de desarrollo para probar los componentes y utilidades en tiempo real. Este entorno está separado de los archivos de la librería:

- **Librería**: Todos los archivos en `/src` forman parte de la librería que será empaquetada y distribuida.
- **Entorno de pruebas**: Los archivos en `/example` **son solo para pruebas y no se incluyen en el paquete final**.

Para ejecutar el entorno de pruebas:

```bash
npm run dev
```

Esto iniciará un servidor de desarrollo en http://localhost:3000 donde podrás ver y probar todos los componentes y utilidades.

#### Configurar el puerto de desarrollo

Si necesitas cambiar el puerto del servidor de desarrollo (por defecto 3000), debes modificar el archivo `/example/vite.config.ts`:

```typescript
// example/vite.config.ts
export default defineConfig({
  // ... otras configuraciones
  server: {
    port: 3000 // Cambia este número al puerto deseado
  }
  // ... resto de configuraciones
})
```

Después de modificar el puerto, reinicia el servidor de desarrollo con `npm run dev`.

#### Añadir nuevas demostraciones 🆕

Para agregar una demostración de un nuevo componente o utilidad:

1. Crea un nuevo archivo .vue en `/example/src/demos/`
2. Actualiza `App.vue` para incluir el enlace a la nueva demostración
3. Importa el componente en `App.vue`

Esto permite mantener una clara separación entre el código de la librería y el código para pruebas. 