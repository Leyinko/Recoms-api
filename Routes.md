## Routes

| Router      | Route                               | Method   | Access                                   | Middlewares                 |
| ----------- | ----------------------------------- | -------- | ---------------------------------------- | --------------------------- |
| ------      | Users                               |
| `api/users` | `/register`                         | `POST`   | Register user in DB                      | Cloudinary                  |
| `api/users` | `/login`                            | `POST`   | Login access                             | ❌                          |
| `api/users` | `/`                                 | `GET`    | Get users                                | LoggedIn                    |
| `api/users` | `/update/`                          | `PUT`    | Update user role                         | LoggedIn, Admin             |
| `api/users` | `/delete/:user`                     | `DELETE` | Delete a user                            | LoggedIn, Admin             |
| ------      | App                                 |
| `api/data`  | `/app/stats`                        | `GET`    | Get server info in home page             | ❌                          |
| `api/data`  | `/reset`                            | `POST`   | Launch `npm run seed All` script         | LoggedIn, Admin             |
| ------      | Collections                         |
| `api/data`  | `/collections`                      | `GET`    | Get all users collections                | LoggedIn, Admin             |
| `api/data`  | `/collection/create`                | `POST`   | Create new user collection               | Cloudinary, LoggedIn, Admin |
| `api/data`  | `/collection/delete`                | `DELETE` | Delete user collection                   | Logged in                   |
| ------      | Recommendations                     |
| `api/data`  | `/recommendations/:category`        | `GET`    | Get all users recommendations            | LoggedIn                    |
| `api/data`  | `/recommendations/collection/:user` | `GET`    | Get user recommendation collection items | LoggedIn                    |
| `api/data`  | `/recommendation/insert`            | `POST`   | Insert new recommendation                | Cloudinary, LoggedIn        |
| `api/data`  | `/recommendation/:user/:item`       | `PUT`    | Update user recommendation               | Cloudinary, LoggedIn        |
| `api/data`  | `/recommendations/delete`           | `DELETE` | Update user recommendation               | LoggedIn                    |
