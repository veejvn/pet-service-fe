import React from 'react';

function ProductsComponent(){
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="border-start border-5 border-primary ps-5 mb-5" style={{ maxWidth: 600 }}>
          <h6 className="text-primary text-uppercase">Products</h6>
          <h1 className="display-5 text-uppercase mb-0">Products For Your Best Friends</h1>
        </div>
        <div className="owl-carousel product-carousel owl-loaded owl-drag">
          <div className="owl-stage-outer">
            <div className="owl-stage" style={{ transform: 'translate3d(-2593px, 0px, 0px)', transition: '1s', width: 4076 }}>
              {products.map((product, index) => (
                <div key={index} className="owl-item" style={{ width: 325.5, marginRight: 45 }}>
                  <div className="pb-5">
                    <div className="product-item position-relative bg-light d-flex flex-column text-center">
                      <img className="img-fluid mb-4" src={product.image} alt={product.name} />
                      <h6 className="text-uppercase">{product.name}</h6>
                      <h5 className="text-primary mb-0">${product.price}.00</h5>
                      <div className="btn-action d-flex justify-content-center">
                        <a className="btn btn-primary py-2 px-3" href=""><i className="bi bi-cart"></i></a>
                        <a className="btn btn-primary py-2 px-3" href=""><i className="bi bi-eye"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="owl-nav">
            <div className="owl-prev"><i className="bi bi-arrow-left"></i></div>
            <div className="owl-next"><i className="bi bi-arrow-right"></i></div>
          </div>
          <div className="owl-dots disabled"></div>
        </div>
      </div>
    </div>
  );
};

const products = [
  { id: 1, name: 'Quality Pet Foods', price: 199, image: 'assets/img/product-1.png' },
  { id: 2, name: 'Quality Pet Foods', price: 199, image: 'img/product-2.png' },
  { id: 3, name: 'Quality Pet Foods', price: 199, image: 'img/product-3.png' },
  { id: 4, name: 'Quality Pet Foods', price: 199, image: 'img/product-4.png' },
  // Thêm sản phẩm mới vào đây
];

export default ProductsComponent;