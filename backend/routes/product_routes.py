from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from models.product import Product, ProductResponse
from database import products_collection
from auth import verify_token

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=List[ProductResponse])
async def get_products():
    products = await products_collection.find().to_list(100)
    return [ProductResponse(**product) for product in products]

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str):
    product = await products_collection.find_one({"id": product_id})
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return ProductResponse(**product)