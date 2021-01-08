
import {Col,Row,Card, Button,Modal,Dropdown,Table} from 'antd'
import './App.css';
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react'

const { Meta } = Card;

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  //#region  Table columns 

  const columns = [
    {
      title: 'Product name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
   
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      price: 32,      
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      amount:{
        currency_code:'EUR',
        value:100.00
      }
    },
    {
      key: '2',
      name: 'John Brown',
      price: 32,      
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      amount:{
        currency_code:'EUR',
        value:100.00
      }
    },
    {
      key: '3',
      name: 'John Brown',
      price: 32,      
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      amount:{
        currency_code:'EUR',
        value:100.00
      }
    }
  ];

  //#endregion



  return (
    <div className="App">
      <Row gutter={[16, 24]}>
        
        <Col span={12}>
          <h1>PayPal Demo</h1> 
        </Col>
        <Col span={12}>          
          {/* disabled={cart.length===0?true:false} -- this is a coding option */}
          <Button onClick={showModal}>Show cart content</Button> 
        </Col>
        
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

      
      <Modal  title={`you have (${cart.length}) elements in the cart.`} 
                  visible={isModalVisible}
                  onCancel={handleCancel}                   
                  footer={[
                    <Button key="back" onClick={handleCancel}>
                      Return
                    </Button>,
                    <Button key="submit" type="primary" disabled={cart.length===0?true:false} onClick={handleOk}>
                      Checkout
                    </Button>,
                  ]}>
        <Table columns={columns} 
                  dataSource={data} 
                  expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: record => record.name !== 'Not Expandable',
                  }}
                  pagination={false}
                  size="small" />
      </Modal>
      </Row>     
    </div>
  );
}

export default App;
