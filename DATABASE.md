# Database Schema

## Tables

### users

| Column              | Type         | Constraints                             |
| :------------------ | :----------- | :-------------------------------------- |
| id                  | uuid         | PK                                      |
| name                | varchar(30)  | NOT NULL                                |
| last_name           | varchar(30)  | NOT NULL                                |
| photo_url           | varchar(200) |                                         |
| email               | varchar(300) | UNIQUE, NOT NULL                        |
| password            | varchar(255) | NOT NULL                                |
| role                | char(1)      | NOT NULL — `C`: Customer, `P`: Provider |
| account_verified_at | timestamp    |                                         |
| enabled             | boolean      | NOT NULL                                |
| occupation          | varchar(80)  |                                         |
| biography           | varchar(300) |                                         |
| created_by          | int          |                                         |
| created_at          | timestamp    | NOT NULL                                |
| updated_by          | int          |                                         |
| updated_at          | timestamp    |                                         |
| deleted_at          | timestamp    |                                         |

---

### provider_tags

| Column     | Type        | Constraints      |
| :--------- | :---------- | :--------------- |
| id         | uuid        | PK               |
| name       | varchar(30) | UNIQUE, NOT NULL |
| created_by | int         |                  |
| created_at | timestamp   | NOT NULL         |
| updated_by | int         |                  |
| updated_at | timestamp   |                  |
| deleted_at | timestamp   |                  |

---

### users_provider_tags

Join table between `users` and `provider_tags`.

| Column          | Type | Constraints                 |
| :-------------- | :--- | :-------------------------- |
| provider_id     | uuid | PK, FK → `users.id`         |
| provider_tag_id | uuid | PK, FK → `provider_tags.id` |

---

### email_verification_tokens

| Column       | Type        | Constraints               |
| :----------- | :---------- | :------------------------ |
| id           | uuid        | PK                        |
| user_id      | uuid        | NOT NULL, FK → `users.id` |
| expirates_at | timestamp   | NOT NULL                  |
| token        | varchar(70) | UNIQUE, NOT NULL          |
| verified     | boolean     | NOT NULL                  |
| created_by   | int         |                           |
| created_at   | timestamp   | NOT NULL                  |
| updated_by   | int         |                           |
| updated_at   | timestamp   |                           |
| deleted_at   | timestamp   |                           |

---

### addresses

| Column     | Type         | Constraints |
| :--------- | :----------- | :---------- |
| id         | uuid         | PK          |
| country    | varchar(120) | NOT NULL    |
| state      | varchar(120) | NOT NULL    |
| city       | varchar(120) | NOT NULL    |
| street     | varchar(100) | NOT NULL    |
| zipCode    | varchar(10)  |             |
| created_by | int          |             |
| created_at | timestamp    | NOT NULL    |
| updated_by | int          |             |
| updated_at | timestamp    |             |
| deleted_at | timestamp    |             |

---

### services

| Column              | Type           | Constraints                   |
| :------------------ | :------------- | :---------------------------- |
| id                  | uuid           | PK                            |
| provider_id         | uuid           | NOT NULL, FK → `users.id`     |
| address_id          | uuid           | NOT NULL, FK → `addresses.id` |
| name                | varchar(70)    | NOT NULL                      |
| description         | varchar(620)   | NOT NULL                      |
| duration_in_minutes | int            | NOT NULL                      |
| price               | decimal(10, 2) | NOT NULL                      |
| photo_url           | varchar(200)   |                               |
| created_by          | int            |                               |
| created_at          | timestamp      | NOT NULL                      |
| updated_by          | int            |                               |
| updated_at          | timestamp      |                               |
| deleted_at          | timestamp      |                               |

---

### availability

| Column     | Type      | Constraints                  |
| :--------- | :-------- | :--------------------------- |
| id         | uuid      | PK                           |
| service_id | uuid      | NOT NULL, FK → `services.id` |
| start_time | timestamp | NOT NULL                     |
| end_time   | timestamp | NOT NULL                     |
| created_by | int       |                              |
| created_at | timestamp | NOT NULL                     |
| updated_by | int       |                              |
| updated_at | timestamp |                              |
| deleted_at | timestamp |                              |

---

### appointments

| Column          | Type         | Constraints                                                             |
| :-------------- | :----------- | :---------------------------------------------------------------------- |
| id              | uuid         | PK                                                                      |
| customer_id     | uuid         | NOT NULL, FK → `users.id`                                               |
| availability_id | uuid         | NOT NULL, UNIQUE, FK → `availability.id`                                |
| status          | varchar(2)   | NOT NULL — `P`: Pending, `CO`: Confirmed, `F`: Finished, `CA`: Canceled |
| rating          | smallint     |                                                                         |
| comments        | varchar(240) |                                                                         |
| created_by      | int          |                                                                         |
| created_at      | timestamp    | NOT NULL                                                                |
| updated_by      | int          |                                                                         |
| updated_at      | timestamp    |                                                                         |
| deleted_at      | timestamp    |                                                                         |

---

## Relationships

| From               | To                                    | Type        |
| :----------------- | :------------------------------------ | :---------- |
| `users.id`         | `users_provider_tags.provider_id`     | One-to-Many |
| `provider_tags.id` | `users_provider_tags.provider_tag_id` | One-to-Many |
| `users.id`         | `email_verification_tokens.user_id`   | One-to-Many |
| `users.id`         | `services.provider_id`                | One-to-Many |
| `addresses.id`     | `services.address_id`                 | One-to-Many |
| `services.id`      | `availability.service_id`             | One-to-Many |
| `users.id`         | `appointments.customer_id`            | One-to-Many |
| `availability.id`  | `appointments.availability_id`        | One-to-One  |
