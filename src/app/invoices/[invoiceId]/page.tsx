import { notFound } from "next/navigation";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import Invoice from "./Invoice";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const authObj = await auth();
  const { userId } = authObj;
  if (!userId) {
    return notFound();
  }

  const invoiceId = parseInt(params.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoice ID");
  }

  const [result] = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
    .limit(1);

  console.log(result);

  if (!result) {
    return notFound();
  }

  const invoice = { ...result.invoices, customer: result.customers };

  return <Invoice invoice={invoice} />;
}
