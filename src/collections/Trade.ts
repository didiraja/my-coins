import type { CollectionConfig } from 'payload'

export const Trade: CollectionConfig = {
  slug: 'trade',
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'tradeDate',
      type: 'date',
      required: true,
    },
    {
      name: 'coinIn',
      type: 'relationship',
      relationTo: 'coin',
      required: true,
    },
    {
      name: 'amountIn',
      type: 'number',
      required: true,
    },
    {
      name: 'coinOut',
      type: 'relationship',
      relationTo: 'coin',
      required: true,
    },
    {
      name: 'amountOut',
      type: 'number',
      required: true,
    },
  ],
}
