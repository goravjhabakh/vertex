import { defineField, defineType } from "sanity"
export const price = defineType({
  name: "price",
  title: "Price",
  type: "object",
  fields: [
    defineField({
      name: "amount",
      type: "number",
      description: "Major currency units, such as 49.99.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "currencyCode",
      title: "Currency",
      type: "string",
      options: { list: ["USD", "EUR", "GBP", "CAD", "AUD"] },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { amount: "amount", currency: "currencyCode" },
    prepare: ({ amount, currency }) => ({ title: `${currency} ${amount}` }),
  },
})
