
import {Col,Row,Card, Button,Modal,Dropdown,Table, notification} from 'antd'
import './App.css';
import 'antd/dist/antd.css';
import PayPal from './Components/PayPal'
import { useEffect, useState } from 'react'

const { Meta } = Card;

function App(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [products, setProducts] = useState('')
  const [cart, setCart] = useState([])
  const [checkOut, setCheckOut] = useState(false)
  const [finalOrder, setFinalOrder] = useState({})
  
  const openNotificationWithIcon = () => {
    notification.success({
      message: 'Purchase Completed!',
      description:
        'Congratulations your purchase has been completed successfully',
    });
  };


  useEffect(() => {
    GetProductsFromFakeApi()
    if(props.notification===true){openNotificationWithIcon()}
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
    newItem?tempCart.push(
      {
        key:newItem.id,
        name:newItem.title,
        price:newItem.price,
        description:newItem.description,
        amount:
        {currency_code:'EUR',
        value:newItem.price
        }
      }
      ):console.log('There is an erro while adding new item to cart.');
    setCart(tempCart)
  }

  const createFinalOrder = () => {

    let itemsArray=[];
    let totalAmount = 0;
    cart.map(x=>{
      itemsArray.push({
        name: x.name,
              description: x.name,
              sku: String(x.key),
              unit_amount: {
                  currency_code: "EUR",
                  value:String(x.price)
              },
              quantity:'1'
      })
      totalAmount=totalAmount+x.price
    })

    let finalOrderObject = {
      // reference_id: "store_mobile_world_order_1234",
      intent:'CAPTURE',
      description: "ReactJs PayPal Demo order-1234",
      amount: {
        currency_code: "EUR",
        details: {
          subtotal: "1.09",
          shipping: "0.02",
          tax: "0.33"
        },
        value: String(totalAmount),
        breakdown: {
          item_total: {
              currency_code: "EUR",
              value: String(totalAmount)
          }
      }
      },
      payee: {
        email: "coyoges265@vy89.com"
      },
                  
      items:itemsArray,

      shipping_address: {
        line1: "2211 N First Street",
        line2: "Building 17",
        city: "San Jose",
        country_code: "US",
        postal_code: "95131",
        state: "CA",
        phone: "(123) 456-7890"
      },
      shipping_method: "United Postal Service",
      partner_fee_details: {
        receiver: {
          email: "sb-ilbnz4551027@business.example.com"
        },
        amount: {
          value: "0.01",
          currency: "EUR"
        }
      },
      // payment_linked_group: 1,
      // custom: "custom_value_2388",
      // invoice_number: "invoice_number_2388",
      // payment_descriptor: "Payment Mobile World"
  }
     
  

    
    setFinalOrder(finalOrderObject)
    setCheckOut(true)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    createFinalOrder();
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
      render: x=><p>€ {x}</p>
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


  if (checkOut===true) {
    return <PayPal finalOrder={finalOrder}/>
  }


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
                  dataSource={cart} 
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
