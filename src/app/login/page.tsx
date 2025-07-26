'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, User } from 'lucide-react';

export default function LoginPage() {
  const [formType, setFormType] = React.useState<'login' | 'signup'>('login');

  const toggleFormType = () => {
    setFormType(formType === 'login' ? 'signup' : 'login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle login/signup here.
    // For now, we can just log a message.
    console.log(`Submitting ${formType} form`);
    // On successful login, you would typically redirect to the chat page:
    // window.location.href = '/';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">
            {formType === 'login' ? 'Welcome Back!' : 'Create an Account'}
          </CardTitle>
          <CardDescription>
            {formType === 'login'
              ? 'Sign in to continue to ChronoChat.'
              : 'Enter your details to get started.'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              {formType === 'signup' && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input id="name" placeholder="Your full name" required className="pl-10" />
                  </div>
                </div>
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input id="username" placeholder="Your username" required className="pl-10" />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full font-bold">
              {formType === 'login' ? 'Login' : 'Sign Up'}
            </Button>
          </CardFooter>
        </form>
        <div className="px-6 pb-6 pt-0">
          <p className="text-center text-sm text-muted-foreground">
            {formType === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <Button variant="link" onClick={toggleFormType} className="p-1 font-bold text-primary">
              {formType === 'login' ? 'Sign up' : 'Login'}
            </Button>
          </p>
        </div>
      </Card>
    </div>
  );
}
