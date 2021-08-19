import dotenv from 'dotenv'
import { Client } from '@elastic/elasticsearch'

dotenv.config()

const client = new Client({
  node: process.env.ELASTICSEARCH_NODE_URL,
  maxRetries: Number(process.env.ELASTICSEARCH_MAX_RETRIES),
  requestTimeout: Number(process.env.ELASTICSEARCH_REQUEST_TIMEOUT),
  sniffOnStart: Boolean(process.env.ELASTICSEARCH_SNIFF_ON_START)
})

module.exports = client
