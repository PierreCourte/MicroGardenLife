from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import logging
import json
from datetime import datetime
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="MicroGardenLife API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LeadData(BaseModel):
    email: EmailStr
    firstName: str = ""
    source: str = "unknown"

# Simple file-based storage for leads (in production, use a proper database)
LEADS_FILE = "/app/backend/leads.json"

def save_lead(lead_data: dict):
    """Save lead data to JSON file"""
    try:
        # Load existing leads
        if os.path.exists(LEADS_FILE):
            with open(LEADS_FILE, 'r') as f:
                leads = json.load(f)
        else:
            leads = []
        
        # Add timestamp
        lead_data['timestamp'] = datetime.now().isoformat()
        
        # Add to leads
        leads.append(lead_data)
        
        # Save back to file
        with open(LEADS_FILE, 'w') as f:
            json.dump(leads, f, indent=2)
            
        logger.info(f"Lead saved: {lead_data['email']}")
        return True
    except Exception as e:
        logger.error(f"Error saving lead: {e}")
        return False

@app.get("/")
async def root():
    return {"message": "MicroGardenLife API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/api/lead")
async def capture_lead(lead: LeadData):
    """Capture lead information"""
    try:
        lead_dict = lead.dict()
        
        # Save lead data
        if save_lead(lead_dict):
            logger.info(f"New lead captured: {lead.email} from {lead.source}")
            return {
                "success": True,
                "message": "Lead captured successfully",
                "email": lead.email
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save lead data")
            
    except Exception as e:
        logger.error(f"Error capturing lead: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/leads")
async def get_leads():
    """Get all leads (for admin purposes)"""
    try:
        if os.path.exists(LEADS_FILE):
            with open(LEADS_FILE, 'r') as f:
                leads = json.load(f)
            return {"leads": leads, "count": len(leads)}
        else:
            return {"leads": [], "count": 0}
    except Exception as e:
        logger.error(f"Error retrieving leads: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve leads")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)