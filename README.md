# Earthquake watcher app

Earthquake watcher app is a fullstack proyect powered by ruby on rails on backend and react on frontend. With this app you can read about earthquakes arround the world, with a minimalist interface, clean and user-friendly.

# Live proyect

[visit the proyect deployed on Render](https://earthquake-8py9.onrender.com)

# A fullstak proyect

You can interact with the view on the root url but you also can interact with two endpoint to use the backend side on diferent proyects.

# Endpoints

The endpoints are inside of the api route:

- [api/features](https://earthquake-8py9.onrender.com/api/features?page=1&per_page=10): This endpoint get all earthquakes from Database, to use this you have to provide 'page'(page), quantity of items per page('per_page') and an optional parameter, type of magnitude(mag_type)
  - [?page=1&per_page=100](https://earthquake-8py9.onrender.com/api/features?page=1&per_page=100) page 1, items per page: 100.
  - [?page=1&per_page=100&mag_type=md](https://earthquake-8py9.onrender.com/api/features?page=1&per_page=100&mag_type=md): page 1, items per page: 100, magnitude type: md
- [api/features/:id/comments](https://earthquake-8py9.onrender.com/api/features/1/comments): This endpoint get all comments of the features with id send, also you have to create new comments with same endpoint using id to.
  - [api/features/1/comments](https://earthquake-8py9.onrender.com/api/features/1/comments): all comments from earthquake with id 1.

# Start on local instance

run bundle to install gems

```
bundle install
```
run rails s to serve the proyect on development enviroment
```
rails s
```

by default the server is listening on port 3000.
