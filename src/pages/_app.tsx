import "styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect, useReducer, useState } from "react";
import PageLayout from "components/PageLayout/PageLayout";
import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import { cartReducer } from "reducers/cart/reducer";
import Types from "reducers/cart/types";
import productsBySlugsQuery from "lib/supabase/queries";
import { CookieCart, CartProduct } from "lib/interfaces";
import Cookies from "js-cookie";
import { createClient } from "lib/supabase/client";
import { useRouter } from "next/router";

const cartItems = Cookies.get("_cart");

const parsedCartItems = cartItems && JSON.parse(cartItems);
const slugs =
  parsedCartItems &&
  parsedCartItems.reduce((slugs: string[], item: CookieCart) => {
    return [...slugs, item.slug];
  }, []);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [cartVisibility, setCartVisibilty] = useState(false);

  const appendTotalItemsField = (products: CartProduct[]) => {
    return products.map((product: CartProduct, i) => {
      return {
        ...product,
        quantity: parsedCartItems[i].quantity ? parsedCartItems[i].quantity : 1
      };
    });
  };

  const toggleCartVisibility = () => {
    setCartVisibilty(!cartVisibility);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (parsedCartItems) {
        // TODO: Implementasi query ke Supabase
        // const supabase = createClient();
        // const { data: cartProducts, error } = await supabase
        //   .from('products')
        //   .select('*')
        //   .in('slug', slugs);

        // if (error) {
        //   throw Error("Sorry, something went wrong.");
        // }

        // Temporary: Menggunakan data dummy
        const cartProducts = [];

        dispatch({
          type: Types.bulkAdd,
          payload: cartProducts && appendTotalItemsField(cartProducts)
        });
      }
    };

    if (router.asPath !== "/success") fetchCartProducts();
  }, [router.asPath, dispatch]);

  return (
    <CartItemsContext.Provider
      value={{
        cart,
        dispatch
      }}
    >
      <CartVisibilityContext.Provider
        value={{
          cartVisibility,
          toggleCartVisibility
        }}
      >
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </CartVisibilityContext.Provider>
    </CartItemsContext.Provider>
  );
}

export default MyApp;
