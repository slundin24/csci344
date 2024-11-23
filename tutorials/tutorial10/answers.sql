-- Exercise 1 (done for you): Selecting all columns
SELECT * FROM users;



-- Exercise 2 (done for you): Selecting some columns

SELECT id, first_name, last_name 
FROM users;



-- Exercise 3: Sorting

SELECT id, first_name, last_name 
FROM users 
ORDER BY last_name;


-- Exercise 4: Filtering

SELECT id, user_id, image_url 
FROM posts 
WHERE user_id=26;


-- Exercise 5: Filtering with logical operators

SELECT id, image_url, user_id 
FROM posts 
WHERE user_id=26 or user_id=12;


-- Exercise 6: Using functions in a select statement

SELECT COUNT(*) 
FROM posts;


-- Exercise 7: Aggregating data

SELECT user_id, COUNT(*) 
FROM comments 
GROUP BY user_id 
ORDER BY count DESC;


-- Exercise 8: Joining: two tables

SELECT p.id, p.image_url, p.user_id, u.username, u.first_name, u.last_name 
FROM posts p 
INNER JOIN users u 
ON p.user_id = u.id 
WHERE p.user_id 
IN (26,12) 
ORDER BY p.id;



-- Exercise 9: More joining practice: two tables

SELECT p.id, p.pub_date, f.following_id 
FROM posts p INNER JOIN following f 
ON p.user_id=f.following_id 
WHERE f.user_id = 26 
ORDER BY p.id;


-- Exercise 10: More joining practice: three tables (Optional)

 SELECT p.id, p.pub_date, f.following_id, u.username
 FROM posts p
 INNER JOIN following f
 ON p.user_id = f.user_id
 INNER JOIN users u
 ON p.user_id = u.id
 ORDER BY p.pub_date DESC;


-- Exercise 11: Inserting records

INSERT INTO bookmarks (id, user_id, post_id, timestamp) 
VALUES (DEFAULT, 26, 219, now()); 

INSERT INTO bookmarks (id, user_id, post_id, timestamp)
VALUES (DEFAULT, 26, 220, now());

INSERT INTO bookmarks (id, user_id, post_id, timestamp)
VALUES (DEFAULT, 26, 221, now());


-- Exercise 12: Deleting records

DELETE FROM bookmarks
WHERE user_id = 26 AND post_id = 219;

DELETE FROM bookmarks
WHERE user_id = 26 AND post_id = 220;

DELETE FROM bookmarks
WHERE user_id = 26 AND post_id = 221;



-- Exercise 13: Updating records

UPDATE users
SET email = 'knick2022@gmail.com'
WHERE id = 26;


-- Exercise 14: More Querying Practice (Optional)

SELECT p.id, p.user_id, COUNT(c.id), p.caption
FROM posts p
INNER JOIN comments c ON p.id = c.post_id
WHERE p.user_id = 26
GROUP BY p.id
ORDER BY p.id;