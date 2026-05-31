Speech To Text Application
#AI-powered Speech-to-Text web application built using Spring Boot, React, PostgreSQL, JWT Authentication, and Deepgram API.
Features
•	User Registration & Login
•	JWT Authentication & Authorization
•	Audio File Upload
•	Voice Recording Support
•	Speech-to-Text Conversion using Deepgram
•	Transcript History Management
•	Download Transcripts
•	Delete Transcripts
•	User-Specific Data Access
•	Responsive Modern UI

#Tech Stack
Frontend
•	React
•	Vite
•	Tailwind CSS
•	Axios
•	React Router DOM
Backend
•	Spring Boot
•	Spring Security
•	Spring Data JPA
•	Maven
Database
•	PostgreSQL
AI Service
•	Deepgram Speech-to-Text API

#Installation
Backend
mvn clean install
mvn spring-boot:run
Frontend
npm install
npm run dev

#API Endpoints
Method	Endpoint
POST	/api/auth/register
POST	/api/auth/login
POST	/api/speech/upload
GET	/api/speech/history
DELETE	/api/speech/{id}
GET	/api/speech/download/{id}
