import type { CollectionConfig } from 'payload'

export const Coin: CollectionConfig = {
  slug: 'coin',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'coin',
  },
  fields: [
    {
      name: 'coin',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
