
import {Col,Row,Card, Button,Menu,Dropdown} from 'antd'
import './App.css';
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react'

const { Meta } = Card;

function App() {
  const [products, setProducts] = useState('')
  const [cart, setCart] = useState([])

  useEffect(() => {
    GetProductsFromFakeApi()
  }, [])


  const GetProductsFromFakeApi= async ()=>{
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {console.log(data);setProducts(data)});
}

  const addToCard=(id)=>{
    console.log('New item',id);
    let tempCart = [...cart]
    let newItem = products.find(i=>i.id===id)
    console.log('New item',newItem);
    newItem?tempCart.push(newItem):console.log('There is an erro while adding new item to cart.');
    setCart(tempCart)
  }



  return (
    <div className="App">
      <Row gutter={[16, 24]}>
        
        <Col span={12}>
          <h1>PayPal Demo</h1> 
        </Col>
        <Col span={12}><Button>Check out {cart.length}</Button></Col>
      {products===''?<h1>There are no products to show</h1>:products.map(p=>{
        return(<Col key={p.id} height={150} span={3}>          
          <Card
            key={p.id}
            hoverable
            style={{ width: 210, height:310 }}
            cover={<img style={{ height:220}} alt={p.category} src={p.image} />}
          >
            <Meta title={p.title} description={<Button onClick={()=>addToCard(p.id)}>Add to card €{p.price} </Button>} />
          </Card>
        </Col>);
      })}
      </Row>     
    </div>
  );
}

export default App;
