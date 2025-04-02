import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-blue-400">
                ISRO NavIC Tracker
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-[url('/map-pattern.svg')] opacity-5"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                    ISRO&apos;s NavIC Asset Tracker
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Track your assets in real-time with ISRO&apos;s Navigation
                    with Indian Constellation (NavIC) technology. Precise,
                    reliable, and designed for the Indian subcontinent.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/signup">
                    <Button className="gap-1 bg-blue-600 hover:bg-blue-700">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-400 hover:bg-blue-900/20"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-blue-900/20 z-10"></div>
                  <div className="absolute inset-0 bg-[url('/map-background.svg')] bg-cover bg-center"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-center z-30">
                    <div className="max-w-md space-y-4 p-6 backdrop-blur-sm bg-background/30 rounded-lg border border-blue-500/20">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white">
                          NavIC Technology
                        </h2>
                        <p className="text-white/80">
                          India&apos;s own navigation system providing
                          positioning, navigation, and timing services.
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Link href="/auth/signup">
                          <Button
                            variant="secondary"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Start Tracking Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Map Markers */}
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-500 rounded-full z-20 animate-ping"></div>
                  <div
                    className="absolute top-1/3 right-1/3 w-3 h-3 bg-green-500 rounded-full z-20 animate-ping"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full z-20 animate-ping"
                    style={{ animationDelay: "2s" }}
                  ></div>
                  <div
                    className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-yellow-500 rounded-full z-20 animate-ping"
                    style={{ animationDelay: "1.5s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted relative"
        >
          <div className="absolute inset-0 bg-[url('/map-pattern.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers comprehensive tracking solutions powered
                  by ISRO&apos;s NavIC technology.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="grid gap-2 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-blue-400"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Real-time Tracking
                </h3>
                <p className="text-muted-foreground">
                  Monitor your assets in real-time with precise location data
                  from NavIC satellites.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-blue-400"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                    <path d="M21.18 10.2c-1.64.44-3.16.72-4.98.72-3.96 0-7.2-1.23-9.73-3.25C4.1 5.89 2.85 3.8 2 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Analytics Dashboard
                </h3>
                <p className="text-muted-foreground">
                  Comprehensive analytics and insights about your tracked assets
                  and their movements.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-blue-400"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Customizable Alerts
                </h3>
                <p className="text-muted-foreground">
                  Set up custom alerts for geofencing, movement detection, and
                  more.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 border-gray-800">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} ISRO NavIC Tracker. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-sm text-blue-400 underline-offset-4 hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-blue-400 underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
