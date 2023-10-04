### Proyecto de API REST para Gestión de Cuentas Bancarias

#### Descripción del proyecto:

El objetivo de este proyecto es desarrollar una API REST para gestionar cuentas bancarias y transacciones. La API debe ser capaz de crear cuentas bancarias, realizar depósitos y retiros, así como proporcionar un historial de transacciones para cada cuenta.

#### Requisitos del proyecto:

1. **Creación de cuentas bancarias**:
   - Debe ser posible crear una cuenta bancaria proporcionando un nombre de titular y un saldo inicial.
   - Cada cuenta debe tener un número de cuenta único generado automáticamente.

2. **Depósitos**:
   - Los usuarios deben poder realizar depósitos en sus cuentas.
   - Cada transacción de depósito debe registrarse en la base de datos.

3. **Retiros**:
   - Los usuarios deben poder realizar retiros de sus cuentas.
   - Debe asegurarse de que no se permitan retiros si el saldo de la cuenta es insuficiente.
   - Cada transacción de retiro debe registrarse en la base de datos.

4. **Consulta de saldo**:
   - Los usuarios deben poder consultar el saldo actual de sus cuentas.

5. **Historial de transacciones**:
   - Debe ser posible consultar el historial de transacciones para una cuenta específica.

6. **Transacciones seguras**:
   - Todas las transacciones (depósitos y retiros) deben realizarse dentro de una transacción de base de datos para garantizar la consistencia de los datos.
   - En caso de fallo durante una transacción, se debe asegurar que la base de datos revierta cualquier cambio realizado durante la transacción.

#### Tecnologías requeridas:

- Node.js y Express.js para la creación de la API REST.
- Una base de datos relacional como PostgreSQL o MySQL para almacenar las cuentas bancarias y las transacciones.
- Utiliza un ORM (Object-Relational Mapping) como Sequelize para interactuar con la base de datos.
- Implementa la gestión de transacciones en la base de datos para garantizar la integridad de los datos.

#### Entregables:

- API REST completamente funcional que cumpla con los requisitos mencionados.
- Documentación de la API que explique cómo usarla, incluyendo rutas, métodos y ejemplos de solicitud y respuesta.

Este proyecto te dará la oportunidad de aprender a trabajar con transacciones en una base de datos relacional en el contexto de una aplicación del mundo real. Además, te permitirá practicar el desarrollo de API RESTful con Node.js y Express.js.