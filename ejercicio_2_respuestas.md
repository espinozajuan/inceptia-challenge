**¿Cómo implementarías las acciones del frontend utilizando redux? (por ejemplo autenticación, solicitud de clientes activos para el usuario y solicitud de casos por cliente).**

Primero, configuraría una store, con un reducer para auth, clients y cases.

```javascript
const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientsReducer,
    cases: casesReducer,
  },
});
```

- **Auth**: crearía un slice para Auth, con un initial state con parámetros como `token`, `status` y `error`. Un logout para el reducer que remueva el token. Luego, tendría diferentes cases en base a mi status. Si es `success` guardo el token en localStorage, si es `failed` arrojo un error.
- **Clients**: para esto también crearía un slice, con un array vacío de `clients: []` como initial state, también agregaría status y error como en Auth. Tendría los cases como en Auth (success y failed).
- **Cases**: para los casos de cliente, tendría la llamada hacia API Inbound con un async y await. Sumado al slice con un array vacío de `cases: []`, `status` nuevamente y `error`. Cases como en Auth y Clients.

**Si quisiéramos agregar una ruta nueva a la app, ¿cómo reestructurarías el index.js?**

Lo haría `react-router`, reestructuraría el index para tener las siguientes rutas:

```javascript
<Route path="/login" component={Login} />
<Route path="/dashboard" component={Dashboard} />
<Route path="/" component={App} />
```

Y luego simplemente crear los navigations links hacia las páginas.
