"use client";

import { useOptimistic } from "react";
import { Customers, Invoices } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { AVAILABLE_STATUSES } from "@/data/invoices";
import { updateStatusAction, deleteInvoiceAction } from "@/app/actions";
import { ChevronDown, Ellipsis, Trash2 } from "lucide-react";

interface InvoiceProps {
  invoice: typeof Invoices.$inferSelect & {
    customer: typeof Customers.$inferSelect;
  };
}

export default function Invoice({ invoice }: InvoiceProps) {
  const [currentStatus, setCurrentStatus] = useOptimistic(
    invoice.status,
    (state, newStatus) => {
      return String(newStatus);
    }
  );

  async function handleOnUpdateStatus(formData: FormData) {
    const originalStatus = currentStatus;
    setCurrentStatus(formData.get("status"));
    try {
      await updateStatusAction(formData);
    } catch (e) {
      setCurrentStatus(originalStatus);
    }
  }

  return (
    <main className="h-full  w-full">
      <Container>
        <div className="flex justify-between mb-8">
          <h1 className="flex items-center gap-4 text-3xl font-bold">
            Invoice {invoice.id}
            <Badge
              className={cn(
                "rounded-full capitalize",
                currentStatus === "open" && "bg-blue-500",
                currentStatus === "paid" && "bg-green-600",
                currentStatus === "void" && "bg-zinc-700",
                currentStatus === "uncollectible" && "bg-red-600"
              )}
            >
              {currentStatus}
            </Badge>
          </h1>

          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2" variant={"outline"}>
                  Change status
                  <ChevronDown className="w-full h-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {AVAILABLE_STATUSES.map((status) => {
                  return (
                    <DropdownMenuItem key={status.id}>
                      <form action={handleOnUpdateStatus}>
                        <input type="hidden" name="id" value={invoice.id} />
                        <input type="hidden" name="status" value={status.id} />
                        <button>{status.label}</button>
                      </form>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="flex items-center gap-2"
                    variant={"outline"}
                  >
                    <span className="sr-only">More options</span>
                    <Ellipsis className="w-4 h-auto" />
                    <ChevronDown className="w-full h-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-2">
                        <Trash2 className="w-4 h-auto" />
                        Delete invoice
                      </button>
                    </DialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    Delete invoice?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your invoice and remove your data from our servers.
                  </DialogDescription>
                  <DialogFooter>
                    <form
                      className="flex justify-center"
                      action={deleteInvoiceAction}
                    >
                      <input type="hidden" name="id" value={invoice.id} />
                      <Button
                        variant={"destructive"}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-auto" />
                        Delete invoice
                      </Button>
                    </form>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <p className="text-3xl mb-3">₦{(invoice.value / 100).toFixed(2)}</p>

        <p className="text-lg mb-8">
          {invoice.description || "No description"}
        </p>

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

          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing email
            </strong>
            <span>{invoice.customer.email}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
