import React, { useEffect } from "react";
// import axios from "axios"
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { useParams } from "react-router-dom";

const HomeScreens = () => {
  const { keyword } = useParams();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
    // async function fetchProducts() {
    //   const res = await axios.get("/api/products");
    //   setProducts(res.data)
    // }
    // fetchProducts();
  }, [dispatch, keyword]);
  // console.log(products);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreens;
