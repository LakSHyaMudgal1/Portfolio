import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please enter a meaningful message (at least 10 characters)." },
        { status: 400 }
      );
    }

    // Resend integration preparation
    // If RESEND_API_KEY is defined in environment variables, send real email.
    // Otherwise, simulate a successful receipt and log securely on server.
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["lakshyawork14@gmail.com"],
            subject: `Portfolio Message from ${name}`,
            html: `
              <h2>New Contact Message from Portfolio</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
            `,
          }),
        });

        if (!res.ok) {
          const err = await res.text();
          console.error("Resend error response:", err);
        }
      } catch (err) {
        console.error("Error dispatching through Resend:", err);
      }
    } else {
      console.log("Contact form submission received in dev/preview mode:", {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { success: true, message: "Thank you! Your message has been received." },
      { status: 200 }
    );
  } catch (error) {
    console.error("API contact error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or email directly." },
      { status: 500 }
    );
  }
}
