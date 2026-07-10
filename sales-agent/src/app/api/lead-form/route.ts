import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateLeadScore, determinePriority } from "@/lib/lead-scoring";
import { getHotLeadEmail, getWarmLeadEmail, getColdLeadEmail } from "@/lib/email-templates";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, budget, timeline, companySize, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // 1. Calculate Score & Priority
    const leadData = {
      leadVolume: Number(budget) || 0,
      urgency: timeline as any,
      salesTeamSize: companySize as any,
      hasPhone: !!phone,
      messageLength: message ? message.length : 0
    };

    const score = calculateLeadScore(leadData);
    const priority = determinePriority(score);

    // 2. Save to Database
    const business = await prisma.business.create({
      data: {
        name: company || name,
        email: email,
        phone: phone || null,
        ownerName: name,
        ownerEmail: email,
        leadScore: score,
        priority: priority,
        status: "New",
        summary: message || "Submitted via lead form.",
        // No userId attached as it's a general inbound lead
      }
    });

    // 3. Generate Email Template based on Priority
    let emailHtml = "";
    let subject = "";

    if (priority === "Hot") {
      emailHtml = getHotLeadEmail(name, company || name);
      subject = `Automating sales for ${company || name} (Sherpas AI)`;
    } else if (priority === "Warm") {
      emailHtml = getWarmLeadEmail(name, company || name);
      subject = `Thanks for your interest in Sherpas AI Sales Agent`;
    } else {
      emailHtml = getColdLeadEmail(name);
      subject = `Resources on automating outbound sales from Sherpas AI`;
    }

    // 4. Send Email
    if (process.env.RESEND_API_KEY) {
      let fromEmail = 'Sherpas Software <onboarding@resend.dev>';
      const adminUser = await prisma.user.findFirst({ where: { email: 'gautamshishir78@gmail.com' } });
      if (adminUser?.resendFromEmail) {
        fromEmail = adminUser.resendFromEmail;
      }

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: subject,
        html: emailHtml,
      });

      if (error) {
        console.error("Resend Error:", error);
        // Continue anyway since lead is saved
      } else {
        // Save outreach record
        await prisma.outreach.create({
          data: {
            businessId: business.id,
            type: "Email",
            content: emailHtml, // Can store HTML directly
            status: "Sent"
          }
        });
      }
    } else {
      console.warn("No RESEND_API_KEY found, skipping email send for", email);
    }

    return NextResponse.json({ success: true, businessId: business.id });

  } catch (error) {
    console.error("Lead form error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
