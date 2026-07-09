import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsClient } from "./SettingsClient";
import { Suspense } from "react";

export default async function SettingsPage() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: session.userId } });

  const initialData = {
    googleEmail: dbUser?.googleEmail || "",
    resendKey: dbUser?.resendKey || "",
    whatsappToken: dbUser?.whatsappToken || "",
    whatsappPhoneId: dbUser?.whatsappPhoneId || "",
    whatsappTestRecipient: dbUser?.whatsappTestRecipient || "",
    apolloKey: dbUser?.apolloKey || ""
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">API Settings</h2>
          <p className="text-muted-foreground">Manage your custom API integrations for email and WhatsApp.</p>
        </div>
        
        <Suspense fallback={<div>Loading settings...</div>}>
          <SettingsClient initialData={initialData} />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
