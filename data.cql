-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS store WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '2' };

-- Create a table
CREATE TABLE IF NOT EXISTS gym.user (
userid text PRIMARY KEY
);

-- Insert some data
INSERT INTO gym.user
(userid)
VALUES ('juan');