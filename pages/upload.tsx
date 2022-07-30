import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductList from "../containers/ProductList";
import UploadForm from "../containers/UploadForm";

const Upload = () => {
  return (
    <>
      <Header />
      <UploadForm />
      <ProductList />
      <div style={{ borderTop: "1px solid rgb(50, 50, 50)" }} />
      <Footer />
    </>
  );
};

export default Upload;
