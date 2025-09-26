from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from models.product import ProductResponse
from models.user import UserResponse
from database import users_collection, products_collection
from auth import verify_token

router = APIRouter(prefix="/user", tags=["User"])

@router.get("/products", response_model=List[ProductResponse])
async def get_user_products(current_user_email: str = Depends(verify_token)):
    # Get current user
    user = await users_collection.find_one({"email": current_user_email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Get user's products
    user_products = user.get("products", [])
    products = await products_collection.find({"id": {"$in": user_products}}).to_list(100)
    
    return [ProductResponse(**product) for product in products]

@router.post("/products/{product_id}", response_model=dict)
async def add_product_to_user(product_id: str, current_user_email: str = Depends(verify_token)):
    # Check if product exists
    product = await products_collection.find_one({"id": product_id})
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    # Get current user
    user = await users_collection.find_one({"email": current_user_email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Add product if not already owned
    user_products = user.get("products", [])
    if product_id not in user_products:
        user_products.append(product_id)
        await users_collection.update_one(
            {"email": current_user_email},
            {"$set": {"products": user_products, "updated_at": datetime.utcnow()}}
        )
    
    return {
        "success": True,
        "message": f"Product {product_id} added to user",
        "products": user_products
    }