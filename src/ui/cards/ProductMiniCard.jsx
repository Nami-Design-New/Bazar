import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { deleteProductFromCart } from "../../services/apiCart";
import productImage from "../../assets/images/product-1.png";
import axios from "./../../utils/axios";

function ProductMiniCard({ product, marketId }) {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart.cartList);
  const queryClient = useQueryClient();
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    if (cart && cart?.length > 0) {
      setInCart(cart?.some((c) => c?.product?.id === product?.id));
    }
  }, [cart, product?.id]);

  const handleAddToCart = async () => {
    try {
      const res = await axios.post("/user/add_to_cart", {
        quantity: 1,
        market_id: marketId,
        product_id: product?.id
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("تم اضافة المنتج الي السلة بنجاح");
        queryClient.invalidateQueries(["cart"]);
        setInCart(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "حدث خطأ ما");
    }
  };

  const handleDeleteItem = async () => {
    try {
      const res = await deleteProductFromCart(product?.id);
      if (res?.data?.code) {
        queryClient.invalidateQueries(["cart"]);
        toast.success("تم حذف المنتج من السلة بنجاح");
        setInCart(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product_crad">
      <div className="product_image">
        <img src={product?.image || productImage} alt="product" />
        {/* <span>أوريون</span>
        <button>
          <i className="fa-sharp fa-light fa-heart"></i>
        </button> */}
      </div>
      <div className="product_info">
        <h5 className="pro_name">{product?.title || "مشروم thio"}</h5>
        <p className="pro_number">
          {product?.description || "مشروم طازج ٢٠٠ جرام"}
        </p>

        <div className="price_buy">
          <h6>
            {product?.offer_price || 300} {t("currency.sar")}
          </h6>
          <button onClick={inCart ? handleDeleteItem : handleAddToCart}>
            {inCart ? (
              <i className="fa-light fa-trash"></i>
            ) : (
              <i className="fa-light fa-cart-plus"></i>
            )}{" "}
            {inCart ? "حذف من السلة" : "اضف الى السلة"}
          </button>
        </div>
        <div className="rate_sale">
          <p>
            <span className="old_price">
              {product?.price} {t("currency.sar")}
            </span>{" "}
            <span className="sale">
              خصم{" "}
              {((product?.price - product?.offer_price) / product?.price) * 100}
              %
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductMiniCard;
