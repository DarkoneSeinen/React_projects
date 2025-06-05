sequenceDiagram
    participant Navegador
    participant Servidor

    Note right of Navegador: El usuario escribe una nota y hace clic en "Save"

    Note right of Navegador: La SPA genera un objeto JavaScript<br/>con el contenido y la fecha de la nota

    Navegador->>Servidor: POST /new_note_spa con cuerpo JSON
    activate Servidor
    Servidor-->>Navegador: Código 201 Created (confirmación)
    deactivate Servidor

    Note right of Navegador: Sin recargar la página,<br/>el navegador añade la nueva nota a la lista mostrada
