import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { handleGraphQL } from '@payloadcms/next/graphql'

export const POST = handleGraphQL(configPromise)
