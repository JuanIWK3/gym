-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS gym WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '2' };

DROP TABLE IF EXISTS gym.user;

-- Create a table
CREATE TABLE IF NOT EXISTS gym.user ( userid UUID PRIMARY KEY, name text, entrances set<text>);

-- Insert some data
INSERT INTO gym.user (userid, name, entrances) VALUES (uuid(), 'juan', {});

-- Select data
SELECT * FROM gym.user;

-- Insert an entrance
UPDATE gym.user SET entrances = entrances + {'2020-01-01'} WHERE userid = 8602a343-6274-41f5-a0fa-04752b3788f4;