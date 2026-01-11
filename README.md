# my-project

Domain name bought on GoDaddy <br/>
Hosting on Render <br/>
DNS Provider on CloudFlare <br/>
Personal API for my information (Server) <br/>
React Application for frontend (Client)<br/>

🔹 Option A: Render (Easy Full Stack Hosting – Free Tier)
✅ Great for beginners

🎯 Handles both frontend (React) and backend (Express)

🔄 Automatically redeploys from GitHub

How to use:
Push your monorepo to GitHub

Go to https://render.com

Create:

a Web Service for your Express API (/server)

a Static Site for your React app (/client built via npm run build)

Render handles ports, environment variables, and deployment from GitHub.

-----


✅ 3. React Frontend: Example Fetch Usage
In React, to get the education section:

js
Copy code
useEffect(() => {
  fetch("http://localhost:4000/education")
    .then(res => res.json())
    .then(data => setEducation(data));
}, []);
Or for work projects:

js
Copy code
fetch("http://localhost:4000/work")
  .then(res => res.json())
  .then(data => setProjects(data));
🧠 Bonus: Hosting Images
You can:

Store your images in /public/images/ in React.

Or host them on Cloudinary, S3, or a GitHub repo with public URLs.

Just link to them via the API (image: 'https://cdn.example.com/project.png').

## To start locally
- Enter the `client` directory.
- Run `npm install` in the CLI.
- Run `npm start`.


-------
We can look at delete the API as we are not providing dynamic images at this stage.