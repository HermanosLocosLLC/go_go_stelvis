-- DROP EXISTING TABLES
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;

CREATE TYPE usertypes AS ENUM ('gogo', 'google');
-- CREATE JOBS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    pfp VARCHAR(255),
    user_type usertypes,
    access_token VARCHAR(255),
    refresh_token VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (email)
);

-- CREATE JOBS TABLE
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

-- CREATE STATUSES TABLE
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INT,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- SEED APPLICATION DATA

INSERT INTO users (id, email, password, first_name, last_name, user_type, is_active) VALUES
    (100, 'homer@simpson.com', 'donuts', 'Homer', 'Simpson', 'gogo', TRUE),
    (101, 'marge@simpson.com', 'donuts', 'Marge', 'Simpson', 'gogo', FALSE),
    (102, 'bart@simpson.com', 'donuts', 'Bart', 'Simpson', 'gogo', TRUE),
    (103, 'lisa@simpson.com', 'donuts', 'Lisa', 'Simpson', 'gogo', TRUE),
    (104, 'maggie@simpson.com', 'donuts', 'Maggie', 'Simpson', 'gogo', FALSE),
    (105, 'ned@flanders.com', 'donuts', 'Ned', 'Flanders', 'gogo', TRUE),
    (106, 'seymour@skinner.com', 'donuts', 'Seymore', 'Skinner', 'gogo', TRUE),
    (107, 'barney@gumble.com', 'donuts', 'Barney', 'Gumble', 'gogo', TRUE);

INSERT INTO posts (id, title, content, user_id) VALUES
    (1, 'Cusco', 'So much fun', 101),
    (2, 'Tokyo', 'Delicious egg sandwiches', 105),
    (3, 'Ireland', 'What do y''thinks growing in that field', 107),
    (4, 'Florida', 'Beware Florida Man', 102);

INSERT INTO comments (id, content, user_id, post_id) VALUES
    (1, 'Onigiri for the win', 100, 2),
    (2, 'Gotta do the mario kart in Shibuya', 103, 2),
    (3, 'Don''t have a cow man', 102, 3),
    (4, 'It truely is a strange existence', 104, 1);