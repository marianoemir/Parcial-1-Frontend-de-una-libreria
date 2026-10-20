# Spec Delta

## MODIFIED Requirements

### Requirement: Sin dependencias externas ni persistencia

El sistema SHALL no usar `fetch` ni servidor para las altas de este Ejercicio 4. Las altas SHALL persistir libros y clientes en `localStorage` cuando esté disponible, conforme a la capability `ej6-persistencia-documentacion`; si `localStorage` no está disponible, SHALL seguir funcionando en memoria durante la sesión.

#### Scenario: Todo funciona con datos locales

- **WHEN** se abre index.html directamente (sin servidor)
- **THEN** las altas de libros y clientes funcionan con el modelo de datos local y, cuando `localStorage` está disponible, se recuperan al recargar la página

#### Scenario: Sin localStorage las altas siguen funcionando

- **WHEN** el navegador bloquea el acceso a `localStorage`
- **THEN** las altas de libros y clientes funcionan en memoria durante la sesión y no interrumpen la interfaz
