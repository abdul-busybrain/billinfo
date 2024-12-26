import { CirclePlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p>
          <Button className="inline-flex gap-2" variant={"ghost"} asChild>
            <Link href={"/invoices/new "}>
              <CirclePlus className="h-4 w-4" /> Create Invoice
            </Link>
          </Button>
        </p>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-lef p-4">
              <span className="font-semibold">25/12/2024</span>
            </TableCell>
            <TableCell className="text-left p-4">
              <span className="font-semibold">Abdullahi Auwal Haruna</span>
            </TableCell>
            <TableCell className="text-left p-4">
              <span> a2h@abilabs.com</span>
            </TableCell>
            <TableCell className="text-center p-4">
              <Badge className="rounded-full">Open</Badge>
            </TableCell>
            <TableCell className="text-right p-4">
              <span className="font-semibold"> ₦250,000</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
