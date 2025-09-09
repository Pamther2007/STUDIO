import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUsPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
            </div>
            <p className="text-muted-foreground">
                We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Send us a Message</CardTitle>
                        <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter your name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="What is your message about?" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Type your message here." className="min-h-[150px]" />
                        </div>
                        <Button type="submit">Send Message</Button>
                    </CardContent>
                </Card>
                <div className="space-y-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Our Office</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex items-start gap-4">
                               <MapPin className="h-6 w-6 text-primary mt-1" />
                               <div>
                                   <p className="font-semibold">Thunder Learner HQ</p>
                                   <p className="text-muted-foreground">Kolkata</p>
                                   <p className="text-muted-foreground">India</p>
                               </div>
                           </div>
                           <div className="flex items-start gap-4">
                               <Mail className="h-6 w-6 text-primary mt-1" />
                               <div>
                                   <p className="font-semibold">Email</p>
                                   <a href="mailto:hello@thunderlearner.com" className="text-primary hover:underline">hello@thunderlearner.com</a>
                               </div>
                           </div>
                           <div className="flex items-start gap-4">
                               <Phone className="h-6 w-6 text-primary mt-1" />
                               <div>
                                   <p className="font-semibold">Phone</p>
                                   <p className="text-muted-foreground">(123) 456-7890</p>
                               </div>
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
