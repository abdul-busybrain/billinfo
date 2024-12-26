import { sql } from "drizzle-orm";

import { db } from "@/db";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function Page() {
  const results = await db.execute(sql`SELECT current_database()`);
  console.log(results);

  return (
    <main className="flex flex-col justify-center h-full  gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Create Invoice</h1>
      </div>
      {JSON.stringify(results)}
      <form className="grid gap-4 max-w-sm" action="">
        <div>
          <Label htmlFor="name" className="block font-semibold mb-2 text-sm">
            Billining name
          </Label>
          <Input id="name" name="name " type="text" />
        </div>
        <div>
          <Label htmlFor="email" className="block font-semibold mb-2 text-sm">
            Email
          </Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div>
          <Label htmlFor="value" className="block font-semibold mb-2 text-sm">
            Value
          </Label>
          <Input id="value" name="value" type="text" />
        </div>
        <div>
          <Label
            htmlFor="description"
            className="block font-semibold mb-2 text-sm"
          >
            Description
          </Label>
          <Textarea name="description" id="description"></Textarea>
        </div>
        <div>
          <Button className="w-full font-semibold" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
}