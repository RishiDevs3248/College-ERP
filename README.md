# Hello , This is Rishi
## This is my College ERP Project 
This ERP has three people
- Teacher
- Student
- Admin 


## Teacher 
Things Teacher can do -
- create / update / delete Timetable
- create / update / delete Assignment
- create / update / delete Notice 
- Send Daily Annoucement (Gmail Notification)
- Mark / Get Attendance through QR Scanner
- Register new Teacher / Student
- get Online Teacher ID
- update Teacher Info & Credentials


## Student 
Things Student can do - 
- get Online Student ID 
- get Timetable
- get Assigment / Notice 
- receives Mail Notifications
- generate QR Code for Attendance 
- update Student Info & Credentials


## Admin 
Things Admin can do - 
- can only register first teacher 



# **Steps to run this code**

## 1. Backend
1. Create a " **.env** " file
2. paste the below content in it & put the Your values 
```
database_Connection_link = "Your DB Link"
JWT_SECRET_KEY = "Any String"
AUTH_EMAIL = "Your Email"
AUTH_EMAIL_PASSWORD = "generate an App Password (a special one-time password for apps) from your email"
DEFAULT_PASSWORD = "12345678"
```
3. After completing previous steps run this codes on your terminal in your backend folder
```
npm i
nodemon server.js
```

### Steps to Generate App Password

1. Sign in to your Google Account.
2. Navigate to Security in the left sidebar.
3. Under "Signing in to Google," find App passwords and click on it.
4. If prompted, enter your password again.
5. Select the app and device you want to generate the password for (if applicable), or choose Other and enter a custom name.
6. Click Generate.
7. You'll see a 16-character password. Copy this password; it can be used for the app you selected.

## 2. Frontend
1. Create a " **.env** " file
2. paste the below content in it & put the Your values 
```
VITE_IFRAME = "Your Google Calander ifame SRC"
```
3. After completing previous steps run this codes on your terminal in your frontend folder
```
npm i 
npm run dev
```

### Steps to get your google calander link

1. Go to Google Calendar.
2. On the left sidebar, find the calendar you want to share. Click the three dots next to the calendar name and select Settings and sharing.
3. Scroll down to the Integrate calendar section.
4. Here, you will see the Public URL to this calendar and Embed code. You can use the public URL for sharing.
5. Copy the URL from the Public URL to this calendar. It should look something like this:
https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=Your/Timezone
