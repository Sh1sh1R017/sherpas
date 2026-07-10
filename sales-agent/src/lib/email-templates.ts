export function getHotLeadEmail(name: string, company: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .content { background: #f9fafb; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb; }
          .button { display: inline-block; padding: 12px 24px; background-color: #0f172a; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <h2 style="margin-top: 0;">Hi ${name},</h2>
            <p>Thanks for reaching out about ${company}. Based on your timeline and budget, I'm confident the <strong>Sherpas AI Sales Agent</strong> can help you fully automate your lead generation pipeline right away.</p>
            <p>Our platform discovers hyper-targeted leads on Google Maps, scrapes their websites, scores them, and uses AI to generate and send personalized cold outreach — all on autopilot.</p>
            <p>Since you're looking to move fast, I'd love to hop on a quick 15-minute call to show you a live demo of how we can start booking meetings for ${company}.</p>
            <a href="#" class="button">Book a Live Demo</a>
            <p style="margin-top: 30px;">Best regards,<br><strong>Sherpas Software Team</strong></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function getWarmLeadEmail(name: string, company: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .content { padding: 20px; }
          .case-study { border-left: 4px solid #3b82f6; background: #eff6ff; padding: 15px; margin: 20px 0; font-style: italic; color: #1e3a8a; border-radius: 0 8px 8px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for inquiring about the <strong>Sherpas AI Sales Agent</strong> for ${company}. We've helped several companies completely automate their outbound sales and fill their calendars without lifting a finger.</p>
            
            <div class="case-study">
              "Using Sherpas AI, we discovered 500 targeted leads and booked 15 qualified meetings in our first two weeks — all entirely automated by the AI."
            </div>
            
            <p>I'd love to learn more about your current sales process and show you how our AI handles everything from discovery to personalized follow-ups. Are you open to a brief chat next week?</p>
            
            <p>Best regards,<br><strong>Sherpas Software Team</strong></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function getColdLeadEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .content { padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thanks for your interest in the <strong>Sherpas AI Sales Agent</strong>. We received your details and wanted to share some resources that might be helpful as you think about scaling your outbound sales.</p>
            
            <p>We regularly publish insights on AI automation, lead generation, and cold outreach strategy. You might find our recent guide on <strong>Automating Outbound Sales with AI</strong> useful.</p>
            
            <p>Whenever you're ready to explore how our software can automate your pipeline, just reply to this email.</p>
            
            <p>Best regards,<br><strong>Sherpas Software Team</strong></p>
          </div>
        </div>
      </body>
    </html>
  `;
}
