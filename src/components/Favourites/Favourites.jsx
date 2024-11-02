import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Cart.module.css";
import { sumBy } from "../../utils/common";
import {
  addItemToCart,
  removeItemFromFavourite,
} from "../../features/user/userSlice";

const Favourite = () => {
  const dispatch = useDispatch();
  const { favourite } = useSelector(({ user }) => user);

  const changequantity = (item, quantity) => {
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const removeItem = (id) => {
    dispatch(removeItemFromFavourite(id));
  };

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your favourite product</h2>

      {!favourite.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {favourite.map((item) => {
              const { title, category, images, price, id, quantity } = item;

              return (
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{category.name}</div>
                  </div>

                  <div className={styles.price}>{price}$</div>

                  <div className={styles.quantity}>
                    <div
                      className={styles.minus}
                      onClick={() =>
                        changequantity(item, Math.max(1, quantity - 1))
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                        />
                      </svg>
                    </div>

                    <span>{quantity}</span>

                    <div
                      className={styles.plus}
                      onClick={() =>
                        changequantity(item, Math.max(1, quantity + 1))
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                        />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.total}>{price * quantity}$</div>

                  <div
                    className={styles.close}
                    onClick={() => removeItem(item.id)}
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.actions}>
            <div className={styles.total}>
              TOTAL PRICE: {""}
              <span>
                {sumBy(
                  favourite.map(({ quantity, price }) => quantity * price)
                )}
                $
              </span>
            </div>

            <button className={styles.proceed}>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Favourite;
