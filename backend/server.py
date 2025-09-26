from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import logging
from database import init_products
from routes import auth_routes, lead_routes, product_routes, user_routes

# Create the main app
app = FastAPI(title="MicroGardenLife API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "MicroGardenLife API is running"}

# Include routers
api_router.include_router(auth_routes.router)
api_router.include_router(lead_routes.router)
api_router.include_router(product_routes.router)
api_router.include_router(user_routes.router)

# Include the router in the main app
app.include_router(api_router)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("Starting MicroGardenLife API...")
    await init_products()
    logger.info("✅ API started successfully")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down API...")