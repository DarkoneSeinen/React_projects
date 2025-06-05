sequenceDiagram
    participant browser
    participant server

    %% 1. El usuario dispara el envío del formulario
    Note left of browser: El usuario escribe<br/>«test» y pulsa **Save**

    %% 2. El navegador (JS) envía la nota al servidor
    browser->>server: POST /new_note\n(body: { content, date })

    activate server
    %% 3. El servidor guarda la nota y redirige
    server-->>browser: 302 Found\nLocation: /notes
    deactivate server

    %% 4. El navegador sigue la redirección y vuelve a pedir la página
    browser->>server: GET /notes
    activate server
    server-->>browser: HTML actualizado
    deactivate server

    %% 5. El navegador descarga de nuevo los assets necesarios
    browser->>server: GET /main.css
    server-->>browser: hoja de estilos

    browser->>server: GET /main.js
    server-->>browser: archivo JavaScript

    %% 6. El JS del lado cliente solicita los datos y renderiza
    Note right of browser: JS se ejecuta → pide\nlas notas en formato JSON
    browser->>server: GET /data.json
    activate server
    server-->>browser: lista de notas (incluye «test»)
    deactivate server

    Note right of browser: Callback JS actualiza el DOM\n→ la nueva nota aparece en la página
