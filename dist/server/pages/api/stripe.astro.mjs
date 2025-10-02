import Stripe from 'stripe';
export { renderers } from '../../renderers.mjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-09-30.clover"
});
const POST = async ({ request }) => {
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
      line_items: body.items.map((item) => {
        let imgUrl = "https://placehold.co/400x400";
        if (item.image_url) {
          imgUrl = item.image_url;
        } else if (item.images && Array.isArray(item.images) && item.images.length > 0) {
          const firstImage = item.images[0];
          imgUrl = typeof firstImage === "string" ? firstImage : "https://placehold.co/400x400";
        } else if (item.image_urls && Array.isArray(item.image_urls) && item.image_urls.length > 0) {
          imgUrl = item.image_urls[0];
        } else {
          imgUrl = "https://placehold.co/400x400";
        }
        return {
          price_data: {
            currency: item.currency || "USD",
            product_data: {
              name: item.name,
              images: [imgUrl]
            },
            unit_amount: (item.on_sale && item.sale_price ? item.sale_price : item.price) * 100
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1
          },
          quantity: item.quantity
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
const GET = async () => {
  return new Response("Method Not Allowed", {
    status: 405,
    headers: {
      Allow: "POST"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
