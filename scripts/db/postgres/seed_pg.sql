INSERT INTO users (id, email, password, first_name, last_name, user_type, is_active) VALUES
    (100, 'homer@simpson.com', '$2a$10$3brXdX5WIsrSDrnE46k08.Sk0UMNBU82Xxa/xilRgNnfMExLZLg.W', 'Homer', 'Simpson', 'gogo', TRUE),
    (101, 'marge@simpson.com', '$2a$10$3brXdX5WIsrSDrnE46k08.Sk0UMNBU82Xxa/xilRgNnfMExLZLg.W', 'Marge', 'Simpson', 'gogo', FALSE),
    (102, 'bart@simpson.com', '$2a$10$3brXdX5WIsrSDrnE46k08.Sk0UMNBU82Xxa/xilRgNnfMExLZLg.W', 'Bart', 'Simpson', 'gogo', TRUE),
    (103, 'lisa@simpson.com', '$2a$10$3brXdX5WIsrSDrnE46k08.Sk0UMNBU82Xxa/xilRgNnfMExLZLg.W', 'Lisa', 'Simpson', 'gogo', TRUE),
    (104, 'maggie@simpson.com', '$2a$10$3brXdX5WIsrSDrnE46k08.Sk0UMNBU82Xxa/xilRgNnfMExLZLg.W', 'Maggie', 'Simpson', 'gogo', FALSE),
    (105, 'ned@flanders.com', '$2a$10$3brXdX5WIsrSDrnE46k08.Sk0UMNBU82Xxa/xilRgNnfMExLZLg.W', 'Ned', 'Flanders', 'gogo', TRUE),
    (106, 'seymour@skinner.com', '$2a$10$3brXdX5WIsrSDrnE46k08.Sk0UMNBU82Xxa/xilRgNnfMExLZLg.W', 'Seymore', 'Skinner', 'gogo', TRUE),
    (107, 'barney@gumble.com', '$2a$10$3brXdX5WIsrSDrnE46k08.Sk0UMNBU82Xxa/xilRgNnfMExLZLg.W', 'Barney', 'Gumble', 'gogo', TRUE);

INSERT INTO trips (id, name, creator) VALUES
    (1, 'Japan 2024', 101),
    (2, 'Mexico City 2024', 103),
    (3, 'Fly Me To The Moon', 107);

INSERT INTO destinations (id, creator, trip_id, location, start_date, end_date) VALUES
    (1, 101, 1, 'Tokyo', TO_DATE('20240921', 'YYYYMMDD')::TIMESTAMP, TO_DATE('20241004', 'YYYYMMDD')::TIMESTAMP),
    (2, 102, 1, 'Kyoto', TO_DATE('20241004', 'YYYYMMDD')::TIMESTAMP, TO_DATE('20241014', 'YYYYMMDD')::TIMESTAMP),
    (3, 103, 2, 'Mexico City', TO_DATE('20250201', 'YYYYMMDD')::TIMESTAMP, TO_DATE('20250224', 'YYYYMMDD')::TIMESTAMP),
    (4, 107, 2, 'The Moon', TO_DATE('20240704', 'YYYYMMDD')::TIMESTAMP, TO_DATE('20250803', 'YYYYMMDD')::TIMESTAMP);

INSERT INTO travels (id, creator, trip_id, travel_type, departure_location, arrival_location, departure_time, arrival_time) VALUES
    (1, 101, 1, 'flight', 'Springfield', 'Tokyo', TO_TIMESTAMP('20240921 10:30', 'YYYYMMDD HH24:MI'), TO_TIMESTAMP('20240921 23:00', 'YYYYMMDD HH24:MI')),
    (2, 102, 1, 'train', 'Tokyo', 'Kyoto', TO_TIMESTAMP('20241004 13:45', 'YYYYMMDD HH24:MI'), TO_TIMESTAMP('20241004 16:00', 'YYYYMMDD HH24:MI')),
    (3, 100, 1, 'flight', 'Kyoto', 'Springfield', TO_TIMESTAMP('20241014 07:15', 'YYYYMMDD HH24:MI'), TO_TIMESTAMP('20241014 19:40', 'YYYYMMDD HH24:MI')),
    (4, 103, 2, 'flight', 'Springfield', 'Mexico City', TO_TIMESTAMP('20250201 13:25', 'YYYYMMDD HH24:MI'), TO_TIMESTAMP('20250201 19:00', 'YYYYMMDD HH24:MI')),
    (5, 103, 2, 'flight', 'Mexico City', 'Springfield', TO_TIMESTAMP('20250224 05:53', 'YYYYMMDD HH24:MI'), TO_TIMESTAMP('20250224 11:37', 'YYYYMMDD HH24:MI')),
    (6, 107, 3, 'flight', 'Springfield', 'The Moon', TO_TIMESTAMP('20240704 07:04', 'YYYYMMDD HH24:MI'), TO_TIMESTAMP('20240704 11:33', 'YYYYMMDD HH24:MI')),
    (7, 107, 3, 'cruise', 'The Moon', 'Capitol City', TO_TIMESTAMP('20250801 22:18', 'YYYYMMDD HH24:MI'), TO_TIMESTAMP('20250801 23:59', 'YYYYMMDD HH24:MI')),
    (8, 107, 3, 'bus', 'Capitol City', 'Springfield', TO_TIMESTAMP('20250802 19:50', 'YYYYMMDD HH24:MI'), TO_TIMESTAMP('20250803 03:44', 'YYYYMMDD HH24:MI'));

INSERT INTO accomodations (id, creator, trip_id, name, accomodation_type, location, check_in, check_out) VALUES
    (1, 101, 1, 'Tokyo Hotel', 'hotel', 'Tokyo', TO_TIMESTAMP('20240921 23:55', 'YYYYMMDD HH24:MI'), TO_TIMESTAMP('20241004 10:30', 'YYYYMMDD HH24:MI'));

INSERT INTO activities (id, creator, trip_id, activity_type, name, location, start_time, end_time) VALUES
    (1, 103, 1, 'sight seeing', 'Mario Kart', 'Shibuya', TO_TIMESTAMP('20240930 19:00', 'YYYYMMDD HH24:MI'), TO_TIMESTAMP('20240930 21:00', 'YYYYMMDD HH24:MI'));

INSERT INTO invitees (id, trip_id, inviter_id, invitee_id, accepted) VALUES
    (1, 1, 101, 100, TRUE),
    (2, 1, 101, 102, TRUE),
    (3, 1, 101, 103, TRUE),
    (4, 1, 103, 104, TRUE),
    (5, 2, 103, 101, TRUE),
    (6, 2, 103, 100, TRUE),
    (7, 2, 101, 102, FALSE),
    (8, 2, 101, 104, TRUE),
    (9, 3, 107, 100, TRUE),
    (10, 3, 107, 101, FALSE),
    (11, 3, 107, 102, FALSE),
    (12, 3, 107, 103, FALSE),
    (13, 3, 107, 104, FALSE),
    (14, 3, 107, 105, FALSE),
    (15, 3, 107, 106, FALSE);