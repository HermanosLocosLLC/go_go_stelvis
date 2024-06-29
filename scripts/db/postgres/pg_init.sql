-- DROP EXISTING TABLES
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS destinations;
DROP TABLE IF EXISTS travels;
DROP TABLE IF EXISTS accomodations;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS invitees;
-- DROP TABLE IF EXISTS posts;
-- DROP TABLE IF EXISTS comments;

CREATE TYPE user_types_enum AS ENUM ('gogo', 'google');
-- CREATE JOBS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    pfp VARCHAR(255),
    user_type user_types_enum NOT NULL,
    access_token VARCHAR(255),
    refresh_token VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (email)
);

CREATE TABLE trips (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) DEFAULT 'Untitled Trip',
    creator INT NOT NULL,
    FOREIGN KEY (creator) REFERENCES users(id)
);

CREATE TABLE destinations (
    id SERIAL PRIMARY KEY NOT NULL,
    creator INT NOT NULL,
    trip_id INT NOT NULL,
    location VARCHAR(100) NOT NULL DEFAULT 'Unknown Location',
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    FOREIGN KEY (creator) REFERENCES users(id),
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);

CREATE TYPE travel_types_enum AS ENUM ('flight', 'train', 'drive', 'cruise', 'boat', 'rideshare', 'taxi', 'bus', 'other');
CREATE TABLE travels (
    id SERIAL PRIMARY KEY NOT NULL,
    creator INT NOT NULL,
    trip_id INT NOT NULL,
    travel_type travel_types_enum,
    departure_location VARCHAR(100) NOT NULL DEFAULT 'Unknown Location',
    arrival_location VARCHAR(100) NOT NULL DEFAULT 'Unknown Location',
    departure_time TIMESTAMP,
    arrival_time TIMESTAMP,
    FOREIGN KEY (creator) REFERENCES users(id),
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);

CREATE TYPE accomodation_types AS ENUM ('hotel', 'motel', 'resort', 'bed n'' breakfast', 'airbnb', 'rental', 'homestay', 'other');
CREATE TABLE accomodations (
    id SERIAL PRIMARY KEY NOT NULL,
    creator INT NOT NULL,
    trip_id INT NOT NULL,
    name VARCHAR(100) NOT NULL DEFAULT 'Untitled Accomodation',
    accomodation_type accomodation_types NOT NULL,
    location VARCHAR(100) NOT NULL DEFAULT 'Unknown Location',
    check_in TIMESTAMP,
    check_out TIMESTAMP,
    FOREIGN KEY (creator) REFERENCES users(id),
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

CREATE TYPE activity_types AS ENUM ('activity', 'sight seeing', 'museum', 'nature', 'hike', 'culture', 'work', 'nightlife', 'food', 'other');
CREATE TABLE activities (
    id SERIAL PRIMARY KEY NOT NULL,
    creator INT NOT NULL,
    trip_id INT NOT NULL,
    activity_type activity_types NOT NULL,
    name VARCHAR(255) NOT NULL DEFAULT 'Untitled Activity',
    location VARCHAR(255) NOT NULL DEFAULT 'Uknown Location',
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    FOREIGN KEY (creator) REFERENCES users(id),
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);

CREATE TABLE invitees (
    id SERIAL PRIMARY KEY NOT NULL,
    trip_id INT NOT NULL,
    inviter_id INT NOT NULL,
    invitee_id INT NOT NULL,
    accepted BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (trip_id) REFERENCES trips(id),
    FOREIGN KEY (inviter_id) REFERENCES users(id),
    FOREIGN KEY (invitee_id) REFERENCES users(id)
);



-- CREATE TABLE posts (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     content TEXT NOT NULL,
--     user_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT NOW(),
--     FOREIGN KEY (user_id) REFERENCES users(id)
--     ON DELETE CASCADE
-- );

-- CREATE TABLE comments (
--     id SERIAL PRIMARY KEY,
--     content TEXT NOT NULL,
--     user_id INT,
--     post_id INT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
--     FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
-- );

-- SEED APPLICATION DATA

-- INSERT INTO users (id, email, password, first_name, last_name, user_type, is_active) VALUES
--     (100, 'homer@simpson.com', 'donuts', 'Homer', 'Simpson', 'gogo', TRUE),
--     (101, 'marge@simpson.com', 'donuts', 'Marge', 'Simpson', 'gogo', FALSE),
--     (102, 'bart@simpson.com', 'donuts', 'Bart', 'Simpson', 'gogo', TRUE),
--     (103, 'lisa@simpson.com', 'donuts', 'Lisa', 'Simpson', 'gogo', TRUE),
--     (104, 'maggie@simpson.com', 'donuts', 'Maggie', 'Simpson', 'gogo', FALSE),
--     (105, 'ned@flanders.com', 'donuts', 'Ned', 'Flanders', 'gogo', TRUE),
--     (106, 'seymour@skinner.com', 'donuts', 'Seymore', 'Skinner', 'gogo', TRUE),
--     (107, 'barney@gumble.com', 'donuts', 'Barney', 'Gumble', 'gogo', TRUE);

-- INSERT INTO posts (id, title, content, user_id) VALUES
--     (1, 'Cusco', 'So much fun', 101),
--     (2, 'Tokyo', 'Delicious egg sandwiches', 105),
--     (3, 'Ireland', 'What do y''thinks growing in that field', 107),
--     (4, 'Florida', 'Beware Florida Man', 102);

-- INSERT INTO comments (id, content, user_id, post_id) VALUES
--     (1, 'Onigiri for the win', 100, 2),
--     (2, 'Gotta do the mario kart in Shibuya', 103, 2),
--     (3, 'Don''t have a cow man', 102, 3),
--     (4, 'It truely is a strange existence', 104, 1);