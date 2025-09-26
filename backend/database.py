from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
users_collection = db.users
products_collection = db.products
leads_collection = db.leads
purchases_collection = db.purchases

async def init_products():
    """Initialize default products if they don't exist"""
    existing_count = await products_collection.count_documents({})
    
    if existing_count == 0:
        default_products = [
            {
                "id": "guide-gratuit",
                "title": "6 étapes pour cultiver tes micro-pousses maison",
                "description": "Guide PDF gratuit pour débuter avec les micro-pousses",
                "type": "guide",
                "price": 0.0,
                "content": "Guide complet de 20 pages avec illustrations",
                "download_url": "/downloads/guide-gratuit.pdf",
                "video_url": None
            },
            {
                "id": "livre-digital",
                "title": "Ton Jardin Micro-Pousses Maison",
                "description": "Livre digital complet sur la culture des micro-pousses",
                "type": "ebook",
                "price": 17.0,
                "content": "Livre de 150 pages avec photos et recettes",
                "download_url": "/downloads/livre-digital.pdf",
                "video_url": None
            },
            {
                "id": "formation-video",
                "title": "Formation Vidéo Complète Micro-Pousses",
                "description": "Formation vidéo complète en 6 modules",
                "type": "course",
                "price": 67.0,
                "content": "6 heures de formation + bonus PDF",
                "download_url": "/downloads/formation-bonus.pdf",
                "video_url": "/videos/formation-complete"
            }
        ]
        
        await products_collection.insert_many(default_products)
        print("✅ Produits par défaut initialisés")