"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation"; // Import useRouter for client-side navigation
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { subjects } from "@/constants";
import { createCompanion } from "@/lib/actions/companion.actions";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Companion name must be at least 2 characters." }),
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters." }),
  topic: z.string().min(2, { message: "Topic must be at least 2 characters." }),
  voice: z.string().min(2, { message: "Voice must be at least 2 characters." }),
  style: z.string().min(2, { message: "Style must be at least 2 characters." }),
  duration: z.coerce
    .number({ invalid_type_error: "Duration must be a valid number." })
    .min(2, { message: "Duration must be at least 2 minutes." }),
});

const CompanionForm = () => {
  const router = useRouter(); // Initialize useRouter

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const companion = await createCompanion(values);
      if (companion && companion.id) {
        router.push(`/companions/${companion.id}`); // Use router.push for navigation
      } else {
        console.error("Failed to create a companion: No ID returned");
        router.push("/");
      }
    } catch (error) {
      console.error("Error creating companion:", error);
      router.push("/");
    }
  };

  return (
    <main>
      <article>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Companion Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the companion name - ex: AbdulRauf Afzal"
                      {...field}
                      className="input w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="input">
                        <SelectValue placeholder="Select the subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem
                          value={subject}
                          key={subject}
                          className="capitalize"
                        >
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What should this companion teach?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the topic you want to learn - ex: Derivatives"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voice Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="input">
                        <SelectValue placeholder="Select the voice" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speaking Style</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="input">
                        <SelectValue placeholder="Select the style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="15"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </article>
    </main>
  );
};

export default CompanionForm;
