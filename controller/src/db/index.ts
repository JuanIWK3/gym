import { Client } from 'cassandra-driver'

export const client = new Client({
  contactPoints: ['localhost:9042', 'localhost:9043'],
  localDataCenter: 'datacenter1',
  keyspace: 'gym'
})
