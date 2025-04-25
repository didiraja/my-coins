import type { CollectionConfig } from 'payload'

export const Wallet: CollectionConfig = {
  slug: 'wallet',
  admin: {
    useAsTitle: 'coin',
  },
  access: {
    create: () => false,
    read: () => true,
  },
  fields: [
    {
      name: 'coin',
      type: 'relationship',
      relationTo: 'coin',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
  ],
}
