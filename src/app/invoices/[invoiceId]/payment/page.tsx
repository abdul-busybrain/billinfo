import { eq } from "drizzle-orm";
import { Customers, Invoices } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";

import { db } from "@/db";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const invoiceId = parseInt(params.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoice ID");
  }

  const [result] = await db
    .select({
      id: Invoices.id,
      status: Invoices.status,
      createTs: Invoices.createTs,
      description: Invoices.description,
      value: Invoices.value,
      name: Customers.name,
    })
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!result) {
    return notFound();
  }

  const invoice = {
    ...result,
    customer: { name: result.name },
  };

  return (
    <main className="h-full  w-full">
      <Container>
        <div className="grid grid-cols-2">
          <div>
            <div className="flex justify-between mb-8">
              <h1 className="flex items-center gap-4 text-3xl font-bold">
                Invoice {invoice.id}
                <Badge
                  className={cn(
                    "rounded-full capitalize",
                    invoice.status === "open" && "bg-blue-500",
                    invoice.status === "paid" && "bg-green-600",
                    invoice.status === "void" && "bg-zinc-700",
                    invoice.status === "uncollectible" && "bg-red-600"
                  )}
                >
                  {invoice.status}
                </Badge>
              </h1>
            </div>

            <p className="text-3xl mb-3">₦{(invoice.value / 100).toFixed(2)}</p>

            <p className="text-lg mb-8">
              {invoice.description || "No description"}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Manage invoice</h2>
            {invoice.status === "open" && (
              <form action="">
                <Button className="flex gap-2 font-bold bg-green-700">
                  <CreditCard className="w-5 h-auto" />
                  Pay invoice
                </Button>
              </form>
            )}
            {invoice.status === "paid" && (
              <p className="flex gap-2 item-center text-xl font-bold">
                <Check className="w-8 h-auto bg-green-500 rounded-full text-white p-1" />
                Invoice paid
              </p>
            )}
          </div>
        </div>

        <h2 className="font-bold text-lg mb-4">Billing Details</h2>

        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{invoice.id}</span>
          </li>

          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice date
            </strong>
            <span>{new Date(invoice.createTs).toLocaleDateString()}</span>
          </li>

          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing name
            </strong>
            <span>{invoice.customer.name}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
