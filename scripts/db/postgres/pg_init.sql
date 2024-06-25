-- DROP EXISTING TABLES
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;

CREATE TYPE usertypes AS ENUM ('gogo', 'google');
-- CREATE JOBS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    pfp VARCHAR(255),
    user_type usertypes,
    access_token VARCHAR(255),
    refresh_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- CREATE JOBS TABLE
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- CREATE STATUSES TABLE
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- SEED APPLICATION DATA

INSERT INTO posts (title, content, user_id) VALUES
    ('Cusco', 'So much fun', 1234),
    ('Tokyo', 'Delicious egg sandwiches', 4321);