import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import styles from "../../styles/Category.module.css";
import Products from "../Products/Products";
import { useSelector } from "react-redux";

const defaultValues = {
  title: "",
  price_min: 0,
  price_max: 0,
};

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);
  const [isEnd, setEnd] = useState(false);
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState({
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  });

  const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);

  const categoryName = list.find((item) => item.id === Number(id))?.name || "";

  const handleChange = useCallback(({ target: { value, name } }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setItems([]);
      setEnd(false);
      setParams((prev) => ({ ...prev, ...values, offset: 0 }));
    },
    [values]
  );

  const handleReset = useCallback(() => {
    setValues(defaultValues);
    setParams((prev) => ({ ...prev, ...defaultValues, offset: 0 }));
    setEnd(false);
  }, []);

  const loadMore = useCallback(() => {
    setParams((prev) => ({ ...prev, offset: prev.offset + prev.limit }));
  }, []);

  useEffect(() => {
    if (!isLoading && data.length === 0) {
      setEnd(true);
    } else if (!isLoading) {
      setItems((prev) => [...prev, ...data]);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!id) return;
    setValues(defaultValues);
    setItems([]);
    setEnd(false);
    setParams((prev) => ({
      ...prev,
      categoryId: id,
      offset: 0,
      ...defaultValues,
    }));
  }, [id]);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{categoryName}</h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Product name"
            value={values.title}
          />
        </div>

        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            onChange={handleChange}
            placeholder="0"
            value={values.price_min || ""}
          />
          <span>Price from</span>
        </div>

        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleChange}
            placeholder="0"
            value={values.price_max || ""}
          />
          <span>Price to</span>
        </div>

        <button type="submit" hidden />
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={items}
          style={{ padding: 0 }}
          amount={items.length}
        />
      )}

      {!isEnd && (
        <div className={styles.more}>
          <button onClick={loadMore}>See more</button>
        </div>
      )}
    </section>
  );
};

export default Category;
