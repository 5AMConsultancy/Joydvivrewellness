# Joy D'Vivre Wellness — Website

One-page website for **Joy D'Vivre Wellness**, the practice of Liesl Joy Medeira —
biokineticist, wellness coach and speaker in Knysna, South Africa.

> *Your life matters and your legacy is waiting to be written.*

## Stack

Plain HTML, CSS and JavaScript. No frameworks, no build step — just static files.

```
index.html      # the whole site (all sections)
css/style.css   # design system + layout + animations
js/main.js      # scroll reveals, mobile nav, active-link highlighting
images/         # drop real photos here (see images/README.md for filenames)
```

## Run locally

Open `index.html` directly in a browser, or serve it:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Adding photos

See [images/README.md](images/README.md) — drop photos in with the listed
filenames (`profile.jpg`, `gallery-1.jpg` … `gallery-8.jpg`) and they appear
automatically. Missing photos show styled turquoise placeholders.

## Deploy (GitHub → Vercel)

1. Create a GitHub repository and push this folder:
   ```sh
   git init
   git add .
   git commit -m "Joy D'Vivre Wellness website"
   git remote add origin https://github.com/<your-username>/joydvivre-wellness.git
   git push -u origin main
   ```
2. On [vercel.com](https://vercel.com): **Add New → Project → Import** the GitHub
   repo. Framework preset: **Other** (it's a static site). No build command,
   no output directory — just deploy.

Every future `git push` redeploys the site automatically.
