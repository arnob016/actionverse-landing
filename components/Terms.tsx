"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-4xl font-bold mb-6 text-center">Terms and Conditions</h1>
          <p className="text-gray-400 mb-4">
            Welcome to Actionverse! By using our platform, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-400">
            By accessing or using Actionverse, you agree to abide by these terms. If you do not agree, please do not use our platform.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">2. Use of Services</h2>
          <p className="text-gray-400">
            Actionverse provides a digital platform for collecting rewards, interacting with AR elements, and engaging with organizations. Users must not misuse or exploit these services in any unlawful manner.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">3. User Accounts</h2>
          <p className="text-gray-400">
            Users are responsible for maintaining the security of their accounts. Any unauthorized use should be reported immediately.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">4. Intellectual Property</h2>
          <p className="text-gray-400">
            All content, trademarks, and digital assets within Actionverse remain the property of their respective owners. Users may not reproduce or distribute content without permission.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">5. Limitation of Liability</h2>
          <p className="text-gray-400">
            Actionverse is not liable for any direct or indirect damages resulting from the use of the platform.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
          <p className="text-gray-400">
            Actionverse reserves the right to update these terms at any time. Continued use of the platform implies acceptance of any changes.
          </p>

          <div className="text-center mt-8">
            <Link href="/">
              <Button variant="outline" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Terms;
