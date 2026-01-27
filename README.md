# 🏨 RESTful API: מערכת ניהול והזמנת חדרי מלון

API מודרני מבוסס ASP.NET Core לניהול מלא של הזמנות, חדרים ומשתמשים במערכת בתי מלון. המערכת תומכת בהזמנת חדרים, עדכון סטטוסים ובדיקת זמינות.

## 📖 תוכן עניינים
1. [ארכיטקטורה וטכנולוגיות](#-ארכיטקטורה-וטכנולוגיות)
2. [מודלי נתונים (Entities)](#-מודלי-נתונים-entities)
3. [הגדרות והתקנה מקומית](#-הגדרות-והתקנה-מקומית)
4. [מבנה Endpoints ודוגמאות שימוש](#-מבנה-endpoints-ודוגמאות-שימוש)

***

## 🚀 ארכיטקטורה וטכנולוגיות

* **פלטפורמה:** ASP.NET Core Web API, .NET 8 (Long Term Support).
* **Database/ORM:** Entity Framework Core (EF Core) עם SQL Server.
* **ארכיטקטורה:** RESTful, Code First.
* **Context Class:** `HotelDbContext`.

***

## 📚 מודלי נתונים (Entities)

הטבלאות במסד הנתונים ממופות לפי המחלקות הבאות:

### 1. User (משתמש / אורח)
מייצג לקוחות ומנהלים.
| שדה | סוג נתונים | תפקיד |
| :--- | :--- | :--- |
| **Id** | `int` | מפתח ראשי |
| **Tz** | `string` | תעודת זהות |
| **FirstName** | `string` | שם פרטי |
| **Phone** | `string` | טלפון |
| **Role** | `enum` (`Client`, `manager`) | תפקיד משתמש |

### 2. Room (חדר)
מייצג חדר ספציפי במלון.
| שדה | סוג נתונים | תפקיד |
| :--- | :--- | :--- |
| **Id** | `int` | מפתח ראשי |
| **RoomNumber** | `int` | מספר החדר הפיזי |
| **Type** | `enum` (`Single`, `Double`, `Suite`) | סוג החדר |
| **Status** | `enum` (`Available`, `Occupied`) | סטטוס נוכחי |
| **BasePrice** | `decimal` | מחיר ללילה |

### 3. Booking (הזמנה)
מייצג הזמנה שבוצעה על ידי משתמש.
| שדה | סוג נתונים | תפקיד |
| :--- | :--- | :--- |
| **Id** | `int` | מפתח ראשי |
| **UserId** | `int` | מפתח זר למשתמש |
| **CheckInDate** | `DateTime` | תאריך כניסה |
| **CheckOutDate** | `DateTime` | תאריך יציאה |
| **FinalPrice** | `decimal` | מחיר סופי של ההזמנה |
| **Status** | `enum` (`Pending`, `Confirmed`, `Canceled`, `Completed`) | סטטוס ההזמנה |

### 4. BookingRoom (טבלת קשר)
טבלת קשר רבים-לרבים בין הזמנות לחדרים.
| שדה | סוג נתונים | תפקיד |
| :--- | :--- | :--- |
| **Id** | `int` | מפתח ראשי |
| **BookingId** | `int` | מפתח זר להזמנה |
| **RoomId** | `int` | מפתח זר לחדר |

***

## ⚙️ הגדרות והתקנה מקומית

### שלבי התקנה ו-EF Core

1.  **שיבוט הפרויקט:** `git clone [כתובת ה-GIT]`
2.  **הגדרת Connection String:** עדכן את קובץ **`appsettings.json`** עם פרטי החיבור ל-SQL Server.
    > ⚠️ **שגיאת חיבור:** אם אתה נתקל בבעיה כמו "network-related or instance-specific error", ודא ששירות SQL Server פועל ושהשם ב-Connection String תואם לשרת המקומי שלך (למשל, שימוש ב-`.` או `localhost`).
3.  **יצירת מסד נתונים (EF Core Migrations):**
    ```powershell
    # פתח את Package Manager Console וודא שהפרויקט הנכון נבחר
    Add-Migration InitialCreate
    Update-Database
    ```

***

## 🛣️ מבנה Endpoints ודוגמאות שימוש

ה-API יתבסס על הכתובת הבסיסית: `https://localhost:[PORT]/api/`

### 1. Rooms (חדרים)
| פעולה (HTTP Method) | Route / Endpoint | תפקיד |
| :--- | :--- | :--- |
| **GET** | `/api/rooms` | שליפת רשימת כל החדרים (ניהול פנימי) |
| **GET** | `/api/rooms/{id}` | שליפת פרטי חדר ספציפי |
| **GET (פעולה מיוחדת)** | `/api/rooms/availability?checkIn=...&checkOut=...` | **בדיקת זמינות:** שליפת חדרים פנויים בטווח תאריכים. |
| **POST** | `/api/rooms` | יצירת חדר חדש במערכת (מנהלים) |

### 2. Bookings (הזמנות)
| פעולה (HTTP Method) | Route / Endpoint | תפקיד |
| :--- | :--- | :--- |
| **POST** | `/api/bookings` | יצירת הזמנה חדשה (עם פרטי CheckIn/CheckOut וחדרים) |
| **GET** | `/api/bookings/{id}` | שליפת פרטי הזמנה ספציפית |
| **PUT** | `/api/bookings/{id}/status` | עדכון סטטוס הזמנה (למשל, מ-`Pending` ל-`Confirmed`) |
| **GET (מקונן)** | `/api/users/{userId}/bookings` | שליפת כל ההזמנות של משתמש ספציפי |

### 3. Users (משתמשים)
| פעולה (HTTP Method) | Route / Endpoint | תפקיד |
| :--- | :--- | :--- |
| **POST** | `/api/users` | רישום משתמש חדש (לקוח) |
| **GET** | `/api/users/{id}` | שליפת פרטי משתמש |
| **GET** | `/api/users` | שליפת כל המשתמשים (מנהלים בלבד) |
