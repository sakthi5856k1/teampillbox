import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from app.config import settings
import httpx

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

async def exchange_discord_code(code: str) -> dict:
    """Helper to exchange Discord OAuth code for user profile."""
    url = "https://discord.com/api/oauth2/token"
    data = {
        'client_id': settings.DISCORD_CLIENT_ID,
        'client_secret': settings.DISCORD_CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': settings.DISCORD_REDIRECT_URI
    }
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    
    # Mock fallback if credentials are placeholder
    if settings.DISCORD_CLIENT_ID == "MOCK_DISCORD_CLIENT_ID":
        return {
            "id": "123456789012345678",
            "username": "PillboxOfficer",
            "discriminator": "0001",
            "avatar": "mock_avatar"
        }
        
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, data=data, headers=headers)
        tokens = resp.json()
        
        # Get user profile
        user_resp = await client.get(
            "https://discord.com/api/users/@me",
            headers={"Authorization": f"Bearer {tokens.get('access_token')}"}
        )
        return user_resp.json()
