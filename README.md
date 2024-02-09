# Math Pyramid Multiplayer (node/react)

![Math Pyramid](https://github.com/tobias-gaenzler/math-pyramid-react/blob/main/public/help_start.jpg?raw=true)
React app for math pyramid, a math exercise to train basic addition/subtraction.

## Technical Information

React app can be found in *app* folder.
Node.js serverside code including websocket server is located in *server* folder.

### Typescript

Frontend (react) and backend (node.js) are implemented in typescript.

### Local Development

- build frontend app: *cd app && npm install && npm run build*
- start frontend app: *cd app && npm run start*
- start backend server: *cd server && npm install && npm run dev*

### Deployment

During deployment the websocket connection needs to be set e.g. when the app is build:

```
REACT_APP_WS_URL=wss://<IP>:<PORT> npm run build
```

e.g. for render.com:

```
cd app && npm install && REACT_APP_WS_URL=wss://math-pyramid.onrender.com npm run build && cd ../server && npm install && npm run build
```

The server is started with (in the *server* folder):

```
npm run start
```
  
