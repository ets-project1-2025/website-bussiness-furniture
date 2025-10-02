import type { APIRoute } from "astro";
import Stripe from "stripe";
import { CartProduct } from "../../lib/interfaces";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-09-30.clover"
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    console.log("Request body items", body.items);

    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1LwIjtHs6qS0xDzPhMIPdvAd"
        },
        {
          shipping_rate: "shr_1LwIkrHs6qS0xDzP3qphYXpq"
        }
      ],
      line_items: body.items.map((item: CartProduct) => {
        // Untuk sementara, kita gunakan URL gambar dari produk
        // Kita perlu mengganti ini dengan URL yang valid dari Supabase
        const imgUrl = item.image || "https://placehold.co/400x400"; // Placeholder sementara

        return {
          price_data: {
            currency: "USD",
            product_data: {
              name: item.name,
              images: [imgUrl]
            },
            unit_amount: (item.on_sale ? item.sale_price : item.price) * 100
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1
          },
          quantity: item.quantity || 1
        };
      }),
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}`
    });

    return new Response(JSON.stringify(session), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : "An error occurred"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

// Handle method selain POST
export const GET: APIRoute = async () => {
  return new Response("Method Not Allowed", {
    status: 405,
    headers: {
      Allow: "POST"
    }
  });
};
