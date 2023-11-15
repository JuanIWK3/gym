import { Client } from 'cassandra-driver'

export const client = new Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'gym'
})
