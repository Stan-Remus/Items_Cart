import React, { Component } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import { Input } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    new: {
      color: '#d4d4d4'
    }
  },
});


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      id: 0,
      name: '',
      price: 0,
    }
  }

 componentDidMount(){
   fetch('http://private-32dcc-products72.apiary-mock.com/product')
   .then(res => res.json())
   .then(json => {
     this.setState({
       isLoaded: true,
       items: json,
       id: 0,
       name: '',
      price: 0,
      priceSort: [],
     })
   });
 }
  
  render(){

    let { isLoaded, items, name, id, price } = this.state;

    console.log(items);

    const handleClick = (a, b, c) => {
      this.setState({
        id: a,
        name: b,
        price: c,
      });
      console.log(a, b);
    }
  
    if( this.state.id == 0 && this.state.name == ''){
      
      return (
        <div className="App">
          <div className='container'>
          <ul>
            {
            items.map(item => (
              <Card className='card' key={item.price}>
                <CardContent className='cardContainer'>
                  <Typography>
                    {item.name}
                  </Typography>
                  <div className='test'>
                  <Typography>
                    Price: <span className='price'>${item.price}</span>
                  </Typography>
                  </div>
                  <Button 
                  className='addCartButton'
                  onClick={() => {
                    this.setState({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                    });
                    handleClick(item.id, item.name, item.price);
                  }
                }
                  startIcon={<ShoppingCartOutlinedIcon />}
                  color='success'
                  variant="contained">Add to cart</Button>
                </CardContent>
                
              </Card>
            ))}
          </ul>
          <div
          className='productsTitle'>
            <h4 className='position'>No products in your shopping cart</h4>
          </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <div className='container'>
          <ul>
            {items.map(item => (
              <Card className='card' key={item.id}>
                <CardContent className='cardContainer'>
                  <Typography theme={theme}>
                    {item.name}
                  </Typography>
                  <div className='test'>
                  <Typography>
                    Price: <span className='price'>${item.price}</span>
                  </Typography>
                  </div>
                  <Button 
                  className='addCartButton'
                  onClick={() => {
                    this.setState({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                    });
                    handleClick(item.id, item.name, item.price);
                  }
                }
                  startIcon={<ShoppingCartOutlinedIcon />}
                  color='success'
                  variant="contained">Add to cart</Button>
                </CardContent>
                
              </Card>
            ))}
          </ul>
          <div className='cart'>
            <div className='cartTitle'>
              <h4>Products in your shopping cart</h4>
              </div>
            <div className='displayProductTag'>
              <p className='prodoctName'>Product</p>
              <p>Quantity</p>
              <p>Value</p>
            </div>
            <div className='displayProduct'>
              <div className='prodoctName'>
              <p className='flex'>{name} <InfoOutlinedIcon /></p>
              </div>
              <input placeholder='1' />
              <p>{price}</p>
            </div>
            <div className='displayProductRight'>
              <p>Total: ${price}</p>
              </div>
            <Button 
                  className='button'
                  color='success'
                  variant="contained">Continue</Button>

          </div>
          </div>
        </div>
      );
    }

    
  }
  
}

export default App;
