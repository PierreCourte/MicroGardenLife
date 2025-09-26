from fastapi import APIRouter, HTTPException, status
from models.lead import Lead, LeadCreate
from models.user import UserCreate
from database import leads_collection, users_collection
from auth import get_password_hash, create_access_token
from datetime import datetime
import uuid

router = APIRouter(prefix="/leads", tags=["Leads"])

@router.post("/", response_model=dict)
async def create_lead(lead_data: LeadCreate):
    # Check if lead already exists
    existing_lead = await leads_collection.find_one({"email": lead_data.email})
    
    # Create lead entry
    lead_dict = lead_data.dict()
    lead_dict["created_at"] = datetime.utcnow()
    
    if not existing_lead:
        await leads_collection.insert_one(lead_dict)
    
    # Check if user account exists
    existing_user = await users_collection.find_one({"email": lead_data.email})
    
    if not existing_user:
        # Create user account automatically
        # Generate a temporary password (user will need to set a real one later)
        temp_password = str(uuid.uuid4())[:8]
        hashed_password = get_password_hash(temp_password)
        
        user_dict = {
            "name": lead_data.name,
            "email": lead_data.email,
            "password": hashed_password,
            "products": ["guide-gratuit"],  # Start with free guide
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "temp_password": True  # Flag to indicate user needs to set password
        }
        
        result = await users_collection.insert_one(user_dict)
        
        # Create access token
        access_token = create_access_token(data={"sub": lead_data.email})
        
        return {
            "success": True,
            "message": "Lead captured and account created",
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": str(result.inserted_id),
                "name": lead_data.name,
                "email": lead_data.email,
                "products": ["guide-gratuit"]
            },
            "temp_password": temp_password  # Send this in email in real implementation
        }
    else:
        # User exists, just return success
        access_token = create_access_token(data={"sub": lead_data.email})
        
        return {
            "success": True,
            "message": "Lead captured",
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": str(existing_user["_id"]),
                "name": existing_user["name"],
                "email": existing_user["email"],
                "products": existing_user.get("products", ["guide-gratuit"])
            }
        }