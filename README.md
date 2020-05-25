# JNZ-BackEnd-Test-NodeJS
for test node js

# Setup
1. npm install
2. add file .ENV
3. config .ENV => PORT, JWT_SECRET, GOOGLE_SEARCH_PLACE_API_KEY, GOOGLE_SEARCH_PLACE_API_BASE_URL
4. npm run dev

# Start with Login API to get token
POST /users/login HTTP/1.1
Host: localhost:9000
Content-Type: application/json

{
	"username":"admin",
	"password":"admin"
}

# Search restaurant
POST /jenosize/search_nearby_restaurant HTTP/1.1
Host: localhost:9000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTkwNDIzMTA4LCJleHAiOjE1OTA4NTUxMDh9.LJwpZSsimb_Jox-ttIO74NmbU5_as5ss5RslvepJzy8
Content-Type: application/json

{
    "keyword": "ก๊วยเตี๋ยว",
    "location": "13.9426641,100.7436091",
    "radius": "5000"
}

# Game 24
POST /jenosize/game_24 HTTP/1.1
Host: localhost:9000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTkwNDIzMTA4LCJleHAiOjE1OTA4NTUxMDh9.LJwpZSsimb_Jox-ttIO74NmbU5_as5ss5RslvepJzy8
Content-Type: application/json

{
	"numbers":"5555"
}
