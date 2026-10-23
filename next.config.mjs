import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    serverFunctions: false,
  },
}

export default withPayload(nextConfig)
