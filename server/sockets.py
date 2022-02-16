import socketio

# create the socket app
sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=["http://localhost:3000"])
socket_app = socketio.ASGIApp(sio)


# create the socket event handlers 
@sio.on("connect")
async def connect(sid, environ, auth):
    # auth is the email of the user
    print(f"User with socket id {sid} has connected")
    sio.enter_room(sid, room=auth)
    

@sio.on("message")
async def message(sid, message):
    receiver = message.get("receiver")
    print(message)
    # send a private message to the socket id
    await sio.emit("message", message, room=receiver)

@sio.on("broadcast")
async def broadcast(sid, message):
    await sio.emit(message)

@sio.on("disconnect")
async def disconnect(sid):
    print(f"User with socket id {sid} has disconnected")

