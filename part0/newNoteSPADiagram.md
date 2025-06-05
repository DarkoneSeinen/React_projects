sequenceDiagram
    participant Navegador
    participant Servidor

    Navegador->>Servidor: Solicita /spa (GET)
    activate Servidor
    Servidor-->>Navegador: Documento HTML principal
    deactivate Servidor

    Note right of Navegador: El navegador analiza el HTML<br/>e inicia la carga de recursos

    Navegador->>Servidor: Solicita main.css (GET)
    Servidor-->>Navegador: CSS de la interfaz

    Navegador->>Servidor: Solicita main.js (GET)
    Servidor-->>Navegador: Código JavaScript de la SPA

    Note right of Navegador: JS se ejecuta<br/>y hace una solicitud HTTP adicional<br/>para obtener las notas existentes

    Navegador->>Servidor: Solicita /data.json (GET)
    activate Servidor
    Servidor-->>Navegador: JSON con notas guardadas
    deactivate Servidor

    Note right of Navegador: El navegador renderiza las notas<br/>dinámicamente en la página usando JavaScript
