import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { createUser } from "@/lib/actions/user.action";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) throw new Error("Missing Webhook Secret");

  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Bad signature", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  //create user in mongodb
  if (eventType == "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      photo: image_url,
      first_name: first_name,
      last_name: last_name,
      username: username!,
    };
    console.log(user);
    const newUser = await createUser(user);

    if (newUser) {
      const client = await clerkClient();
      await client.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }
    return NextResponse.json({ message: "User created", user: newUser });
  }

  console.log(
    `webhook with an ID of ${id} of type ${eventType} has been triggered`
  );
  console.log("webhook body:", body);

  return new NextResponse("", { status: 200 });
}
