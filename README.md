# Documentación del Bot de Discord

## Introducción
Bot de Discord está diseñado específicamente para su uso dentro de la comunidad de GTAHUB. Proporciona un sistema de notificaciones eficiente y adaptado para varios servicios de empresas en servidores de Discord, mejorando los escenarios de rol y las tareas administrativas. El bot incluye funciones para configurar canales de notificación, gestionar múltiples tipos de servicios empresariales y garantizar una comunicación fluida entre el personal y los jugadores. Está construido con tecnologías modernas para ofrecer una experiencia confiable e inmersiva en el entorno de rol de GTAHUB.

## Funciones

- **Sistema de Notificaciones**:
  - Permite a los administradores de servidores configurar canales para recibir notificaciones.
  - Soporta múltiples tipos de empresas, incluyendo:
    - Servicios de mecánicos
    - Servicios de transporte
    - Servicios de seguridad
    - Servicios generales

- **Gestión de Servidores**:
  - Proporciona una lista de todos los servidores donde el bot está activo, junto con sus IDs respectivos.
  - Permite a los usuarios autorizados remover el bot de cualquier servidor de forma remota.

- **Gestión de Permisos**:
  - Restringe comandos sensibles a usuarios autorizados.
  - Valida roles de usuario e IDs para garantizar operaciones seguras.

- **Facilidad de Uso**:
  - Comandos slash para una interacción intuitiva del usuario.
  - Mensajes de retroalimentación informativos para guiar a los usuarios durante la configuración y las operaciones.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para construir aplicaciones escalables.
- **Discord.js**: Una potente librería para interactuar con la API de Discord.
- **Mongoose**: Librería ODM (Modelado de Datos de Objetos) para MongoDB que maneja el almacenamiento y recuperación de datos.
- **MongoDB**: Base de datos para almacenar configuraciones de servidores y ajustes de notificaciones.

## Paquetes

- `@discordjs/builders`: Simplifica la creación de comandos slash.
- `dotenv`: Carga variables de entorno desde un archivo `.env` para una configuración segura.
- `nodemon`: Facilita el desarrollo en vivo reiniciando automáticamente el bot al cambiar el código.

## Instrucciones de Configuración

### Requisitos Previos
1. Node.js instalado en tu sistema.
2. Instancia de MongoDB (local o basada en la nube).
3. Token del bot de Discord desde el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications).

### Instalación

1. Clona el repositorio:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` y complétalo con:
   ```env
   TOKEN=tu-token-del-bot-de-discord
   MONGO_URI=tu-cadena-de-conexión-a-mongodb
   CEONOTIFY=id-usuario1,id-usuario2
   ```

4. Inicia el bot:
   ```bash
   npm start
   ```

### Comandos

- **`/empresamecanico`**
  - **Descripción**: Configura el canal de notificaciones para servicios de mecánicos.
  - **Opciones**: ID del canal donde se enviarán las notificaciones.
  - **Ejemplo**:
    ```
    /empresamecanico canal: #notificaciones
    ```

- **`/clientes`**
  - **Descripción**: Lista todos los servidores donde el bot está activo.

- **`/expulsarbot`**
  - **Descripción**: Remueve el bot de un servidor especificado.
  - **Opciones**: ID del servidor.
  - **Ejemplo**:
    ```
    /expulsarbot guildid: 123456789012345678
    ```

## Notas de Desarrollo

- **Diseño del Esquema**:
  El bot utiliza un esquema centralizado para gestionar las configuraciones de los servidores:
  ```javascript
  const empresasConfigSchema = new mongoose.Schema({
    guildId: { type: String, required: true },
    empresas: {
      mecanico: { canal: { type: String, default: null } },
      transporte: { canal: { type: String, default: null } },
      seguridad: { canal: { type: String, default: null } },
      servicios: { canal: { type: String, default: null } },
    },
  });
  ```

- **Manejo de Errores**:
  Un manejo integral de errores asegura que los comandos fallen de manera controlada con retroalimentación informativa.

- **Escalabilidad**:
  El bot está diseñado para soportar tipos de empresas adicionales y nuevas funcionalidades con cambios mínimos en el código.

## Mejoras Futuras

- **Integración de Roles Dinámicos**:
  Soporte para permisos basados en roles dentro de los servidores de Discord.
- **Mensajes de Notificación Personalizados**:
  Permitir a los administradores personalizar el contenido de las notificaciones para cada tipo de servicio.
- **Panel de Análisis**:
  Proveer estadísticas de uso e información útil para los administradores de servidores.

## Contribuciones

Siéntete libre de contribuir a este proyecto enviando issues o pull requests. Para cambios importantes, abre un issue primero para discutir lo que te gustaría cambiar.

## Licencia

Este proyecto está bajo la Licencia MIT.


