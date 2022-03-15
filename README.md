# Voice conversation web app

 <a href="https://voicesapp.vercel.app/">
    App Demo
  </a>


<p >
  <strong> Voice conversation web app using webRTC,
Peer to peer connection not based on a voice server. </strong>
</p>

## Pages & Features

- Sign Pages
  - SignIn
  - SignUp
- Main Page
  - Create room
  - Pagination rooms
- Room Page
  - Join as admin
  - Join as speaker
  - Join as listener
  - Request to speak
  - Approve to speak
  - Mute & unmute microphone
  - Show user profile in a pop up
  - Leaving room
- Profile Page
  - User image
  - User Name
  - User bio
  - Edit image
  - Edit bio
- Navbar
  - User image
  - My profile
  - Sign out
  - Change theme

## How to run on your machine

### `Client`

Navigate to `/client`, create an `.env` file and set the following environment
variable:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Run

1. Install the dependencies with:

```shell
yarn
```

2. Run dev:

```shell
yarn dev
```

### `Server`

Navigate to `/server`, create an `.env` file and set the following environment
variable:

```
PORT=4000
MONGO_URL=
REDIS_URL=
JWT_SECRETE=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Run

1. Install the dependencies with:

```shell
yarn
```

2. Watch for file changes:

```shell
yarn watch
```

3. Run dev:

```shell
yarn dev
```

## Tools & Technologies

The client side & server side are built with TypeScript.

### Client Side

- WebRTC
- React
- Next.js
- Redux
- Tailwindcss
- Hark
- Axios
- Socket.io-client

### Server Side

- Node.js
- Express
- Socket.io
- Redis
- Ioredis
- MongoDB
- Mongoose
- Cloudinary
- JWT
- Argon2
- Multer
- Class-validator

## Contributions

1. Fork this repository to your own GitHub account and then clone it to your
   local device.
2. Create a new branch: `git checkout -b MY_BRANCH_NAME`
3. You can now push to your own branch and open a pull request.
