# 🎵 Music Streaming App

A modern music streaming platform backend built with **Node.js**, **Express**, **MongoDB Atlas**, and **Cloudinary CDN**.

> **Note for team members**: The project scaffolding is complete — config, database connection, Cloudinary integration, models, middleware, routes, and validators are all wired up and ready. The **controllers have TODO stubs** for you to implement the business logic. Everything else just works.

---

## Quick Start

### Prerequisites
- **Node.js 18+** installed
- **MongoDB Atlas** — a shared cluster is already configured (credentials in `.env`)
- **Cloudinary** — account is already configured (credentials in `.env`)

### Setup (3 steps)

```bash
# 1. Clone and enter the project
git clone <repo-url>
cd MusicStreamingApp

# 2. Install dependencies
cd server
npm install --legacy-peer-deps

# 3. Seed the database (creates admin user + sample data)
npm run seed
```

### Run the server

```bash
npm run dev          # Development (with auto-reload via nodemon)
npm start            # Production
```

Verify it's running: `http://localhost:3001/api/health`

---

## What's Already Done ✅

| Layer | Status | Details |
|-------|--------|---------|
| **Database Connection** | ✅ Ready | MongoDB Atlas connected via Mongoose |
| **Cloudinary Setup** | ✅ Ready | Upload audio, images, delete — all wired |
| **Environment Config** | ✅ Ready | `.env` with live credentials, `.env.example` template |
| **All 6 Mongoose Models** | ✅ Ready | User, Song, Artist, Album, Playlist, ListeningHistory |
| **Auth Middleware** | ✅ Ready | JWT protect + optionalAuth + admin role check |
| **Error Handling** | ✅ Ready | Centralized error handler (Mongoose, Multer, JWT errors) |
| **Rate Limiting** | ✅ Ready | API (200/15min), Auth (20/15min), Upload (50/hr) |
| **File Upload Middleware** | ✅ Ready | Multer memory storage → Cloudinary pipeline |
| **Input Validators** | ✅ Ready | Auth, Song, Playlist validation rules |
| **All Route Files** | ✅ Ready | 9 route files wired to controllers |
| **Seed Script** | ✅ Ready | Admin user + 5 sample artists + 4 albums |
| **Cloudinary Utils** | ✅ Ready | `uploadAudio`, `uploadImage`, `deleteFromCloudinary` |
| **JWT Utils** | ✅ Ready | `generateToken`, `verifyToken` |
| **Pagination Helper** | ✅ Ready | Reusable `paginate()` function |

---

## What You Need to Build 🔨

All controllers have **TODO stubs with detailed instructions**. Implement the logic inside each function:

| Controller | File | Priority |
|-----------|------|----------|
| **Auth** | `src/controllers/auth.controller.js` | 🔴 Start here |
| **Admin** | `src/controllers/admin.controller.js` | 🔴 High (song uploads) |
| **Songs** | `src/controllers/song.controller.js` | 🟡 Core feature |
| **Artists** | `src/controllers/artist.controller.js` | 🟡 Core feature |
| **Albums** | `src/controllers/album.controller.js` | 🟡 Core feature |
| **Playlists** | `src/controllers/playlist.controller.js` | 🟢 Medium |
| **Search** | `src/controllers/search.controller.js` | 🟢 Medium |
| **Recommendations** | `src/controllers/recommendation.controller.js` | 🟢 Medium |
| **History** | `src/controllers/user.controller.js` | 🟢 Medium |

---

## Project Structure

```
server/
├── server.js                        # Entry point
├── .env                             # Live credentials (DO NOT COMMIT)
├── .env.example                     # Template for team members
├── package.json                     # Dependencies
├── src/
│   ├── app.js                       # Express app + middleware + route mounting
│   ├── config/
│   │   ├── db.js                    # MongoDB Atlas connection
│   │   ├── cloudinary.js            # Cloudinary SDK config
│   │   └── env.js                   # Centralized env vars
│   ├── models/
│   │   ├── User.js                  # User with bcrypt, liked songs, following
│   │   ├── Song.js                  # Song with Cloudinary URLs, stream count
│   │   ├── Artist.js                # Artist with social links, followers
│   │   ├── Album.js                 # Album with cover image, songs ref
│   │   ├── Playlist.js              # Playlist with visibility + featured
│   │   └── ListeningHistory.js      # Play tracking (user + song + duration)
│   ├── middleware/
│   │   ├── auth.middleware.js       # JWT verify (protect + optionalAuth)
│   │   ├── admin.middleware.js      # Admin role check
│   │   ├── upload.middleware.js     # Multer (audio + image file handling)
│   │   ├── error.middleware.js      # Global error handler + 404
│   │   └── rateLimiter.js           # API / Auth / Upload rate limits
│   ├── controllers/                 # ⬅️  YOUR WORK GOES HERE
│   │   ├── auth.controller.js       # TODO: register, login, getMe, updateProfile
│   │   ├── song.controller.js       # TODO: CRUD, stream, like, play recording
│   │   ├── artist.controller.js     # TODO: list, detail, follow/unfollow
│   │   ├── album.controller.js      # TODO: list, detail with songs
│   │   ├── playlist.controller.js   # TODO: CRUD, add/remove songs
│   │   ├── search.controller.js     # TODO: multi-type search
│   │   ├── recommendation.controller.js  # TODO: trending, new, recommended
│   │   ├── user.controller.js       # TODO: recently played, most played
│   │   └── admin.controller.js      # TODO: content management + analytics
│   ├── routes/                      # All routes are wired — just implement controllers
│   │   ├── auth.routes.js
│   │   ├── song.routes.js
│   │   ├── artist.routes.js
│   │   ├── album.routes.js
│   │   ├── playlist.routes.js
│   │   ├── search.routes.js
│   │   ├── recommendation.routes.js
│   │   ├── user.routes.js
│   │   └── admin.routes.js
│   ├── validators/                  # Input validation rules
│   │   ├── auth.validator.js
│   │   ├── song.validator.js
│   │   └── playlist.validator.js
│   └── utils/
│       ├── cloudinary.utils.js      # uploadAudio, uploadImage, delete helpers
│       ├── jwt.utils.js             # Token generation + verification
│       ├── pagination.js            # Reusable pagination
│       └── seed.js                  # Database seeder (npm run seed)
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/me` | Yes | Get profile |
| PUT | `/api/auth/profile` | Yes | Update profile |

### Songs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/songs` | No | List songs (paginated) |
| GET | `/api/songs/liked` | Yes | Get liked songs |
| GET | `/api/songs/:id` | No | Get song details |
| GET | `/api/songs/:id/stream` | Yes | Get stream URL |
| POST | `/api/songs/:id/like` | Yes | Like/unlike |
| POST | `/api/songs/:id/play` | Yes | Record play |

### Artists
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/artists` | No | List artists |
| GET | `/api/artists/:id` | No | Artist details + songs |
| POST | `/api/artists/:id/follow` | Yes | Follow/unfollow |

### Albums
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/albums` | No | List albums |
| GET | `/api/albums/:id` | No | Album details + songs |

### Playlists
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/playlists/featured` | No | Featured playlists |
| GET | `/api/playlists` | Yes | User's playlists |
| GET | `/api/playlists/:id` | Optional | Playlist details |
| POST | `/api/playlists` | Yes | Create playlist |
| PUT | `/api/playlists/:id` | Yes | Update playlist |
| DELETE | `/api/playlists/:id` | Yes | Delete playlist |
| POST | `/api/playlists/:id/songs` | Yes | Add song |
| DELETE | `/api/playlists/:id/songs/:songId` | Yes | Remove song |

### Search & Feed
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/search?q=&type=` | No | Multi-type search |
| GET | `/api/feed/trending` | No | Trending songs |
| GET | `/api/feed/new-releases` | No | New releases |
| GET | `/api/feed/recommended` | Yes | Personalized recs |
| GET | `/api/feed/featured` | No | Featured content |

### History
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/history/recent` | Yes | Recently played |
| GET | `/api/history/most-played` | Yes | Most played |

### Admin (requires admin role)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/songs` | Upload song (audio + artwork) |
| PUT | `/api/admin/songs/:id` | Edit song |
| DELETE | `/api/admin/songs/:id` | Delete song |
| PUT | `/api/admin/songs/:id/feature` | Toggle featured |
| POST | `/api/admin/artists` | Create artist |
| PUT | `/api/admin/artists/:id` | Edit artist |
| DELETE | `/api/admin/artists/:id` | Delete artist |
| POST | `/api/admin/albums` | Create album |
| PUT | `/api/admin/albums/:id` | Edit album |
| DELETE | `/api/admin/albums/:id` | Delete album |
| GET | `/api/admin/users` | List users |
| PUT | `/api/admin/users/:id/suspend` | Suspend/activate user |
| DELETE | `/api/admin/users/:id` | Delete user |
| GET | `/api/admin/analytics/overview` | Dashboard stats |
| GET | `/api/admin/analytics/streams` | Stream analytics |
| POST | `/api/admin/playlists` | Create featured playlist |

---

## Architecture

```
Client (Admin Dashboard / Mobile App)
  │
  ▼
Express API (this backend)
  ├── Auth Middleware (JWT)
  ├── Controllers (your TODO work)
  ├── Mongoose Models → MongoDB Atlas
  └── Cloudinary Utils → Cloudinary CDN
                           │
                           ▼
                     Client plays audio
                     directly from CDN
```

**Key design decision**: The backend is a **metadata API**, not a media proxy. Audio files are uploaded to Cloudinary and served directly from their CDN to clients. The backend only stores and returns URLs.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 3001) |
| `NODE_ENV` | `development` or `production` |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `JWT_EXPIRES_IN` | Token expiration (default: `7d`) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `ADMIN_EMAIL` | Default admin email for seed |
| `ADMIN_PASSWORD` | Default admin password for seed |
| `ADMIN_USERNAME` | Default admin username for seed |
| `ADMIN_FULLNAME` | Default admin display name for seed |

---

## Response Format

All API responses follow this format:

```json
// Success
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}

// Error
{
  "success": false,
  "message": "Error description"
}

// Paginated
{
  "success": true,
  "data": {
    "songs": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

---

## Useful Commands

```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start for production
npm run seed         # Seed database with admin + sample data
```
