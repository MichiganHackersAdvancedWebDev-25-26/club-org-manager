"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  useEffect(() => {
    // If no error parameters, redirect to home
    if (!error) {
      router.push("/");
      return;
    }

    // Check if user is already logged in
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // If logged in, redirect to dashboard
        router.push("/dashboard");
      }
    };

    checkAuth();
  }, [error, router]);

  // Don't render anything if redirecting
  if (!error) {
    return null;
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-semibold text-foreground">
            Oops! Something went wrong
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {errorDescription ||
              "It looks like there was an issue with your request. This might happen if you've already confirmed your email or if the link has expired."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-muted/50 p-4">
            <h3 className="font-medium text-foreground mb-2">
              What you can do:
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Try logging in if you've already confirmed your email</li>
              <li>• Check if you've already signed up with this email</li>
              <li>• Request a new confirmation email if needed</li>
              <li>• Contact support if the problem persists</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/login">
                <Home className="mr-2 h-4 w-4" />
                Go to Login
              </Link>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
