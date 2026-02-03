# API Apropiación

Este proyecto es una API simulada utilizando JSON Server para fines de desarrollo y pruebas.

## Estructura del Proyecto

- **API/**: Contiene los archivos principales de la API.
  - `db.json`: Archivo de base de datos JSON que define los datos de la API.
  - `package.json`: Archivo de configuración de dependencias de Node.js.
- **PETICIONES/**: Contiene scripts de peticiones para probar la API.
  - `punto1.js` a `punto5.js`: Scripts individuales para diferentes puntos de la API.

## Instalación

1. Asegúrate de tener Node.js instalado en tu sistema.
2. Navega al directorio `API`:
   ```
   cd API
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Uso

Para iniciar el servidor JSON Server:

```
npx json-server --watch db.json
```

El servidor se ejecutará en `http://localhost:3000` por defecto.

## Peticiones

Los archivos en la carpeta `PETICIONES` contienen ejemplos de cómo interactuar con la API. Puedes ejecutarlos para probar diferentes endpoints.

