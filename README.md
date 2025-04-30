# Gestor de Tareas – Refactorización a React

Este proyecto es una refactorización del gestor de tareas original implementado con JavaScript imperativo. El objetivo es transformarlo en una aplicación completamente declarativa utilizando React, manteniendo toda la funcionalidad y el estilo visual originales.

## 🧩 Arquitectura

La aplicación está dividida en una jerarquía clara de componentes React:

- **`App`**: Componente raíz que contiene el proveedor de contexto global.
- **`Sidebar`**: Muestra la lista de usuarios, permite añadir y seleccionar usuarios, y muestra el resumen de tareas del usuario seleccionado.
- **`TaskSection`**: Muestra y gestiona las tareas del usuario activo (añadir, completar, editar y eliminar).

## 🌐 Uso del Context

Se utiliza `React.createContext()` para compartir el estado global entre los componentes sin necesidad de pasar `props` manualmente. El contexto gestiona:

- La lista de usuarios y sus tareas.
- El usuario actualmente seleccionado.
- El tema (claro u oscuro).
- Las funciones para añadir, editar, completar y eliminar tareas.
- Cambiar el tema y deseleccionar usuarios.

## ✅ Funcionalidades implementadas

- Añadir y eliminar usuarios.
- Seleccionar un usuario y ver su lista de tareas.
- Añadir nuevas tareas, completarlas, editarlas o eliminarlas.
- Tachar tareas según su estado de completado.
- Mostrar información resumida de las tareas en el panel lateral.
- Cambiar entre tema claro y oscuro.
- Control total de los campos de entrada con `useState`.

## 🎨 Estilos

Se reutiliza exactamente la hoja de estilos original (`styles.css`) proporcionada en la versión JavaScript imperativa. Todas las clases (`.card`, `.completed`, `.sidebar`, etc.) se mantienen para respetar el diseño original.

## 👨‍💻 Desarrollado por

Sergi Martinez Sanabre – Módulo MP06 - UF3 – Año 2025