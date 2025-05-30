import { AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-custom-primary">
      <Card className="w-full max-w-md mx-4 bg-custom-primary-lighter border-custom-accent1">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-custom-accent3" />
            <h1 className="text-2xl font-bold text-custom-secondary">
              404 Page Not Found
            </h1>
          </div>

          <p className="mt-4 text-sm text-custom-accent2">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
