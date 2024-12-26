"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/SubmitButton";

import { createAction } from "@/app/actions";
import { startTransition, useState } from "react";

import Form from "next/form";

export default function Home() {
  const [state, setState] = useState("ready");

  async function handleOnSubmit(event: React.SyntheticEvent) {
    if (state === "pending") {
      event.preventDefault();
      return;
    }
    setState("pending");
  }

  return (
    <main className="flex flex-col justify-center h-full  gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Create Invoice</h1>
      </div>

      <Form
        action={createAction}
        onSubmit={handleOnSubmit}
        className="grid gap-4 max-w-sm"
      >
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
          <SubmitButton />
        </div>
      </Form>
    </main>
  );
}
