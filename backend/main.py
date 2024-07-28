from fastapi import FastAPI
from routes import post_routes, event_routes

app = FastAPI()

app.include_router(post_routes.router)
app.include_router(event_routes.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)