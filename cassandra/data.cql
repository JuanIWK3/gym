-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS gym WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '2' };

DROP TABLE IF EXISTS gym.user;

-- Create a table
CREATE TABLE IF NOT EXISTS gym.user ( 
  id UUID, 
  name text, 
  entrances set<text>,
  PRIMARY KEY (id)
);

-- Insert some data
INSERT INTO gym.user (id, name, entrances) VALUES (uuid(), 'juan', {});

-- Select data
SELECT * FROM gym.user;

-- Insert an entrance
UPDATE gym.user SET entrances = entrances + {'2020-01-01'} WHERE id = f838d7bd-0b73-49eb-95e7-78a91efb7556;