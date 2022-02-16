import socketio

# create the socket app
sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=["http://localhost:3000"])
socket_app = socketio.ASGIApp(sio)


# create the socket event handlers 
@sio.on("connect")
async def connect(sid, environ, auth):
    print(f"User with socket id {sid} has connected")
    sio.save_session
    

@sio.on("message")
async def message(sid, message):
    # send a private message to the socket id
    await sio.emit("message", message, room=sid)

@sio.on("broadcast")
async def broadcast(sid, message):
    await sio.emit(message)

@sio.on("disconnect")
async def disconnect(sid):
    print(f"User with socket id {sid} has disconnected")

