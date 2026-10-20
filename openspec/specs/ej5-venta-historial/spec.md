# ej5-venta-historial Specification

## Purpose

Permite componer, editar, calcular y confirmar una venta simulada con datos locales y consultar el historial de ventas confirmadas con el detalle de sus renglones, sin recargar la página ni depender de un servidor.

## Requirements

### Requirement: Composición de la venta

El sistema SHALL componer una venta con un cliente existente del modelo local y al menos un renglón de libro antes de confirmarla, sin recargar la página ni depender de un servidor.

#### Scenario: Cliente existente obligatorio

- **WHEN** se intenta confirmar la venta sin seleccionar un cliente o con un cliente que no existe en el modelo local
- **THEN** se muestra un error, no se registra ninguna venta y los renglones cargados se conservan

#### Scenario: Al menos un renglón obligatorio

- **WHEN** se intenta confirmar la venta sin renglones
- **THEN** se muestra un error y no se registra ninguna venta

#### Scenario: Composición válida de la venta

- **WHEN** se selecciona un cliente existente y se agrega al menos un renglón válido
- **THEN** la venta queda lista para confirmarse con ese cliente y esos renglones, sin recargar la página

### Requirement: Renglones con cantidad entera y libros únicos

El sistema SHALL agregar cada renglón con una cantidad entera mayor que cero y SHALL impedir libros repetidos: si el libro ya está en la venta, SHALL sumar la cantidad al renglón existente e informar el nuevo valor.

#### Scenario: Agregar renglón válido

- **WHEN** se elige un libro existente con cantidad 2 y se agrega el renglón
- **THEN** aparece un renglón con el título del libro, la cantidad 2, su precio unitario y el subtotal correspondiente, y se informa el resultado

#### Scenario: Cantidad inválida rechazada

- **WHEN** se intenta agregar un renglón con cantidad 0, negativa, decimal, vacía o no numérica
- **THEN** se muestra un error y no se agrega ni se modifica ningún renglón

#### Scenario: Libro repetido suma cantidad e informa

- **WHEN** se agrega un libro que ya está en la venta
- **THEN** no se crea un renglón nuevo, se suma la cantidad al renglón existente y el mensaje informa la cantidad actualizada

### Requirement: Edición y quita de renglones antes de confirmar

El sistema SHALL permitir editar la cantidad de cada renglón y quitarlo antes de confirmar la venta; una cantidad válida SHALL actualizar el subtotal de la fila y el total sin que el campo editado pierda el foco, y una cantidad inválida SHALL restaurar el valor, mostrar el error y conservar el foco.

#### Scenario: Editar cantidad válida actualiza subtotal y total

- **WHEN** se cambia la cantidad de un renglón de 2 a 5
- **THEN** el subtotal de esa fila y el total de la venta se actualizan sin duplicar el renglón ni recargar la página

#### Scenario: Foco conservado al ajustar con teclado

- **WHEN** el cursor está en el campo de cantidad de un renglón y se presiona ArrowUp dos veces
- **THEN** la cantidad pasa a 2 y luego a 3, y el foco permanece en el mismo campo de cantidad

#### Scenario: Foco conservado al salir del campo con Tab

- **WHEN** se escribe 5 en el campo de cantidad y se presiona Tab
- **THEN** la cantidad queda en 5, los importes se actualizan y el foco pasa al siguiente control del formulario, no al inicio de la página

#### Scenario: Quitar renglón con un solo clic después de editarlo

- **WHEN** se escribe 5 en el campo de cantidad y se hace clic en «Quitar renglón»
- **THEN** el renglón se quita con ese único clic y el total se actualiza

#### Scenario: Cantidad inválida restaura el valor y conserva el foco

- **WHEN** se ingresa en la cantidad un valor 0, negativo, decimal, vacío o no numérico mientras el campo está enfocado
- **THEN** el campo vuelve a mostrar la última cantidad válida, se muestra el error y el foco permanece en ese campo

#### Scenario: Quitar renglón actualiza total y estado vacío

- **WHEN** se quita un renglón
- **THEN** el total se recalcula y, si ya no quedan renglones, se muestra el mensaje de venta sin renglones y el total queda en `$0.00`

### Requirement: Cálculos con dos decimales

El sistema SHALL calcular cada subtotal como la cantidad del renglón multiplicada por su precio unitario y el total como la suma de los subtotales, redondeando a dos decimales y mostrando los importes con el formato `$N.NN`.

#### Scenario: Subtotal y total de la venta

- **WHEN** la venta tiene dos unidades de un libro a $1500 y una unidad de otro a $2000
- **THEN** los subtotales son $3000.00 y $2000.00, y el total es $5000.00

#### Scenario: Recálculo al editar o quitar renglones

- **WHEN** se edita la cantidad de un renglón o se quita un renglón
- **THEN** los subtotales afectados y el total se recalculan con los valores vigentes de la venta

#### Scenario: Importes con centavos y dos decimales

- **WHEN** un subtotal o el total resulta con centavos
- **THEN** el importe se muestra redondeado a dos decimales con el formato `$N.NN`

### Requirement: Confirmación de la venta

El sistema SHALL registrar una venta solo cuando el cliente y todos los renglones sean válidos, guardando un identificador único, la fecha, el cliente, los renglones con su precio unitario copiado y el total; después SHALL limpiar el formulario y mostrar un mensaje de resultado.

#### Scenario: Confirmación exitosa registra la venta completa

- **WHEN** se confirma una venta con cliente existente y renglones de cantidades enteras mayores que cero
- **THEN** se registra una venta con identificador único, fecha, cliente, renglones y total, y aparece en el historial

#### Scenario: Precio unitario copiado como valor histórico

- **WHEN** se modifica el precio actual de un libro después de confirmar una venta que lo incluía
- **THEN** el renglón y el total de esa venta conservan el precio unitario y el subtotal copiados al confirmar

#### Scenario: Rechazo sin registrar ni limpiar

- **WHEN** la confirmación falla por cliente inválido, ausencia de renglones o cantidad inválida
- **THEN** no se registra la venta y los datos cargados en el formulario se conservan

#### Scenario: Formulario limpio y mensaje de resultado

- **WHEN** una venta se confirma correctamente
- **THEN** el cliente, el libro y la cantidad vuelven a su estado inicial, la tabla de renglones queda vacía, el total queda en `$0.00` y un mensaje informa el identificador y el total de la venta confirmada

### Requirement: Historial de solo lectura con detalle de renglones

El sistema SHALL mostrar las ventas confirmadas en el historial en modo de solo lectura, con identificador, fecha, cliente y total, y SHALL permitir consultar el detalle de sus renglones con el precio unitario y el subtotal guardados; cuando no haya ventas SHALL mostrar un mensaje de historial vacío.

#### Scenario: Listado del historial

- **WHEN** existen ventas confirmadas
- **THEN** el historial muestra una fila por venta con identificador, fecha, cliente y total

#### Scenario: Detalle de renglones de una venta

- **WHEN** se solicita «Ver detalle» de una venta confirmada
- **THEN** se muestran sus renglones con libro, cantidad, precio unitario y subtotal, más el total de la venta

#### Scenario: Historial sin acciones de edición ni borrado

- **WHEN** se inspecciona una venta confirmada en el historial
- **THEN** solo se ofrece la acción de consultar su detalle y no existen controles para editar o eliminar la venta ni sus renglones

#### Scenario: Historial vacío

- **WHEN** no hay ventas confirmadas
- **THEN** se muestra el mensaje de que no hay ventas registradas y la tabla no tiene filas de ventas
