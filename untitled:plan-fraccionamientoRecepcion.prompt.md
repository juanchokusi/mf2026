## Plan: Fraccionamiento total recepción

TL;DR - Cuando el usuario presione `btn_guardar` y el campo `total_r` supere 2000, mostrar un modal con una tabla de fracciones (cada fila = una fracción editable, máximo 2000 por fila). Permitir recalcular respetando las filas que el usuario editó, redistribuir el resto entre filas sin editar. Al aceptar, enviar las fracciones al flujo de guardado existente.

**Steps**

1. **Discovery** (completado): revisar `js/FuncionesRecepcion.js` para ubicar el handler de `#btn_guardar` y las funciones de cálculo que actualizan `#total_r`.

2. **UX/HTML**: decidir dónde inyectar el modal (insertar HTML en [Recepcion.php](Recepcion.php) o crear el modal dinámicamente desde JS). *Recomiendo creación dinámica desde JS para evitar cambios en múltiples PHP.*

3. **JS - Integración**:
   
   3.1. **Captura inicial del guardar**:
   - Capturar evento `#btn_guardar` en `js/FuncionesRecepcion.js` (existe handler en [js/FuncionesRecepcion.js](js/FuncionesRecepcion.js#L1038)).
   - Leer `total = parseFloat($("#total_r").val())` antes de continuar con guardado.
   
   3.2. **Decisión de flujo**:
   - Si `total <= 2000` → proceder directamente con flujo de guardado actual (sin modal).
   - Si `total > 2000` → abrir modal de fracciones (paso 3.3+).
   
   3.3. **Inicialización de fracciones**:
   - Calcular número de fracciones: `n = Math.ceil(total / 2000)`.
   - Crear fracciones iniciales equitativas:
     * `baseAmount = Math.floor((total / n) * 100) / 100` (redondear a 2 decimales).
     * `remainder = total - (baseAmount * n)`.
     * Asignar `baseAmount` a todas las filas; asignar `remainder` a la última fila.
   - Inicializar flag `edited = false` para cada fila.
   
   3.4. **Modal Bootstrap - Tabla de fracciones**:
   - Columnas: `#` (índice 1-based), `Cantidad` (input numérico, editable), `Estado` (indicador si fue editada).
   - Cada input: validación en `oninput` para rechazar valores > 2000 (mostrar tooltip de error si aplica).
   - Botones: `Recalcular`, `Aceptar`, `Cancelar`.
   
   3.5. **Algoritmo Recalcular**:
   - **Paso A**: Leer valores actuales de la tabla. Marcar filas que fueron editadas por el usuario (flag `edited = true` al cambiar valor en input).
   - **Paso B**: Separar en dos grupos:
     * `editedRows[]` = filas con `edited = true` (valores fijos, no se ajustarán).
     * `freeRows[]` = filas con `edited = false` (serán recalculadas).
   - **Paso C**: Validar que `sum(editedRows) <= total` (si no, mostrar error y abortar recalcular).
   - **Paso D**: Calcular distribución para filas libres:
     * `remaining = total - sum(editedRows)`.
     * `numFreeRows = freeRows.length`.
     * Si `numFreeRows > 0`:
       - `newBaseAmount = Math.floor((remaining / numFreeRows) * 100) / 100`.
       - `newRemainder = remaining - (newBaseAmount * numFreeRows)`.
       - Asignar `newBaseAmount` a todas las filas libres.
       - Asignar `newRemainder` a la última fila libre (para absorber diferencia de redondeo).
     * Si `numFreeRows == 0` (todas las filas fueron editadas):
       - Verificar que `sum(filas) == total`. Si hay diferencia > 0.01, mostrar error (inconsistencia).
   - **Paso E**: Validación post-distribución:
     * Confirmar que cada fracción `<= 2000` (no debería fallar con este algoritmo, pero es control).
     * Confirmar que `sum(todas las filas) == total` (tolerancia: diferencia < 0.01).
   - **Paso F**: Actualizar tabla visual; mantener flags `edited` tal como estaban.
   
   3.6. **Validación en inputs (tiempo real)**:
   - Al escribir en un input de cantidad:
     * Si el valor `> 2000` → mostrar error (ej: borde rojo, tooltip) y rechazar el cambio (forzar a 2000 o dejar en blanco).
     * Marcar la fila como `edited = true` si el usuario confirmó un valor válido.
   
   3.7. **Botón Aceptar**:
   - Validar que `sum(filas) == total` (tolerancia < 0.01).
   - Si válido: recopilar arreglo de fracciones `[{index, cantidad}, ...]`.
   - Cerrar modal.
   - Continuar con guardado: pasar el arreglo de fracciones al backend o invocar función de guardado existente.
   - *Nota: A decidir con el usuario cómo se envían las fracciones al backend (ver "Further Considerations").*

4. **Backend** (pendiente de decisión):
   - Opción A: Persistir cada fracción como un registro independiente.
   - Opción B: Persistir un único registro con un JSON detallado.
   - Opción C: Enviar fracciones pero guardar solo el total (descartar fracciones después de mostrar al usuario).

5. **Pruebas / Verificación**:
   - **Caso 1**: Total = 2000 → sin modal, guardado directo.
   - **Caso 2**: Total = 2000.01 → modal con 2 filas (2000 + 0.01).
   - **Caso 3**: Total = 4000 → modal con 2 filas (2000 + 2000).
   - **Caso 4**: Total = 4500.75 → modal con 3 filas (2250.375 cada una → redondeo a 2250.38 + 2250.38 + 1999.99 ó similar, verificar suma).
   - **Caso 5**: Editar una fila a 1500, recalcular → verificar que otras filas se redistribuyen correctamente.
   - **Caso 6**: Editar múltiples filas, recalcular → solo las no editadas se ajustan.
   - **Caso 7**: Intentar editar fila a 2500 → rechazar, mostrar error.
   - **Caso 8**: Aceptar sin recalcular después de editar → validar suma y proceder.

**Relevant files**
- `js/FuncionesRecepcion.js` — Añadir/actualizar handlers, funciones de cálculo y lógica de modal.
- `Recepcion.php` — Interfaz de recepción (verificar si se toca o no, depende de decisión del paso 2).
- `RFormulario.php` — Otra vista que contiene `btn_guardar` y `total_r` (análogo a Recepcion.php).

**Verification Checklist**
- [ ] Modal aparece solo cuando `total > 2000`.
- [ ] Fracciones iniciales se reparten correctamente y suman el total original.
- [ ] Editar input rechaza valores > 2000.
- [ ] Recalcular redistribuye filas libres correctamente; filas editadas no cambian.
- [ ] Aceptar valida suma y cierra modal sin errores.
- [ ] Guardado se completa con fracciones enviadas al backend.
- [ ] Totales <= 2000 no muestran modal y se guardan normalmente.

**Decisions / Assumptions**
- **UI**: Usar modal Bootstrap (ya presente en el proyecto). Inyectar HTML desde JS dinámicamente.
- **Redondeo**: Siempre a 2 decimales. La diferencia de redondeo se acumula en la última fila libre (o última editada si todas están editadas, en cuyo caso se valida).
- **Tolerancia**: Diferencia entre `sum(filas)` y `total` < 0.01 es aceptable.
- **Validación de tiempo real**: Rechazar inputs > 2000 con feedback visual inmediato.
- **Persistencia**: Pendiente de decisión del usuario (ver paso 4 y "Further Considerations").

**Further Considerations / Questions**
1. ✅ **Modal en HTML vs JS**: Decidido → inyectar dinámicamente desde JS.
2. ⚠️ **Persistencia de fracciones en backend**: 
   - ¿Enviar cada fracción como registro separado?
   - ¿Enviar un JSON con todas las fracciones en un campo?
   - ¿O solo mostrar al usuario y guardar el total global?
3. ⚠️ **¿Qué hacer después de guardar?**: ¿Limpiar table de fracciones del modal, regresar a pantalla anterior, mostrar confirmación?

Si confirmas las preguntas 1–3, actualizaré este plan con pasos de implementación más detallados (funciones a crear, nombres sugeridos, snippets).