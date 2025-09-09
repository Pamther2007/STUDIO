import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, MapPin, Users, Award, Bot, Star } from 'lucide-react';
import Logo from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const features = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Community Driven',
    description: 'Connect with members in your local area to share and learn skills directly.',
  },
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: 'Skill-for-Skill',
    description: 'Trade your expertise for a skill you want to learn, no money involved.',
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Points System',
    description: 'Earn points by teaching and spend them to learn, ensuring fair exchange.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Matches',
    description: 'Get intelligent recommendations for the best skill swaps near you.',
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    title: 'Interactive Map',
    description: 'Visually explore and find skill swappers in your neighborhood.',
  },
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    title: 'Build Trust',
    description: 'Rate and review your exchanges to build a trustworthy community.',
  },
];

const testimonials = [
    {
        quote: "I always wanted to learn guitar but classes were so expensive. Through Easy2Learn, I found a patient teacher and I'm paying for it by teaching my favorite cooking recipes!",
        name: 'Jit Saha',
        role: 'Gardening Enthusiast',
        avatar: 'https://i.pravatar.cc/150?u=jit',
    },
    {
        quote: "This platform is amazing! I'm brushing up on my photography skills by teaching beginners, and in return, I'm finally learning how to code.",
        name: 'Utsav Saha',
        role: 'Guitar Pro',
        avatar: 'https://plus.unsplash.com/premium_photo-1739580360043-f2c498c1d861?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2lnYSUyMGNoYWR8ZW58MHx8MHx8fDA%3D',
    }
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
           <h1 className="text-xl font-bold text-foreground tracking-wider">
              Easy<span className="text-4xl font-bold text-primary align-middle">2</span>Learn
            </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="text-center py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-headline font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Learn anything. Teach anyone.
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Join a local community of learners and teachers. Exchange your skills, earn points, and grow together.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-headline font-bold text-center text-foreground">How It Works</h3>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center transition-transform transform hover:-translate-y-2">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-3xl font-headline font-bold text-center text-foreground">Loved by Our Community</h3>
                <div className="mt-12 grid gap-8 md:grid-cols-2">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.name} className="p-6">
                            <CardContent className="p-0">
                                <blockquote className="text-lg text-muted-foreground italic mb-6">
                                    "{testimonial.quote}"
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-secondary/50">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Easy2Learn. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
