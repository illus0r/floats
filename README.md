Install [Node](https://nodejs.org/en/) and execute these commands:

```
npm install -g parcel-bundler
```

Go to the folder with this project and run it:

```
parcel serve ./src/index.html --out-dir ./
```

or

```
npm run start
```

Before pushing to a repo, do:
```
parcel build ./src/index.html --out-dir ./
```
