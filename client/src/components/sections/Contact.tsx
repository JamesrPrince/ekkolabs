import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import {
  CONTACT_EMAIL,
  LOCATION,
  PHONE_NUMBER,
  RESUME_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";

// Contact form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });
  const { toast } = useToast();

  // Set up form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Handle form submission
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await apiRequest("POST", "/api/contact", values);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description:
          error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    },
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <section
      id="contact"
      ref={elementRef}
      className="py-24 bg-custom-primary text-custom-secondary"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2
          className={cn(
            "flex items-center text-2xl md:text-3xl font-bold text-custom-secondary mb-8 animate-in",
            isIntersecting && "show"
          )}
        >
          {/* <span className="text-custom-accent3 font-mono mr-2\">06.</span> Let's work together */}
          \ Let's work together
          <span className="ml-4 h-px bg-custom-accent1 flex-grow"></span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <div
            className={cn(
              "text-center mb-12 animate-in",
              isIntersecting && "show"
            )}
          >
            <p className="text-custom-accent2 text-lg mb-8">
              I'm currently open to new opportunities and project
              collaborations. Whether you have a question, a project in mind, or
              just want to say hello, feel free to reach out!
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-block border-2 border-custom-accent3 text-custom-accent3 px-8 py-4 rounded font-mono text-lg hover:bg-custom-accent3/20 transition-colors duration-300"
            >
              Say Hello
            </a>
          </div>

          <div
            className={cn(
              "grid md:grid-cols-2 gap-12 animate-in",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.2s" }}
          >
            {/* Contact Form */}
            <div className="bg-custom-primary-lighter p-8 rounded-lg">
              <h3 className="text-xl text-custom-secondary font-semibold mb-6">
                Send Me a Message
              </h3>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-custom-accent2">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="w-full px-4 py-2 rounded bg-custom-primary border border-custom-accent1 focus:border-custom-accent3 focus:outline-none text-custom-secondary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-custom-accent2">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your email address"
                            className="w-full px-4 py-2 rounded bg-custom-primary border border-custom-accent1 focus:border-custom-accent3 focus:outline-none text-custom-secondary"
                            {...field}
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
                        <FormLabel className="text-custom-accent2">
                          Subject
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Message subject"
                            className="w-full px-4 py-2 rounded bg-custom-primary border border-custom-accent1 focus:border-custom-accent3 focus:outline-none text-custom-secondary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-custom-accent2">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message"
                            className="w-full px-4 py-2 rounded bg-custom-primary border border-custom-accent1 focus:border-custom-accent3 focus:outline-none text-custom-secondary"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="bg-custom-accent3 text-white hover:bg-custom-accent3/90 px-6 py-3 rounded font-semibold"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Information */}
            <div className="bg-custom-primary-lighter p-8 rounded-lg">
              <h3 className="text-xl text-custom-secondary font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-custom-accent3 font-semibold flex items-center">
                    <FontAwesomeIcon icon="envelope" className="mr-3" /> Email
                  </h4>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-custom-accent2 hover:text-custom-accent3 transition-colors duration-300 break-all"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <div>
                  <h4 className="text-custom-accent3 font-semibold flex items-center">
                    <FontAwesomeIcon icon="phone" className="mr-3" /> Phone
                  </h4>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="text-custom-accent2 hover:text-custom-accent3 transition-colors duration-300"
                  >
                    {PHONE_NUMBER}
                  </a>
                </div>
                <div>
                  <h4 className="text-custom-accent3 font-semibold flex items-center">
                    <FontAwesomeIcon icon="map-marker-alt" className="mr-3" />{" "}
                    Location
                  </h4>
                  <p className="text-custom-accent2">{LOCATION}</p>
                </div>
                <div>
                  <h4 className="text-custom-accent3 font-semibold flex items-center">
                    <FontAwesomeIcon icon="briefcase" className="mr-3" />{" "}
                    Availability
                  </h4>
                  <p className="text-custom-accent2">
                    Open to new projects and collaborations.
                  </p>
                </div>
                <div>
                  <h4 className="text-custom-accent3 font-semibold mb-3">
                    Follow Me
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href={SOCIAL_LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-custom-secondary hover:text-custom-accent3 transition-colors duration-300 text-2xl"
                    >
                      <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
                    </a>
                    <a
                      href={SOCIAL_LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-custom-secondary hover:text-custom-accent3 transition-colors duration-300 text-2xl"
                    >
                      <FontAwesomeIcon icon={["fab", "github"]} />
                    </a>
                    <a
                      href={SOCIAL_LINKS.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-custom-secondary hover:text-custom-accent3 transition-colors duration-300 text-2xl"
                    >
                      <FontAwesomeIcon icon={["fab", "twitter"]} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
