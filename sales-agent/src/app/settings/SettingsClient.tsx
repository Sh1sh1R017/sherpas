"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";

export function SettingsClient({ initialData }: { initialData: any }) {
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    if (success === 'gmail_connected') {
      setMessage({ type: 'success', text: 'Gmail connected successfully!' });
    } else if (error) {
      setMessage({ type: 'error', text: `Failed to connect Gmail: ${error}` });
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Failed to save settings");
      setMessage({ type: 'success', text: "Settings saved successfully!" });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Gmail Config */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Gmail (Recommended)</CardTitle>
          <CardDescription>Connect your personal Google Account to send outreach emails directly from your inbox for maximum deliverability.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-4">
            {formData.googleEmail ? (
              <div className="p-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-md text-sm font-medium">
                Connected as: {formData.googleEmail}
              </div>
            ) : (
              <div className="p-3 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-md text-sm font-medium">
                Not connected. Using Resend fallback.
              </div>
            )}
            <Button 
              type="button"
              variant={formData.googleEmail ? "outline" : "default"}
              onClick={() => window.location.href = '/api/auth/google'}
            >
              {formData.googleEmail ? "Reconnect Gmail" : "Connect with Google"}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Note: You must authorize the app to "Send emails on your behalf". If you see an unverified app warning, click Advanced &rarr; Proceed anyway.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Resend Config */}
      <Card>
        <CardHeader>
          <CardTitle>Email API (Resend Fallback)</CardTitle>
          <CardDescription>Configure a Resend API key to send emails if Gmail is not connected.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resendKey">Resend API Key</Label>
            <Input 
              id="resendKey" 
              name="resendKey" 
              type="password" 
              placeholder="re_..." 
              value={formData.resendKey} 
              onChange={handleChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resendFromEmail">Sender Email (From)</Label>
            <Input 
              id="resendFromEmail" 
              name="resendFromEmail" 
              type="email" 
              placeholder="e.g. gautam@sherpas.software" 
              value={formData.resendFromEmail || ''} 
              onChange={handleChange} 
            />
            <p className="text-xs text-muted-foreground">Must be an email address from your verified domain on Resend.</p>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
          {message && (
            <p className={`text-sm ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {message.text}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
